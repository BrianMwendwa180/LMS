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

const CourseDetails = () => {
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})


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
        {courseData.totalReviews && (
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
        {courseData.totalReviews && (
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
    const foundCourse = assets.getCourseById(courseId)
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



  if (courseData === null) {
    return <Loading />
  }

  if (!courseData) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-700 text-lg font-semibold">
        Course not found.
      </div>
    )
  }

  return (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start
      justify-between md:px-36 px-8 md:pt-20 text-left'>

        <div className='absolute top-0 left-0 w-full h-section-height -z-10
        bg-gradient-to-b from-cyan-100/70'></div>

        {/* left column */}
        <div className='flex-1'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            {courseData.title}
          </h1>
          
          <div className='pt-4 mb-6'>
            <p className='md:text-base text-sm text-gray-700 leading-relaxed' 
               dangerouslySetInnerHTML={{
                 __html: courseData.courseDescription?.slice(0, 200) || 
                        'No description available'
               }}>
            </p>
          </div>

          {/* Review and Ratings Section */}
          <div className='mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
            <h3 className='text-lg font-semibold text-gray-900 mb-3'>
              Course Structure
            </h3>

            <div className='pt-5'>
            {courseData.curriculum.map((chapter,index)=> (
                <div key={index} className='border border-gray-300 bg-white mb-2
                rounded'>
                  <div className='flex items-center justify-between px-4 py-3
                  cursor-pointer select-none' onClick={()=> toggleSection(index)}>
                    <div className='flex items-center gap-2'>
                     <img  className={`transform teansition-transform ${openSections
                      [index] ? 'rotate-180' : ''}`}
                     
                     src={assets.downArrow.png} alt="" />
                     <p className='font-medium md:text-base text-sm'>{chapter.section}</p>
                    </div>
                    <p className='text-sm md:text-default'>{chapter.lessons} lectures -
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 
                    ${openSections[index] ? 'max-h-96' : 'max-h-0'}` }>

                    <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600
                    border-t border-gray-300'>
                      {chapter.topics.map((lecture, i)=> (
                        <li key={i} className='flex items-start gap-2 py-1'>
                          <img src={assets.play_icon} alt='' className='w-4
                          h-4 mt-1'/>
                          <div className='flex items-center justify-between w-full
                          text-gray-800 text-xs md:text-default'>
                            <p>{lecture}
                                 
                            </p>
                            <div className='flex gap-2'>
                              {/* No preview or duration info available in topics */}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              ))}

            </div>
            
            {/* Use SVG Star Rating (recommended) */}
            <StarRating rating={currentRating} />
            
            {/* Alternative: Use Image Star Rating - uncomment if preferred */}
            {/* <ImageStarRating rating={currentRating} /> */}
            
            {/* Additional rating info */}
            {courseData.courseRatings && courseData.courseRatings.length > 0 && (
              <div className='mt-4 text-sm text-gray-600'>
                <p>Based on {courseData.courseRatings.length} student ratings</p>
              </div>
            )}
          </div>

          {/* Additional course information can go here */}
          <div className='space-y-4'>
            {courseData.instructor && (
              <div className='flex items-center space-x-2'>
                <span className='text-gray-600'>Instructor:</span>
                <span className='font-medium'>{courseData.instructor}</span>
              </div>
            )}
            
            {courseData.duration && (
              <div className='flex items-center space-x-2'>
                <span className='text-gray-600'>Duration:</span>
                <span className='font-medium'>{courseData.duration}</span>
              </div>
            )}
            
            {courseData.level && (
              <div className='flex items-center space-x-2'>
                <span className='text-gray-600'>Level:</span>
                <span className='font-medium'>{courseData.level}</span>
              </div>
            )}
          </div>
        </div>

        {/* right column */}
        <div className='w-full md:w-80'>
          {/* Course enrollment card or additional info can go here */}
          <div className='bg-white rounded-lg shadow-lg p-6 border border-gray-100'>
            <h3 className='font-semibold text-lg mb-4'>Course Details</h3>
            
            {courseData.price && (
              <div className='text-2xl font-bold text-gray-900 mb-4'>
                ${courseData.price}
              </div>
            )}
            
            <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors'>
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetails