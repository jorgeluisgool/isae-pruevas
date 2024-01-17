import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../dana/hooks/useAuth';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';


export const FormLogin = () => {

    const { userAuth, setUserAuth } = useAuth();

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

        localStorage.setItem("token", "true");

        e.preventDefault();
        
        //Validar los datos
        if (
            usuario == "" && contrasena == ""
        ){
            return setErrorUsuario("Todos los campos son obligatorios")
        }else {
            setErrorUsuario("")
        }

        //enviar los datos y Navegar al menu al hacer click
        getValidation({
            usuario: usuario,
            pass: contrasena
        }).then(resp => {
            
            if (resp.length > 0) {
                
                navigate('/menu', {
                    replace: true
                })
                               
            }else{
                console.log("usuario o contraseña incorrectos")
            }
            
            setUserAuth(resp);

            localStorage.setItem('user', JSON.stringify(resp))
        });
    }

  return (
        <>
        <div className='drop-shadow-lg bg-slate-50 px-6 py-12 rounded-3xl border-2 border-[#245A95]'>
            <div className='flex items-center justify-center pb-6'>
                <img src="src/assets/logo_ISAe.png" alt="Your Company" className='h-32'/>
            </div>
            <p className='font-medium text-lg text-gray-500'>Bienvenido de nuevo</p>
            <div className='mt-4'>
                <form onSubmit={onLogin}>
                    <div className="p-inputgroup mt-3 lg:mt-6 shadow-xl">
                          <span className='p-float-label  w-full'>
                            <InputText 
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                                name="usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)} 
                            />
                            <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                              <i className="pi pi-user text-white font-light text-xl"></i>
                            </span>
                            <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                              Usuario
                            </label>
                          </span>
                        </div>
                    
                        <div className="p-inputgroup mt-3 lg:mt-6 shadow-xl">
                          <span className='p-float-label  w-full'>
                            <Password 
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                                name="contrasena"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                feedback={false}
                                toggleMask
                            />
                            <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                              <i className="pi pi-lock text-white font-light text-xl"></i>
                            </span>
                            <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                              Contraseña
                            </label>
                          </span>
                        </div>
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
                                Iniciar sesión
                            </button>
                        </div> 
                    </form>  
                </div>   
        </div>
        </>
  )
}
