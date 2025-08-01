import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import coursethumbnail from '../../assets/coursethumbnail.png'
import { useState } from 'react'
import {Line} from 'rc-progress'
import Footer from '../../components/student/Footer'


const MyEnrollments = () => {

  const {enrolledCourses, calculateCourseDuration, navigate} = useContext(AppContext)

  const [progressArray, setProgressArray] = useState([
    {lectureCompleted: 2, totalLectures: 4},
    {lectureCompleted: 5, totalLectures: 10},
    {lectureCompleted: 3, totalLectures: 6},
    {lectureCompleted: 1, totalLectures: 3},
    {lectureCompleted: 0, totalLectures: 8},
    {lectureCompleted: 6, totalLectures: 12},
    {lectureCompleted: 8, totalLectures: 16},
    {lectureCompleted: 14, totalLectures: 14},
    {lectureCompleted: 18, totalLectures: 18},
    {lectureCompleted: 10, totalLectures: 20},
    {lectureCompleted: 2, totalLectures: 4},
    {lectureCompleted: 5, totalLectures: 10},
    {lectureCompleted: 3, totalLectures: 6},
    {lectureCompleted: 1, totalLectures: 3}
  ])

  return (
    <>
    <div className='md:px-36 px-8 pt-10'>
      <h1 className='text-2xl font-semibold'>My Enrollments</h1>
      <table className='md:table-auto table-fixed w-full overflow-hidden border
      mt-10'>
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm
        text-left max-sm:hidden'>
          <tr>
            <th className='px-4 py-3 font-semibold truncate'>Course</th>
            <th className='px-4 py-3 font-semibold truncate'>Duration</th>
            <th className='px-4 py-3 font-semibold truncate'>Completed</th>
            <th className='px-4 py-3 font-semibold truncate'>Status</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {(Array.isArray(enrolledCourses) ? enrolledCourses : []).map((course, index)=>(
          <tr key={index} className='border-b border-gray-500/20'>
             <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
              <img src={coursethumbnail} alt='' className='w-14 sm:w-24
              md:w-28'/>
              <div className='flex-1'>
                <p className='mb-1 max-sm:text-sm'>{course.title}</p>

                <Line strokeWidth={2} percent={progressArray[index] ? 
                  (progressArray[index].lectureCompleted * 100) / progressArray
                   [index].totalLectures : 0 } className='bg-gray-300
                rounded-full' />
              </div>
            </td>
            <td className='px-4 py-3 max-sm:hidden'>
              {course.duration || 'N/A'}
            </td>
            <td className='px-4 py-3 max-sm:hidden'>
              {progressArray[index] && `${progressArray[index].lectureCompleted} / 
              ${progressArray[index].totalLectures}`}
              <span> Lectures</span>
            </td>
            <td className='px-4 py-3 max-sm:text-right'>
              <button className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600
              max-sm:text-xs text-white' onClick={()=> navigate('/player/' +
                course._id
              )}>
                
                {progressArray[index] &&  progressArray[index].lectureCompleted / 
                progressArray[index].totalLectures === 1 ? 'Completed' : 'On Going'}
                </button>
            </td>
          </tr>))}
        </tbody>
      </table>
    </div>
    <Footer />
    </>
  )
}

export default MyEnrollments
