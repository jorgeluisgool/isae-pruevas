import React from 'react'
import { FormLogin } from '../components/FormLogin'

export const LoginPage = () => {
  return (
    <>
    <div className='flex w-full h-screen'>
      <div className='bg-slate-200 w-full flex items-center justify-center lg:w-1/2'>
        <FormLogin />
      </div>
      <div className='hidden lg:flex h-full w-1/2 items-center justify-center bg-sky-700'>
        <div className='w-auto h-auto mx-auto animate-spin'>
        <img className="" src="src/assets/isae.png" alt="Your Company"/>
        </div>
      </div> 
    </div>
    
    </>
  )
}
