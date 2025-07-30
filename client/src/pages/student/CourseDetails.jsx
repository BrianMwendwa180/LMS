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


const CourseDetails = () => {
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [playerData, setPlayerData] = useState(null) // Added missing state


  // Get context functions
  const {allCourses, calculateRating, calculateNoOfLectures, calculateCourseDuration,
        calculateChapterTime}  = useContext(AppContext)
  
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

  const fetchCourseData = () => {
    if (!id || isNaN(Number(id))) {
      setCourseData(null)
      return
    }
    const courseId = Number(id)
    const foundCourse = assets.courses.find(course => course.id === courseId)
    setCourseData(foundCourse)
  }

  useEffect(() => {
    fetchCourseData()
  }, [id])

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
              <button 
                className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium'>
                {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
              </button>
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

  // When courseData exists, render the course details
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{courseData.title}</h1>
      <p className="text-gray-700 mb-4">{courseData.description}</p>
      
      <div className="mb-6">
        <StarRating rating={currentRating} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Course Information</h2>
          <p className="text-gray-600 mb-2">Instructor: {courseData.instructor?.name || courseData.instructor || 'N/A'}</p>
          <p className="text-gray-600 mb-2">Duration: {courseData.duration || 'N/A'}</p>
          <p className="text-gray-600 mb-2">Level: {courseData.level || 'N/A'}</p>
          <p className="text-gray-600 mb-4">
            Lectures: {calculateNoOfLectures ? calculateNoOfLectures(courseData) : 'N/A'}
          </p>
          
          <button 
            className='w-full py-3 rounded bg-blue-600 text-white font-medium'>
            {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
          </button>
        </div>
        
        <div>
          {courseData.chapters && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Course Content</h2>
              {courseData.chapters.map((chapter, index) => (
                <div key={index} className="border rounded mb-2">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full text-left p-3 flex justify-between items-center hover:bg-gray-50"
                  >
                    <span className="font-medium">{chapter.title}</span>
                    <img 
                      src={downArrow} 
                      alt="toggle" 
                      className={`w-4 h-4 transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openSections[index] && (
                    <div className="px-3 pb-3">
                      {chapter.lessons && chapter.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="py-2 flex items-center">
                          <img src={play_icon} alt="play" className="w-4 h-4 mr-2" />
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

export default CourseDetails