import React, { useContext } from 'react'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'
import coding from '../../assets/coding.jpg'
import star from '../../assets/star.png'

const CourseCard = ({course, highlightTerm}) => {

const {currency, calculateRating } = useContext(AppContext)

const safeCalculateRating = (course) => {
  if(!course || !course.courseRatings){
    return 0;
  }
  return calculateRating(course);
}

const getHighlightedText = (text, highlight) => {
  if (!highlight) return text;
  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? <span key={i} className="bg-yellow-300">{part}</span> : part
  );
}

// Star Rating Component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
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
  );
};

// Alternative: Using star image with proper logic
const ImageStarRating = ({ rating }) => {
  return (
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
  );
};

  return (
   <Link to={'/course/' + course._id}
   onClick={() => scrollTo(0,0)}
   className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300'>
      <img className='w-full h-48 object-cover' src={coding} alt="Course thumbnail"/>
      <div className='p-4 text-left'>
        <h3 className='text-lg font-semibold mb-2 line-clamp-2'>
          {getHighlightedText(course.title, highlightTerm)}
        </h3>
        <p className='text-gray-600 text-sm mb-3'>Brian Mwendwa</p>
        
        <div className='flex items-center space-x-2 mb-3'>
          <span className='text-sm font-medium text-gray-700'>
            {safeCalculateRating(course).toFixed(1)}
          </span>
          
          {/* Use SVG stars (recommended) */}
          <StarRating rating={safeCalculateRating(course)} />
          
          {/* Alternative: Use image stars - uncomment if you prefer */}
          {/* <ImageStarRating rating={safeCalculateRating(course)} /> */}
          
          <span className='text-gray-500 text-sm'>
            ({course.totalReviews || 22})
          </span>
        </div>
        
        <div className='flex items-center justify-between'>
          <p className='text-lg font-bold text-gray-900'>
            {currency}{course.price?.toFixed(2) || '0.00'}
          </p>
          {course.originalPrice && course.originalPrice > course.price && (
            <p className='text-sm text-gray-500 line-through'>
              {currency}{course.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default CourseCard