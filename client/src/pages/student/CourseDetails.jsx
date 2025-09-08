import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/student/Loading'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import star from '../../assets/star.png'
import downArrow from '../../assets/down-arrow.png'
import play_icon from '../../assets/play_icon.png'
import humanizeDuration from 'humanize-duration'
// import star_blank from '../../assets/star_blank.png' // Add this if you have a blank star image
import Footer from '../../components/student/Footer'
import YouTube from 'react-youtube'
import axios from 'axios'
import { toast } from 'react-toastify'


const CourseDetails = () => {
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [playerData, setPlayerData] = useState(null) // Added missing state


  // Get context functions
  const {allCourses, calculateRating, calculateNoOfLectures, calculateCourseDuration,
        calculateChapterTime, currency, backendUrl, userData, 
        getToken}  = useContext(AppContext)
  
  // Safe rating calculation function
  const safeCalculateRating = (course) => {
    if (!course || !course.courseRatings) {
      return 0;
    }
    return calculateRating ? calculateRating(course) : 0;
  }

  // Star Rating Component using SVG (recommended)
  const StarRating = ({ rating, showRating = true }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className='flex items-center space-x-2'>
        {showRating && (
          <span className='text-sm font-semibold text-gray-700'>
            {rating.toFixed(1)}
          </span>
        )}
        <div className='flex items-center'>
          {[...Array(5)].map((_, index) => {
            if (index < fullStars) {
              // Full star
              return (
                <svg key={index} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              );
            } else if (index === fullStars && hasHalfStar) {
              // Half star
              return (
                <div key={index} className="relative">
                  <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                </div>
              );
            } else {
              // Empty star
              return (
                <svg key={index} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              );
            }
          })}
        </div>
        {courseData && courseData.totalReviews && (
          <span className='text-sm text-gray-500'>
            ({courseData.totalReviews} reviews)
          </span>
        )}
      </div>
    );
  };

  // Alternative: Image-based star rating (if you prefer using images)
  const ImageStarRating = ({ rating, showRating = true }) => {
    return (
      <div className='flex items-center space-x-2'>
        {showRating && (
          <span className='text-sm font-semibold text-gray-700'>
            {rating.toFixed(1)}
          </span>
        )}
        <div className='flex items-center'>
          {[...Array(5)].map((_, index) => (
            <img 
              key={index} 
              src={star} 
              alt="star" 
              className={`w-4 h-4 ${
                index < Math.floor(rating) 
                  ? 'opacity-100 brightness-100' 
                  : 'opacity-30 grayscale'
              }`}
            />
          ))}
        </div>
        {courseData && courseData.totalReviews && (
          <span className='text-sm text-gray-500'>
            ({courseData.totalReviews} reviews)
          </span>
        )}
      </div>
    );
  };

  const fetchCourseData = async() => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/course/${id}`)

      if(data.success){
        setCourseData(data.courseData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

   const enrollCourse = async ()=>{
    try {
      if(!userData){
        return toast.warn('Login to Enroll')
      }
      if(isAlreadyEnrolled){
        return toast.warn('Already Enrolled')
      }
      const token = await getToken();

      const {data } = await axios.post(`${backendUrl}/api/user/purchase`,{courseId:
        courseData._id
      }, {headers: { Authorization: `Bearer ${token}`}})
      if (data.success){
        const {session_url} = data
        window.location.replace(session_url)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
   }

  useEffect(() => {
    fetchCourseData()
  }, [])

   useEffect(() => {
    if(userData && courseData && userData.enrolledCourses){
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id))
    } else {
      setIsAlreadyEnrolled(false)
    }
  }, [userData, courseData])

  const toggleSection = (index) =>{
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Get the rating for the current course
  const currentRating = courseData ? safeCalculateRating(courseData) : 0;

  // Remove loading state and always display dummyCourses details
  // if courseData is null or not found, display all dummyCourses details instead

  if (!courseData) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">All Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assets.courses.map(course => (
            <div key={course.id} className="border rounded p-4 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-700 mb-2">{course.description}</p>
                <p className="text-gray-600">Instructor: {course.instructor?.name || course.instructor || 'N/A'}</p>
                <p className="text-gray-600">Duration: {course.duration || 'N/A'}</p>
                <p className="text-gray-600">Level: {course.level || 'N/A'}</p>
              </div>
              <button onClick={enrollCourse}
                className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium'>
                {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
              </button>

              <div className='pt-6'>
                <p className='md:text-xl text-lg font-medium text-gray-800'>What's in the course?</p>
                <ul className='ml-4 pt-2 text-sm md:text-default list-disc
                text-gray-500'>
                  <li>Lifetime access with free updates.</li>
                  <li>Step-by-step, hands-on project guidance.</li>
                  <li>Downloadable resources and source code.</li>
                  <li>Quizzes to test your knowledge. </li>
                  <li>Certificate of completion.</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        {playerData && (
          <div className="mt-6">
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          </div>
        )}
        <Footer />
      </div>
    )
  }

}

export default CourseDetails