import React, { useContext } from 'react'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'
import coding from '../../assets/coding.jpg'
import star from '../../assets/star.png'

const CourseCard = ({course}) => {

const {currency, calculateRating } =useContext(AppContext)

const safeCalculateRating = (course) => {
  if(!course || !course.courseRatings){
    return 0;
  }
  return calculateRating(course);
}

  return (
   <Link to={'/course/' + course._id}
   onClick={()=> scrollTo(0,0,)}
   className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg'>
      <img className='w-full' src={coding} alt=""/>
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold'>{course.title}</h3>
        <p className='text-gray-500'>{course.instructor.name}</p>
        <div className='flex items-center space-x-2'>
          <p>{safeCalculateRating(course)}</p>
          <div className='flex'>
            {[...Array(5)].map((_, i)=>(<img key={i} src={i < Math.floor
            (safeCalculateRating(course)) ? star.png : star.png_blank} alt='' 
            className='w-3.5 h-3.5'/>))}
          </div>
          <div>
            <p className='text-gray-500'>22</p>
          </div>
          <p className='text-base font-semibold text-gray-800'>{currency}{course.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
