import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const FormLogin = () => {

    //Hook use Navigate
    const navigate = useNavigate();

    //Estados de los Imput para formulario controlado
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [errorUsuario, setErrorUsuario] = useState("");

    // const getUsers = async () => {
    //     try{
    //         const url = "https://www.danae.com.mx:8443/web-0.0.1-SNAPSHOT/obtener/usuario"
    //         const response = await axios.post(url);
    //         console.log(response) 
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const getValidation = async (user) =>{

        const url =`https://www.danae.com.mx:8443/web-0.0.1-SNAPSHOT/obtener/usuario`;
        const options = {
            method: "POST",
            cache: "no-cache",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(user)
        };
    
        const data = await fetch(url,options).then((resp)=>{
            return resp.json();
        }
        ).catch((resp)=>{
            console.log('Error al ejecutar la consulta', resp);
            return undefined;
        });
        // const resp = await fetch(url,options);
        
        // const data = await resp.json();
        
        return data;
    }

    const onLogin = (e) => {
        e.preventDefault();
        // console.log(usuario, contrasena);
        
        //Validar los datos
    if (
        usuario == "" && contrasena == ""
    ){

        return setErrorUsuario("Todos los campos son obligatorios")
    }else {
        setErrorUsuario("")
    }

        //enviar los datos y
        //Navegar al menu al hacer click
        getValidation({
            usuario: usuario,
            pass: contrasena
        }).then(resp => {
            console.log(resp);
            if (resp.length > 0) {
                
                navigate('/menu', {
                    replace: true
                })
            }else{
                console.log("usuario o contraseña incorrectos")
            }
        });
    }

  return (
        <>
        <div className='m-12 bg-slate-50 px-10 py-20 rounded-3xl border-2 border-[#245A95]'>
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
                
                <label className='text-lg text-[#245A95] font-medium'>Contraseña</label>
                <input 
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparet'
                    placeholder='Ingrese su contraseña'
                    type='password'
                    name='contrasena'
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
                <div className='mt-8 flex flex-col gap-y-4'>
                {
                    errorUsuario !== "" && 
                    <p className='text-red-700 w-full'>
                        {errorUsuario}
                    </p>
                }
                    <button 
                    type='submit'
                    className='active:scale-[.98] transition-all py-3 rounded-xl bg-[#245A95] hover:bg-sky-600 text-white text-lg font-bold'
                    
                    >
                        Iniciar seción
                    </button>

                    <button onClick={getValidation}>data</button>
                </div> 
                </form>  
            </div>   
        </div>
        </>
  )
}
