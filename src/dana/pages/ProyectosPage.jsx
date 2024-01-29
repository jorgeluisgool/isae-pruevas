import { useEffect, useState } from "react";
import { CrearProyectoForm } from "../components/CrearProyectoForm";
import { SkeletonTabla } from "../components/SkeletonTabla";
import { TablaCRUD } from "../components/TablaCRUD";
import { useFetchProjects } from "../hooks/useFetchProjects";
import useAuth from '../hooks/useAuth';
import { Player } from "@lottiefiles/react-lottie-player";
import { TablaProyectos } from "../components/proyectos/TablaProyectos";
import { InputText } from "primereact/inputtext";
import { ModalSubirBaseProyecto } from "../components/proyectos/ModalSubirBaseProyecto";


const ProyectosPage = () => {

  const { userAuth, setUserAuth } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalBase, setModalBase] = useState(false);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserAuth(foundUser);
      // console.log(foundUser)
    }
  }, []);

  const { data: proyectos, loading } = useFetchProjects();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

    const headers = [
        "idproyecto",
        "proyecto",
        "descripcion",
        "fechacreacion",
    ];

  return (
        <>
        <h1 className="pt-2 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Proyectos</h1>
          <CrearProyectoForm/>
          <div className="container mx-auto pb-6">
            <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
              <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8'>
                  <div className="p-inputgroup mb-5 mt-2 col-span-3 xl:col-start-3">
                      <div className="flex flex-col pt-4">
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
                                Busca proyecto
                              </label>
                          </span>
                          <p className="text-xs lg:text-base text-[#245A95] font-semibold">Puedes buscar el proyecto por su nombre o fecha de creación</p>
                      </div>
                  </div>     
              </div>
              {loading ? 
              <div className="flex items-center justify-center flex-col my-12">
                <img src="/src/assets/isae.png" alt="Icono" className="h-40 animate-spin xl:my-0" />
                <h1 className="text-lg font-black text-[#245A95] animate-pulse">Cargando tabla</h1>
              </div>
               : 
              <div className='lg:m-4'>
                <div className="overflow-x-auto">
                  <TablaProyectos 
                    proyectos = {proyectos}
                    searchTerm = {searchTerm}
                    setModalBase = {setModalBase}
                    setProyectoSeleccionado = {setProyectoSeleccionado}
                  />
                </div> 
              </div> 
              // <TablaCRUD tipoDatos={"PROYECTOS"} listaDatos = {proyectos} headers = {headers} editar = {false} eliminar = {true} seleccionMultiple = {false} />
              }
              <ModalSubirBaseProyecto 
                modalBase = {modalBase}
                setModalBase = {setModalBase}
                proyectoSeleccionado = {proyectoSeleccionado}
              />
              </div> 
          </div> 
        </>
  )
}

export default ProyectosPage