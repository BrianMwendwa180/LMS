import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import humanizeDuration from 'humanize-duration'
import blue_tick from '../../assets/blue_tick.png'
import YouTube from 'react-youtube'
import { default as assets } from '../../assets/assets.js'
import Footer from '../../components/student/Footer.jsx'
import Rating from '../../components/student/Rating.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../../components/student/Loading.jsx'


const Player = () => {
    const { enrolledCourses, calculateChapterTime, backendUrl, getToken, userData, 
        fetchUserEnrolledCourses
    } = useContext(AppContext)
    
    const { courseId } = useParams()
    const [courseData, setCourseData] = useState(null)
    const [openSections, setOpenSections] = useState({})
    const [playerData, setPlayerData] = useState(null)
    const [progressData, setProgressData] = useState(null)
    const [initialRating, setInitialRating] = useState(0)


    // Define isAlreadyEnrolled to check if user is enrolled in the course
    const isAlreadyEnrolled = enrolledCourses.some(course => course._id === courseId);

    const getCourseData = () => {
        const foundCourse = enrolledCourses.find(course => course._id === courseId);
        if (foundCourse) {
            setCourseData(foundCourse)
            if(userData && userData._id){
                foundCourse.courseRatings.map((item)=>{
                    if(item.userId === userData._id){
                        setInitialRating(item.rating)
                    }
                })    
            }
        }
    }

    // Define the missing function to calculate total number of lectures
    const calculateNoOfLectures = (course) => {
        if (!course || !course.chapters) return 0;
        return course.chapters.reduce((total, chapter) => {
            if (chapter.lessons) {
                return total + chapter.lessons.length;
            }
            return total;
        }, 0);
    }

    const toggleSection = (index) => {
        setOpenSections(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Function to handle lesson click and set player data
    const handleLessonClick = (lesson, chapterIndex, lessonIndex) => {
        setPlayerData({
            lectureUrl: lesson.url || lesson.videoUrl,
            chapter: chapterIndex + 1,
            lecture: lessonIndex + 1,
            lectureTitle: lesson.title
        });
    };

    useEffect(() => {
        if(enrolledCourses.length > 0){
            getCourseData()
        }
        }, [enrolledCourses, courseId])

        const markLectureAsCompleted = async (lectureId)=>{
            try {
                const token = await getToken()
                const { data } = await axios.post(`${backendUrl}/api/user/update-course-progress`,
                    {courseId, lectureId}, { headers: { Authorization: `Bearer ${token}`}})

                    if (data.success){
                        toast.success(data.message)
                        getCourseProgress()
                    }else{
                        toast.error(data.message)
                    }
               
            } catch (error) {
                toast.error(error.message)
            }
        }
        const getCourseProgress = async ()=>{
            try {
                const token = await getToken()
                const { data } = await axios.post(`${backendUrl}/api/user/get-course-progress`, {courseId}, 
                    { headers: { Authorization: `Bearer ${token}`}})

                    if (data.successs){
                        setProgressData(data.progressData)
                    }else{
                        toast.error(data.message)
                    }
                    } catch (error) {
                toast.error(error.message)
            }
        }

        const handleRate = async (rating)=>{
            try {
                const token = await getToken()
                const { data } = await axios.post(`${backendUrl}/api/user/add-rating`, 
                    {courseId, rating}, { headers: { Authorization: `Bearer ${token}`}})
                
                    if(data.success) {
                        toast.success(data.message)
                        fetchUserEnrolledCourses()
                    }else{
                        toast.error(data.message)
                    }
            } catch (error) {
                toast.error(error.message)
            }
        }

        useEffect(()=>{
            getCourseProgress()
        },[])

    return courseData ? (
        <>
            <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
                {/* Left column */}
                <div className='text-gray-800'>
                    <h2 className='text-xl font-semibold'>Course Structure</h2>
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-4">{courseData?.title}</h1>
                        <p className="text-gray-700 mb-4">{courseData?.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-3">Course Information</h2>
                                <p className="text-gray-600 mb-2">
                                    Instructor: {courseData?.instructor?.name || courseData?.instructor || 'N/A'}
                                </p>
                                <p className="text-gray-600 mb-2">Duration: {courseData?.duration || 'N/A'}</p>
                                <p className="text-gray-600 mb-2">Level: {courseData?.level || 'N/A'}</p>
                                <p className="text-gray-600 mb-4">
                                    Lectures: {calculateNoOfLectures(courseData)}
                                </p>

                                <button 
                                    className='w-full py-3 rounded bg-blue-600 text-white font-medium'
                                    disabled={isAlreadyEnrolled}
                                >
                                    {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
                                </button>
                            </div>

                            <div>
                                {courseData?.chapters && (
                                    <div>
                                        <h2 className="text-xl font-semibold mb-3">Course Content</h2>
                                        {courseData.chapters.map((chapter, index) => (
                                            <div key={index} className="border rounded mb-2">
                                                <button
                                                    onClick={() => toggleSection(index)}
                                                    className="w-full text-left p-3 flex justify-between items-center hover:bg-gray-50"
                                                >
                                                    <span className="font-medium">{chapter.title}</span>
                                                    {assets.downarrow && (
                                                        <img 
                                                            src={assets.downarrow} 
                                                            alt="toggle" 
                                                            className={`w-4 h-4 transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                                                        />
                                                    )}
                                                </button>
                                                {openSections[index] && (
                                                    <div className="px-3 pb-3">
                                                        {chapter.lessons && chapter.lessons.map((lesson, lessonIndex) => (
                                                            <div 
                                                                key={lessonIndex} 
                                                                className="py-2 flex items-center cursor-pointer hover:bg-gray-50"
                                                                onClick={() => handleLessonClick(lesson, index, lessonIndex)}
                                                            >
                                                                <img 
                                                                    src={progressData && progressData.
                                                                        lectureCompleted.includes(playerData.lectureId) ? assets.blue_tick : assets.play_icon} 
            
                                                                    alt="play" 
                                                                    className="w-4 h-4 mr-2" 
                                                                />
                                                                <span className="text-sm">{lesson.title}</span>
                                                                {lesson.duration && (
                                                                    <span className="text-xs text-gray-500 ml-auto">
                                                                        {lesson.duration}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 py-3 mt-10'>
                        <h1 className='text-xl font-bold'>Rate this course:</h1>
                        <Rating initialRating={initialRating} onRate={handleRate}/>
                    </div>
                </div>

                {/* Right column */}
                <div className='md:mt-10 w-full'>
                    {playerData ? (
                        <div className='w-full'>
                            <div className='w-full aspect-video bg-black rounded-lg overflow-hidden'>
                                <YouTube 
                                    videoId={playerData.lectureUrl ? 
                                        (playerData.lectureUrl.includes('youtube.com') ? 
                                            playerData.lectureUrl.split('v=')[1]?.split('&')[0] : 
                                            playerData.lectureUrl.split('/').pop()
                                        ) : ''
                                    }  
                                    opts={{
                                        width: '100%',
                                        height: '100%',
                                        playerVars: {
                                            autoplay: 0,
                                            controls: 1,
                                            rel: 0,
                                            showinfo: 0,
                                            modestbranding: 1
                                        }
                                    }}
                                    className='w-full h-full'
                                    iframeClassName='w-full h-full'
                                />
                            </div>
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2'>
                                <p className='text-sm sm:text-base font-medium'>
                                    {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
                                </p>
                                <button onClick={()=> markLectureAsCompleted(playerData.lectureId)} className='text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 border border-blue-600 rounded hover:bg-blue-50 transition-colors'>
                                    {progressData && progressData.
                                    lectureCompleted.includes(playerData.lectureId) ? 'Completed' : 'Mark Complete'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='w-full'>
                            {courseData && assets.academy ? (
                                <div className='w-full aspect-video rounded-lg overflow-hidden'>
                                    <img 
                                        src={assets.academy} 
                                        alt="Course thumbnail" 
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                            ) : (
                                <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                                    <div className='text-center p-4'>
                                        <div className='w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center'>
                                            <svg className='w-8 h-8 text-gray-500' fill='currentColor' viewBox='0 0 20 20'>
                                                <path d='M10 12a2 2 0 100-4 2 2 0 000 4z'/>
                                                <path fillRule='evenodd' d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z' clipRule='evenodd'/>
                                            </svg>
                                        </div>
                                        <p className="text-gray-500 font-medium mb-1">No lesson selected</p>
                                        <p className="text-gray-400 text-sm">Click on any lesson to start watching</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    ) : <Loading />
}

export default Player