import React from 'react'

export const FormLogin = () => {
  return (
        <>
        <div className='bg-slate-50 px-10 py-20 rounded-3xl border-2 border-sky-500'>
        <div className='w-40 h-40 mx-auto pt-8'>
        <img src="src/assets/logo_ISAe.png" alt="Your Company"/>
        </div>
            <p className='font-medium text-lg text-gray-500'>Bienvenido de nuevo</p>

        <div className='mt-4'>
        <div>
        <label className='text-lg font-medium'>Email</label>
        <input 
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparet'
            placeholder='Ingrese su Imail'
        />
        </div>
        <div>
        <label className='text-lg font-medium'>Contraseña</label>
            <input 
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparet'
            placeholder='Ingrese su contraseña'
            type='password'
        />
        </div>
        <div className='mt-8 flex justify-between items-center'>
            <div>
                <input
                    type='checkbox'
                    id='recuerda'
                />
                <label className='ml-2 font-medium text-base' for='recuerda'>Recuerda</label>
            </div>
            <button className='font-medium text-base text-violet-500'>Has olvidado tu contraseña</button>

        </div>
        <div className='mt-8 flex flex-col gap-y-4'>
            <button className='active:scale-[.98] transition-all py-3 rounded-xl bg-sky-500 hover:bg-sky-700 text-white text-lg font-bold'>Iniciar seción</button>

        </div> 
            
        </div> 
         

        </div>
    
        </>
  )
}
