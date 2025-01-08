import React from 'react'
import Loading from '../assets/Loading.png'
const Loader = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
      <img className='w-[6%] h-[6%] object-contain bg-black' src={Loading} alt="" />
    </div>
  )
}

export default Loader
