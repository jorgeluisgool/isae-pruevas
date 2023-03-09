import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
    let [open,setOpen]=useState(false);
  return (
    <>
    <div className='z-10 shadow-md w-full fixed top-0 left-0'>
        <div className='md:flex items-center justify-between bg-sky-700 py-4 md:px-10 px-7'>
            <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
                <Link to='/menu'>
                <span className='text-gray-800 hover:text-gray-400 duration-500 text-3xl text-slate-50 mr-1 pt-2'>
                <ion-icon name="home-outline"></ion-icon>
                </span>
                </Link> 
            </div>
            <div onClick={()=>setOpen(!open)} className='text-4xl absolute right-9 top-6 cursor-pointer text-slate-50'>
                <ion-icon name={open ? 'close':'menu'}></ion-icon>
            </div>
            <ul className={`md:flex md:items-center md:pb-0 pb-7 absolute md:static bg-sky-700 md:z-auto z-[-1] left-40 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 opacity-100':'top-[-490px]'} md:opacity-100 opacity-100`}>
                <li className='md:ml-8 text-xl md:my-0 my-7'>
                <NavLink className='text-slate-50 hover:text-gray-400 duration-500 md:ml-8 text-xl md:my-0 my-7' to='/proyectos'>
                    Proyectos
                </NavLink>
                </li>
                
                <li className='md:ml-8 text-xl md:my-0 my-7'>
                <NavLink className='text-slate-50 hover:text-gray-400 duration-500 md:ml-8 text-xl md:my-0 my-7' to='/'>
                    Usuarios
                </NavLink>
                </li>

                <li className='md:ml-8 text-xl md:my-0 my-7'>
                <NavLink className='text-slate-50 hover:text-gray-400 duration-500 md:ml-8 text-xl md:my-0 my-7' to='/'>
                    Catalogo
                </NavLink>
                </li>

                <li className='md:ml-8 text-xl md:my-0 my-7'>
                <NavLink className='text-slate-50 hover:text-gray-400 duration-500 md:ml-8 text-xl md:my-0 my-7' to='/'>
                    Asignaciones
                </NavLink>
                </li>

                <li className='md:ml-8 text-xl md:my-0 my-7'>
                <NavLink className='text-slate-50 hover:text-gray-400 duration-500 md:ml-8 text-xl md:my-0 my-7' to='/registros'>
                    Registros
                </NavLink>
                </li>

                <li className='md:ml-8 text-xl md:my-0 my-7'>
                <NavLink className='text-slate-50 hover:text-gray-400 duration-500 md:ml-8 text-xl md:my-0 my-7' to='/'>
                    Asistencia
                </NavLink>
                </li>

                <li className='md:ml-8 text-xl md:my-0 my-7'>
                <NavLink className='text-slate-50 hover:text-gray-400 duration-500 md:ml-8 text-xl md:my-0 my-7' to='/'>
                    Dashborad
                </NavLink>
                </li>
                
                <li className='md:ml-8 text-xl md:my-0 my-7'>
                <NavLink className='text-slate-50 hover:text-gray-400 duration-500 md:ml-8 text-xl md:my-0 my-7' to='/'>
                    Balance
                </NavLink>
                </li>

                <li className='md:ml-8 text-xl md:my-0 my-7'>
                <NavLink className='text-slate-50 hover:text-gray-400 duration-500 md:ml-8 text-xl md:my-0 my-7' to='/'>
                    Duplicados
                </NavLink>
                </li>

            </ul>
        </div>
    </div>
    </>
  )
}
