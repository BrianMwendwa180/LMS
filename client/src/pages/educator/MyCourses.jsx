import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import coursethumbnail from '../../assets/coursethumbnail.png'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyCourses = () => {

  const {currency, backendUrl, isEducator, getToken} = useContext(AppContext)
  
  const [courses, setCourses] = useState(null)

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/courses', 
        {headers: { Authorization: `Bearer ${token}`}})

        data.success && setCourses(data.courses)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(isEducator){
      fetchEducatorCourses()
    }
  }, [isEducator])

  return courses ? (
    <div className='min-h-screen flex flex-col md:p-8 p-4 pt-8 pb-8'>
      <div className='w-full flex-1'>
        <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
        
        {/* Desktop Table View */}
        <div className='hidden md:flex flex-col max-w-6xl w-full overflow-hidden
        rounded-lg bg-white border border-gray-200 shadow-sm'>
          <div className='overflow-x-auto max-h-[calc(100vh-200px)]'>
            <table className='w-full'>
              <thead className='text-gray-900 border-b border-gray-200 text-sm
              text-left bg-gray-50 sticky top-0'>
                <tr>
                  <th className='px-6 py-4 font-semibold min-w-[300px]'>All Courses</th>
                  <th className='px-6 py-4 font-semibold min-w-[120px]'>Earnings</th>
                  <th className='px-6 py-4 font-semibold min-w-[100px]'>Students</th>
                  <th className='px-6 py-4 font-semibold min-w-[140px]'>Published On</th>
                </tr>
              </thead>
              <tbody className='text-sm text-gray-600 divide-y divide-gray-100'>
                {courses.map((course) => (
                  <tr key={course.id || course._id} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4'>
                      <div className='flex items-center space-x-4'>
                        <img src={coursethumbnail} alt='Course Image'
                        className='w-16 h-12 object-cover rounded flex-shrink-0' />
                        <span className='font-medium text-gray-900 line-clamp-2'>
                          {course.title || 'Untitled Course'}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4 font-medium text-green-600'>
                      {currency} {Math.floor((course.studentsEnrolled || 0) * (course.price || 0)).toLocaleString()}
                    </td>
                    <td className='px-6 py-4 font-medium'>
                      {(course.studentsEnrolled || 0).toLocaleString()}
                    </td>
                    <td className='px-6 py-4 text-gray-500'>
                      {course.createdAt ? new Date(course.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className='md:hidden space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto'>
          {courses.map((course) => (
            <div key={course.id || course._id} 
            className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'>
              <div className='flex items-start space-x-3 mb-3'>
                <img src={coursethumbnail} alt='Course Image'
                className='w-16 h-12 object-cover rounded flex-shrink-0' />
                <div className='flex-1 min-w-0'>
                  <h3 className='font-medium text-gray-900 text-sm line-clamp-2 mb-1'>
                    {course.title || 'Untitled Course'}
                  </h3>
                  <p className='text-xs text-gray-500'>
                    Published: {course.createdAt ? new Date(course.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : 'N/A'}
                  </p>
                </div>
              </div>
              
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <span className='text-gray-500 block'>Earnings</span>
                  <span className='font-medium text-green-600'>
                    {currency} {Math.floor((course.studentsEnrolled || 0) * (course.price || 0)).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className='text-gray-500 block'>Students</span>
                  <span className='font-medium text-gray-900'>
                    {(course.studentsEnrolled || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {courses.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-lg mb-2'>No courses found</div>
            <div className='text-gray-500 text-sm'>Start creating your first course!</div>
          </div>
        )}
      </div>
    </div>
  ) : <Loading />
}

export default MyCourses