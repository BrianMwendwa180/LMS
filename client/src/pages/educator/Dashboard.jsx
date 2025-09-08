import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
// Import your icons (assuming these are the correct paths)
import appointments_icon from '../../assets/appointment_icon.png'
import earning_icon from '../../assets/earning_icon.png'
import patients_icon from '../../assets/patients_icon.png'
import profile_img from '../../assets/profile_img.png'
import { dummyDashboardData } from '../../assets/assets' // Import the dummy data
import axios from 'axios'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(null)

  const fetchDashboardData = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(`${backendUrl}/api/educator/dashboard`, { headers: { Authorization: `Bearer ${token}`}})

      if(data.success){
        setDashboardData(data.dashboardData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    if(isEducator){
      fetchDashboardData()
    }

  }, [isEducator])

  return dashboardData ? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='space-y-5 w-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
          {/* Total Courses Card */}
          <div className='flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-200 hover:border-blue-400 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transform hover:scale-105 '>
            <div className='flex-shrink-0 p-3 bg-blue-100 rounded-full'>
              <img 
                src={appointments_icon} 
                alt='Total Courses Icon'
                className='w-8 h-8 sm:w-10 sm:h-10 object-contain filter drop-shadow-sm'
              />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-2xl sm:text-3xl font-bold text-gray-800 truncate'>{dashboardData.totalCourses}</p>
              <p className='text-sm sm:text-base text-gray-600 font-medium'>Total Courses</p>
            </div>
          </div>

          {/* Total Enrollments Card */}
          <div className='flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-200 hover:border-green-400 p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transform hover:scale-105 '>
            <div className='flex-shrink-0 p-3 bg-green-100 rounded-full'>
              <img 
                src={patients_icon} 
                alt='Total Enrollments Icon'
                className='w-8 h-8 sm:w-10 sm:h-10 object-contain filter drop-shadow-sm'
              />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-2xl sm:text-3xl font-bold text-gray-800 truncate'>{dashboardData.enrolledStudentsData.length}</p>
              <p className='text-sm sm:text-base text-gray-600 font-medium'>Total Enrollments</p>
            </div>
          </div>

          {/* Total Earnings Card */}
          <div className='flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-200 hover:border-purple-400 p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transform hover:scale-105 '>
            <div className='flex-shrink-0 p-3 bg-purple-100 rounded-full'>
              <img 
                src={earning_icon} 
                alt='Total Earnings Icon'
                className='w-8 h-8 sm:w-10 sm:h-10 object-contain filter drop-shadow-sm'
              />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-2xl sm:text-3xl font-bold text-gray-800 truncate'>{currency}{dashboardData.totalEarnings}</p>
              <p className='text-sm sm:text-base text-gray-600 font-medium'>Total Earnings</p>
            </div>
          </div>
        </div>
         <div>
          <h2 className='pt-4 text-lg font-medium'>Latest Enrolments</h2>
          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden
          rounded-md bg-white border border-gray-500/20'>
            <table className='table-fixed md:table-auto w-full overflow-hidden'>
              <thead className='text-gray-900 border-b border-gray-500/20 text-sm
              text-left'>
                <tr>
                  <th className='px-4 py-3 font-semibold text-center hidden md:table-cell
                  sm:table-cell'>#</th>
                  <th className='px-4 py-3 font-semibold'>Student Name</th>
                  <th className='px-4 py-3 font-semibold'>Course Title</th>
                </tr>

              </thead>
              <tbody className='text-sm text-gray-500'>
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className='border-b border-gray-500/20'>
                    <td className='px-4 py-3 text-center hidden sm:table-cell'>
                      {index + 1}
                    </td>
                    <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                      <img 
                        src={item.profile_img}
                        alt='Profile'
                        className='w-9 h-9 rounded-full'
                      />
                      <span className='truncate'>{item.student}</span>
                    </td>
                    <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>
         </div>

      </div>
    </div>
  ) : <Loading />
}

export default Dashboard