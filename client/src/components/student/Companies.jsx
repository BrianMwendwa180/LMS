import React from 'react'
import microsoft from '../../assets/microsoft.png'
import accenture from '../../assets/accenture.png'
import adobe from '../../assets/adobe.png'
import paypal from '../../assets/paypal.png'
import walmart from '../../assets/walmart.png'

const Companies = () => {
  return (
    <div className='pt-16'>
      <p className='text-base text-gray-500'>Trusted by Learners 
        from</p>
      <div className='flex flex-wrap items-center justify-center
      gap-6 md:gap-16 md:mt-10 mt-5'>
        <img src={microsoft} alt="Microsoft" className='w-20 md:w-28'/>
        <img src={accenture} alt="Accenture" className='w-20 md:w-28'/>
        <img src={adobe} alt="Adobe" className='w-20 md:w-28'/>
        <img src={paypal} alt="paypal" className='w-20 md:w-28'/>
        <img src={walmart} alt="walmart" className='w-20 md:w-28'/>
      </div>
    </div>
  )
}

export default Companies