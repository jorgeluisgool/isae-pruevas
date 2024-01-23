import React from 'react'
import { FormLogin } from '../components/FormLogin'
import { Player } from '@lottiefiles/react-lottie-player'

export const LoginPage = () => {
  return (
    <>
    <div className='flex w-full h-screen'>
      <div className='sm:bg-[#245A95] bg-[#E2E2E2] flex w-full items-center justify-center lg:w-1/2'>
        <FormLogin />
      </div>
      <div className='hidden lg:flex h-full w-1/2 items-center justify-center'>
        <div className='flex flex-col items-center relative'>
          <Player
            src='https://lottie.host/905643ea-369a-48ff-bfca-712a74b8e176/5xt5HoF9Bl.json'
            className="player pl-3 pt-14"
            loop
            autoplay
          />
          <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-0'>
            <div className='w-auto h-auto mx-auto motion-safe:animate-spin z-10'>
              <img className="" src="src/assets/isae.png" alt="Your Company" />
            </div>
          </div>
          <h1 className='pt-3 text-4xl font-black text-[#245A95]'>DANAE</h1>
        </div>
      </div>
    </div>
    </>
  )
}
