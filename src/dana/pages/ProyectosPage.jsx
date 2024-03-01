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
            <h1 className="mt-2 pl-3 text-2xl font-black text-[#245A95]">
              Tabla de proyectos asignados
            </h1>
              <div className="p-inputgroup md:px-40 lg:px-60 xl:px-80 pb-2">
                <span className="p-float-label w-full mt-6">
                  <InputText
                    className="w-full appearance-none focus:outline-none bg-transparent"
                    name="searchProyecto"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                    <i className="pi pi-file-edit text-white font-light text-xl"></i>
                  </span>
                  <label
                    htmlFor="nombrealberca"
                    className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                  >
                    Busca proyecto
                  </label>
                </span>
                {/* <p className="text-xs lg:text-base text-[#245A95] font-semibold">Puedes buscar el proyecto por su nombre o fecha de creación</p> */}
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