import User from "../models/User.js"
import { Purchase } from "../models/Purchase.js";
import Stripe from "stripe";
import Course from "../models/Course.js";
import { CourseProgress } from "../models/CourseProgress.js";
import { clerkClient } from "@clerk/express";

//Get User Data
export const getUserData = async (req, res)=>{
    try {
        const userId = req.auth?.userId
        console.log('getUserData: userId from req.auth:', userId)

        if(!userId){
            return res.status(401).json({ success: false, message: 'Authentication required' })
        }

        // Get user details from Clerk
        const clerkUser = await clerkClient.users.getUser(userId)
        const role = clerkUser.publicMetadata.role || 'student'

        let user = await User.findById(userId)

        if(!user){
            console.log('getUserData: User not found in DB, creating new user for userId:', userId)
            user = await User.create({
                _id: userId,
                name: clerkUser.firstName + " " + clerkUser.lastName,
                email: clerkUser.emailAddresses[0].emailAddress,
                imageUrl: clerkUser.imageUrl,
                role: role
            })
        } else {
            // Update role if changed
            if(user.role !== role){
                user.role = role
                await user.save()
            }
        }

        res.json({ success: true, user})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Users Enrolled Courses with Lecture Links
export const userEnrolledCourses = async (req, res)=>{
    try {
        const userId = req.auth.userId
        const userData = await User.findById(userId).populate('enrolledCourses')

        if(!userData){
            return res.json({ success: false, message: 'User Not Found' })
        }

        res.json({success: true, enrolledCourses: userData.enrolledCourses || []})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// Purchase Course
export const purchaseCourse = async (req, res)=>{
    try {
        const { courseId } = req.body
        const { origin } = req.headers
        const userId = req.auth.userId
        const userData = await User.findById(userId)
        const courseData = await Course.findById(courseId)

        if(!userData || !courseData){
            return res.json({ success: false, message: 
                'Data Not Found' })

        }

        const purchaseData = {
            courseId: courseData._id,
            userId,
            amount: (courseData.coursePrice - courseData.
                discount * courseData.coursePrice / 100).toFixed
                (2),
        }
        const newPurchase = await Purchase.create(purchaseData)

        //Stripe Gateway Initialize
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

        const currency = process.env.CURRENCY.toLowerCase()

        // Creating line items to for Stripe
        const line_items = [{
            price_data:{
                currency,
                product_data: {
                    name: courseData.courseTitle
                },
                unit_amount: Math.floor(newPurchase.amount) * 100
            },
            quantity: 1
        }]
        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}/`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                purchaseId: newPurchase._id.toString()
            }
        })

        res.json({success: true, session_url: session.url})
        
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Update User Course Progress
export const updateUserCourseProgress = async (req, res)=>{
    try {
        const userId = req.auth.userId
        const { courseId, lectureId } = req.body
         const progressData = await CourseProgress.findOne({userId, courseId })

         if(progressData){
            if(progressData.lectureCompleted.includes(lectureId)){
                return res.json({success: true, message: 'Lecture Already Completed'})
            }

            progressData.lectureCompleted.push(lectureId)
            await progressData.save()
         } else{
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted: [lectureId]
            })
         }
         res.json({success: true, message: 'Progress Updated'})

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Get User Course Progress
export const getUserCourseProgress = async (req, res) =>{
    try {
         const userId = req.auth.userId
        const { courseId } = req.body
         const progressData = await CourseProgress.findOne({userId, courseId })
         res.json({success: true, progressData})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Add User Ratings to course

export const addUserRating = async (req, res)=>{
    const userId = req.auth.userId;
    const { courseId, rating } = req.body;

    if(!courseId || !userId || !rating || rating < 1 || rating > 5){
        return res.json({ success: false, message: 'Invalid Details' });
    }

    try {
        const course = await Course.findById(courseId);

        if(!course){
            return res.json({ success: false, message: 'Course not found' });
        }
        const user = await User.findById(userId);
        
        if(!user){
            return res.json({ success: false, message: 'User Not Found' });
        }

        if(!user.enrolledCourses || !user.enrolledCourses.includes(courseId)){
            return res.json({ success: false, message: 'User has not purchased this course.'});
        }

        const existingRatingIndex = course.courseRatings.findIndex(r => r.userId 
            === userId)

            if(existingRatingIndex > -1){
                course.courseRatings[existingRatingIndex].rating = rating;
            }else{
                course.courseRatings.push({userId, rating});
            }
            await course.save();
            return res.json({success: true, message: 'Rating added'})
          
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
