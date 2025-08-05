import React from 'react'
import academy from '../../assets/academy.png'
import facebook_icon from '../../assets/facebook_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'

const Footer = () => {
  return (
    <footer className='flex md:flex-row flex-col-reverse
    items-center justify-between text-left w-full px-8 border-t'>
      <div className='flex items-center gap-4'>
        <img className='hidden md:block w-20' src={academy} 
        alt="logo"/>
        <div className='hidden md:block h-7 w-px bg-gray-500/60'>

        </div>
        <p className='py-4 text-center text-xs md:text-sm
        text-gray-500'>Copyright 2025 @ LMS Brian. All Right Reserved.</p>
      </div>
     <div className='flex items-center gap-3 max-md:mt-4'>
  <a href="#">
    <img src={facebook_icon} alt="facebook_icon" className="w-5 h-5 md:w-6 md:h-6" />
  </a>
  <a href="#">
    <img src={twitter_icon} alt="twitter_icon" className="w-5 h-5 md:w-6 md:h-6" />
  </a>
  <a href="#">
    <img src={instagram_icon} alt="instagram_icon" className="w-5 h-5 md:w-6 md:h-6" />
  </a>
</div>
     

    </footer>
  )
}

export default Footer
