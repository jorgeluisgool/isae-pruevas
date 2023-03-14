import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const FormLogin = () => {

    //Hook use Navigate
    const navigate = useNavigate();

    //Estados de los Imput para formulario controlado
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [errorUsuario, setErrorUsuario] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const onLogin = (e) => {
        e.preventDefault();
        console.log(usuario, contrasena);

    //Validar los datos
    if (!errorUsuario.trim()) return setErrorUsuario("Este campo es obligatorio")
    if (!errorPassword.trim()) return setErrorPassword("Contraseña obligatoria")

        //enviar los datos

        //Navegar al menu al hacer click
        navigate('/menu', {
            replace: true
        })
    }

  return (
        <>
        <div className='bg-slate-50 px-10 py-20 rounded-3xl border-2 border-[#245A95]'>
            <div className='w-40 h-40 mx-auto pt-8'>
                <img src="src/assets/logo_ISAe.png" alt="Your Company"/>
            </div>
            <p className='font-medium text-lg text-gray-500'>Bienvenido de nuevo</p>
            
            <div className='mt-4'>
                <label className='text-lg text-[#245A95] font-medium'>Usuario</label>
                <form onSubmit={onLogin}>
                <input 
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparet'
                    type='text'
                    placeholder='Ingrese su Usuario'
                    name='usuario'
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
                {
                    errorUsuario !== "" && <p className='text-red-700 w-full'>{errorUsuario}</p>
                }
                <label className='text-lg text-[#245A95] font-medium'>Contraseña</label>
                <input 
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparet'
                    placeholder='Ingrese su contraseña'
                    type='password'
                    name='contrasena'
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
                {
                    errorPassword !== "" && <p className='text-red-700 w-full'>{errorPassword}</p>
                }
                <div className='mt-8 flex flex-col gap-y-4'>
                    <button 
                    type='submit'
                    className='active:scale-[.98] transition-all py-3 rounded-xl bg-[#245A95] hover:bg-sky-600 text-white text-lg font-bold'
                    
                    >
                        Iniciar seción
                    </button>
                </div> 
                </form>  
            </div>   
        </div>
        </>
  )
}
