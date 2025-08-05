import React from 'react'
import {dummyEducatorData} from '../../assets/assets';
import { UserButton, useUser} from '@clerk/clerk-react'
import academy from '../../assets/academy.png'
import { Link } from 'react-router-dom';
import assets from '../../assets/assets';

const Navbar = () => {
  const educatorData = dummyEducatorData
  const { user } = useUser()
  return (
    <div className='relative border-b border-gray-500 py-3 px-4 md:px-8'>
      <Link to='/'>
        <img src={academy} alt="academy" className='w-28 lg:w-32'/>
      </Link>
      <div className='absolute top-3 right-4 flex items-center gap-5 text-gray-500'>
        <p className='hidden md:block'>Hi! {user ? user.fullName : 'Developers'}</p>
        {user ? <UserButton /> : <img className='max-w-8' src={assets.profile_img} />}
      </div>
    </div>
  )
}

export default Navbar
