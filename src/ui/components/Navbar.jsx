import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
    let [open,setOpen]=useState(false);
  return (
    <>
    <div className='shadow-md w-full fixed top-0 left-0'>
        <div className='md:flex items-center justify-between bg-sky-700 py-4 md:px-10 px-7'>
            <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
                <Link to='/home'>
                <span className='text-gray-800 hover:text-gray-400 duration-500 text-3xl text-slate-50 mr-1 pt-2'>
                <ion-icon name="home-outline"></ion-icon>
                </span>
                </Link>
                
            </div>
            <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden text-slate-50'>
                <ion-icon name={open ? 'close':'menu'}></ion-icon>
            </div>
            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-sky-700 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
                <li className='md:ml-8 text-xl md:my-0 my-7'>
                <NavLink className='text-slate-50 hover:text-gray-400 duration-500 md:ml-8 text-xl md:my-0 my-7' to='/proyectos'>
                    Proyectos
                </NavLink>
                </li>
                
                <NavLink className='text-slate-50 hover:text-gray-400 duration-500 md:ml-8 text-xl md:my-0 my-7' to='/registros'>
                    Registros
                </NavLink>

            </ul>
        </div>
    </div>
    




    {/* <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
      <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800'>
        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
        <ion-icon name="logo-ionic"></ion-icon>
        </span>
        Designer
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
      <ion-icon name={open ? 'close':'menu'}></ion-icon>
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
        {
          Links.map((link)=>(
            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
              <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
            </li>
          ))
        }
        <Button>
          Get Started
        </Button>
      </ul>
      </div>
    </div> */}
    </>
  )
}
