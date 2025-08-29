import React, { useContext, useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const StudentsEnrolled = () => {

  const {backendUrl, getToken, isEducator} = useContext(AppContext)
  const [enrolledStudents, setEnrolledStudents] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const fetchEnrolledStudents = async () => {
    // Simulate API delay
    try {
        const token = await getToken()
        const { data } = await axios.get(backendUrl + '/api/educator/enrolled-students', { headers: { Authorization: `Bearer ${token}`}})
        if (data.success){
          setEnrolledStudents(data.enrolledStudents.reverse())
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
        
      }
    setTimeout(() => {
      
      
    }, 500)
  }

  useEffect(() => {
    if(isEducator)
    fetchEnrolledStudents()
  }, [isEducator])

  // Filter and sort students
  const filteredAndSortedStudents = enrolledStudents
    ? enrolledStudents
        .filter(student => 
          student.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          let aValue, bValue
          switch (sortBy) {
            case 'name':
              aValue = a.student
              bValue = b.student
              break
            case 'course':
              aValue = a.courseTitle
              bValue = b.courseTitle
              break
            default:
              aValue = a.student
              bValue = b.student
          }
          
          if (sortOrder === 'asc') {
            return aValue.localeCompare(bValue)
          } else {
            return bValue.localeCompare(aValue)
          }
        })
    : []

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const SortIcon = ({ column }) => {
    if (sortBy !== column) {
      return (
        <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )
    }
    
    return sortOrder === 'asc' ? (
      <svg className="w-4 h-4 ml-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4l6 6h4l6-6" />
      </svg>
    ) : (
      <svg className="w-4 h-4 ml-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 20l-6-6H9l-6 6" />
      </svg>
    )
  }

  return enrolledStudents ? (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Enrolled Students</h1>
          <p className='text-gray-600'>Manage and view all students enrolled in your courses</p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-blue-100 rounded-lg'>
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Total Students</p>
                <p className='text-2xl font-bold text-gray-900'>{enrolledStudents.length}</p>
              </div>
            </div>
          </div>
          
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-green-100 rounded-lg'>
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Active Courses</p>
                <p className='text-2xl font-bold text-gray-900'>{new Set(enrolledStudents.map(s => s.courseTitle)).size}</p>
              </div>
            </div>
          </div>
          
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-purple-100 rounded-lg'>
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Growth Rate</p>
                <p className='text-2xl font-bold text-gray-900'>+12%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6'>
          <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
            <div className='relative flex-1 max-w-md'>
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search students or courses..."
                className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='flex items-center space-x-3'>
              <span className='text-sm text-gray-500'>
                Showing {filteredAndSortedStudents.length} of {enrolledStudents.length} students
              </span>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
          {/* Desktop Table */}
          <div className='hidden md:block overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-6 py-4 text-left'>
                    <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>#</span>
                  </th>
                  <th 
                    className='px-6 py-4 text-left cursor-pointer hover:bg-gray-100 transition-colors'
                    onClick={() => handleSort('name')}
                  >
                    <div className='flex items-center'>
                      <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Student</span>
                      <SortIcon column="name" />
                    </div>
                  </th>
                  <th 
                    className='px-6 py-4 text-left cursor-pointer hover:bg-gray-100 transition-colors'
                    onClick={() => handleSort('course')}
                  >
                    <div className='flex items-center'>
                      <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Course</span>
                      <SortIcon column="course" />
                    </div>
                  </th>
                  <th className='px-6 py-4 text-left'>
                    <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Status</span>
                  </th>
                  <th className='px-6 py-4 text-left'>
                    <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredAndSortedStudents.map((item, index) => (
                  <tr key={item.id} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='text-sm font-medium text-gray-500'>
                        {enrolledStudents.indexOf(item) + 1}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-12 w-12'>
                          <img 
                            className='h-12 w-12 rounded-full object-cover border-2 border-gray-200' 
                            src={item.profile_img || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.student)}&background=0ea5e9&color=fff`}
                            alt={item.student}
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.student)}&background=0ea5e9&color=fff`
                            }}
                          />
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>{item.student}</div>
                          <div className='text-sm text-gray-500'>Student ID: {item.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-sm text-gray-900 font-medium max-w-xs truncate' title={item.courseTitle}>
                        {item.courseTitle}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'>
                        Enrolled
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <button className='text-blue-600 hover:text-blue-800 mr-4 transition-colors'>
                        View
                      </button>
                      <button className='text-gray-600 hover:text-gray-800 transition-colors'>
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className='md:hidden'>
            {filteredAndSortedStudents.map((item, index) => (
              <div key={item.id} className='p-4 border-b border-gray-200 last:border-b-0'>
                <div className='flex items-center space-x-4'>
                  <div className='flex-shrink-0'>
                    <img 
                      className='h-12 w-12 rounded-full object-cover border-2 border-gray-200' 
                      src={item.profile_img || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.student)}&background=0ea5e9&color=fff`}
                      alt={item.student}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.student)}&background=0ea5e9&color=fff`
                      }}
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        {item.student}
                      </p>
                      <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'>
                        Enrolled
                      </span>
                    </div>
                    <p className='text-sm text-gray-500 truncate mt-1'>
                      {item.courseTitle}
                    </p>
                    <div className='flex space-x-4 mt-3'>
                      <button className='text-sm text-blue-600 hover:text-blue-800 font-medium'>
                        View Details
                      </button>
                      <button className='text-sm text-gray-600 hover:text-gray-800 font-medium'>
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAndSortedStudents.length === 0 && (
            <div className='text-center py-12'>
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <h3 className='mt-2 text-sm font-medium text-gray-900'>No students found</h3>
              <p className='mt-1 text-sm text-gray-500'>
                {searchTerm ? 'Try adjusting your search terms.' : 'No students have enrolled yet.'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination (if needed) */}
        {filteredAndSortedStudents.length > 10 && (
          <div className='mt-6 flex items-center justify-between'>
            <div className='flex items-center'>
              <p className='text-sm text-gray-700'>
                Showing <span className='font-medium'>1</span> to <span className='font-medium'>10</span> of{' '}
                <span className='font-medium'>{filteredAndSortedStudents.length}</span> results
              </p>
            </div>
            <div className='flex items-center space-x-2'>
              <button className='px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50'>
                Previous
              </button>
              <button className='px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700'>
                1
              </button>
              <button className='px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50'>
                2
              </button>
              <button className='px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50'>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : <Loading />
}

export default StudentsEnrolled