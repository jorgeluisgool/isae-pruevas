import React, { useEffect, useState } from 'react'
import { TablaUsuarios } from '../components/usuarios/TablaUsuarios'
import { InputText } from 'primereact/inputtext'
import { FormularioUsuarios } from '../components/usuarios/FormularioUsuarios';
import useAuth from '../hooks/useAuth';
import { Player } from '@lottiefiles/react-lottie-player';
import { useFetchUsers } from '../hooks/useFetchUsers';

export const UsuariosPage = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [formularioState, setFormularioState] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState();
  const [ventanaCarga, setVentanaCarga] = useState(false);

  const { userAuth: usuarioLogiado} = useAuth();
  const { data: listaUsuarios, loading: loadingUsuarios } = useFetchUsers(formularioState);

  console.log(listaUsuarios)
  const initialValues = {
    nombre: "",
    perfile: {},
    correo: "",
    ubicacion: "",
    telefono: "", 
    jefeinmediato: "",
    usuario: '',
    pass: "12345",
    passtemp: 1,
    clienteAplicacion: usuarioLogiado[0]?.clienteAplicacion,
    vistaCliente: usuarioLogiado[0]?.vistaCliente,
    status: 'ACTIVO'
};

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await fetch(`${api}/obtener/asistencia/353/${formattedConsutaInicio.replaceAll('/', '-')}/${formattedConsutaFin.replaceAll('/', '-')}`);
    //       const jsonData = await response.json();
    //       console.log(jsonData)
    //       // setClientes(jsonData);
    //     } catch (error) {
    //       console.log('Error:', error);
    //     }
    //   };
 
    //   fetchData();
    // }, []);

  return (
    <>
    {ventanaCarga && (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-200 bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex items-center transition duration-500 ease-in-out">
          <span className="hover:text-gray-400 duration-500 text-3xl text-slate-50">
            <img src="/src/assets/isae.png" alt="Icono" className="h-20 xl:h-40 mr-1 animate-spin"/>
          </span>
          <img src="/src/assets/letras_isae.png" alt="Icono" className="h-20 xl:h-40 mr-2" />
        </div>
        <div className='fixed pt-36 xl:pt-60'>
        <h1 className='text-[#C41420] text-4xl font-black animate-pulse'>Cargando...</h1>
        </div>
      </div>
    )}
    <div className="pb-6">
    <h1 className="pt-2 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Usuarios</h1>
      <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
        <div className='lg:m-4'>
            <div className="overflow-x-auto">
                <div className=" mx-4 xl:mx-10">
                    <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8'>
                        <div className="p-inputgroup mb-5 mt-2 col-span-3 xl:col-start-3">
                            <div className="flex flex-col">
                                <span className='p-float-label relative pt-2'>
                                    <InputText
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        name="direccion"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                      Busca el usuario
                                    </label>
                                </span>
                                <p className="text-xs lg:text-base text-[#245A95] font-semibold">Puedes buscar el usuario por su nombre o nombre de usuario</p>
                            </div>
                        </div>     
                    </div>
                    <div className=" pb-1">
                        <button
                          type="button"
                          className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-xs xl:text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                          onClick={()=>{
                            setFormularioState(true);
                            setUsuarioSeleccionado(undefined);
                          }}
                        >
                          <ion-icon name="person-add"></ion-icon> Nuevo usuario
                        </button>
                    </div>
                    {
                      listaUsuarios.length === 0 ? 
                      <div className="flex items-center justify-center flex-col my-12">
                        <img src="/src/assets/isae.png" alt="Icono" className="h-40 animate-spin xl:my-0" />
                        <h1 className="text-lg font-black text-[#245A95] animate-pulse">Cargando tabla</h1>
                      </div>
                      :
                      <TablaUsuarios 
                        searchTerm = {searchTerm}
                        setUsuarioSeleccionado = {setUsuarioSeleccionado}
                        setFormularioState = {setFormularioState}
                        formularioState = {formularioState}
                        listaUsuarios = {listaUsuarios}
                      /> 
                    }
                    
                     
                </div>
            </div>
        </div>
      </div>
      {/* FORMULARIO */}
      <FormularioUsuarios 
        initialValues = {initialValues}
        setFormularioState = {setFormularioState}
        formularioState = {formularioState}
        usuarioSeleccionado = {usuarioSeleccionado}
        setVentanaCarga = {setVentanaCarga}
      />
    </div>
    </>
  )
}
