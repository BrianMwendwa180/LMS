import React, { useContext } from 'react'
import assets from '../../assets/assets.js'
import { Link, useLocation } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext.jsx'
import academy from '../../assets/academy.png'
import axios from 'axios'

const Navbar = () => {
    const {navigate, isEducator, backendUrl, setIsEducator, getToken} = useContext
    (AppContext)

    const location = useLocation()
    const isCourseListPage = location.pathname.includes('/course-list')

    const { openSignIn } = useClerk()
    const { user } = useUser()

    const becomeEducator = async()=>{
        try {
            if(isEducator){
                navigate('/educator')
                return;
            }

            const token = await getToken()
            const { data } = await axios.get(`${backendUrl}/api/educator/update-role`,
                {headers: {Authorization: `Bearer ${token}`}})

                if(data.success){
                    setIsEducator(true)
                    toast.success(data.message)
                }else{
                    toast.error(data.message)

                }
           
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
            <img onClick={()=>navigate('/')} src={academy} alt="academy" className="w-28 lg:w-32 cursor-pointer" />
            
            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-5 text-gray-500'>
                <div className='flex items-center gap-5'>
                  
                    <button onClick={becomeEducator}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}
                        
                    </button>
                    <Link to='/my-enrollments' className="hover:text-blue-600 transition-colors">
                        My Enrollments
                    </Link>
                </div>
                
                {user ? (
                    <div className="flex items-center gap-3">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                ) : (
                    <button 
                        onClick={() => openSignIn()} 
                        className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                        Create Account
                    </button>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
                <div className="flex items-center gap-2">
                   <button onClick={becomeEducator}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}
                        
                    </button>
                    <Link to='/my-enrollments' className="text-sm hover:text-blue-600 transition-colors">
                        My Enrollments
                    </Link>
                </div>
                
                {user ? (
                    <UserButton afterSignOutUrl="/" />
                ) : (
                    <button 
                        onClick={() => openSignIn()}
                        className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </div>
    )
}

export default Navbar