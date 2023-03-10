import React from 'react'
import { useNavigate } from 'react-router-dom'

export const FormLogin = () => {

    const navigate = useNavigate();

    const onLogin = () => {
        navigate('/menu', {
            replace: true
        })
    }

    //Funcion Submit del formulario
    const handleSumit = () => {
        console.log('me diste un clickk')
    }

  return (
        <>
        <div className='bg-slate-50 px-10 py-20 rounded-3xl border-2 border-sky-500'>
            <div className='w-40 h-40 mx-auto pt-8'>
                <img src="src/assets/logo_ISAe.png" alt="Your Company"/>
            </div>
            <p className='font-medium text-lg text-gray-500'>Bienvenido de nuevo</p>
            <form onSubmit={handleSumit}>
            <div className='mt-4'>
                <label className='text-lg font-medium'>Usuario</label>
                <input 
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparet'
                type='text'
                placeholder='Ingrese su Usuario'
                name='usuario'
                />
                <div>
                    <label className='text-lg font-medium'>Contraseña</label>
                    <input 
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparet'
                    placeholder='Ingrese su contraseña'
                    type='password'
                    name='contrasena'
                    />
                </div>
                <div className='mt-8 flex flex-col gap-y-4'>
                    <button 
                    type='submit'
                    className='active:scale-[.98] transition-all py-3 rounded-xl bg-sky-500 hover:bg-sky-700 text-white text-lg font-bold'
                    onClick={ onLogin}
                    >
                        Iniciar seción
                    </button>
                </div>   
            </div> 
            </form>
            
        </div>
        </>
  )
}
