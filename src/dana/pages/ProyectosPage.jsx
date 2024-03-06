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
import { ModalFormularioNuevoProyecto } from "../components/proyectos/ModalFormularioNuevoProyecto";
import { DialogRegistroGuardado } from "../../ui/components/DialogRegistroGuardado";


const ProyectosPage = () => {

  const { userAuth, setUserAuth, modalRegistroGuardado, setModalRegistroGuardado } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalBase, setModalBase] = useState(false);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState([]);
  const [formularioState, setFormularioState] = useState(false);
  // const [modalRegistroGuardado, setModalRegistroGuardado] = useState(false);

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

    const handleDownloadPlantilla = () => {
      const csvList = [
        ['campo', 'tipocampo', 'agrupacion', 'restriccion', 'longitud'],
        ['(NOMBRE DEL CAMPO)', '(TIPO DEL CAMPO (NUMERICO,ALFANUMERICO,CORREO,ALFABETICO,CATALOGO,FIRMA,FOTO,CALENDARIO,CHECKBOX))', '(NOMBRE DE LA AGRUPACION DE LOS CAMPOS)', '(CARACTERES A UTILIZAR)', '(10)'],
      ];
    
      const csv = csvList.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
      const content = btoa(unescape(encodeURIComponent(csv)));
      const anchor = document.createElement('a');
      anchor.href = `data:application/octet-stream;charset=utf-16le;base64,${content}`;
      anchor.download = 'PantillaCamposProyecto.csv';
      anchor.click();
    }

  return (
        <>
        <DialogRegistroGuardado 
          modalRegistroGuardado={modalRegistroGuardado}
          setModalRegistroGuardado={setModalRegistroGuardado}
          dataMensajeRegistroGuardado={'Proyecto creado'}
        />
        <h1 className="pt-2 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Proyectos</h1>
          {/* <CrearProyectoForm/> */}
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
              <div className="py-2 lg:pl-4 flex items-center justify-between">
                <button
                  type="button"
                  className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-xs xl:text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                  onClick={() => {
                    setFormularioState(true);
                  }}
                >
                  <ion-icon name="person-add"></ion-icon> Nuevo proyecto
                </button>
                <div className="mt-2 flex items-center gap-x-4">
                  <button 
                    onClick={handleDownloadPlantilla} 
                    className="shadow-md bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] scroll-ml-5 w-14 h-14 active:scale-[.98] transition-all py-3 rounded-xl bg-[#245A95] text-4xl font-bold"
                  >
                    <ion-icon name="document-text"></ion-icon>
                  </button>
                  <h1 className='text-xs text-[#245A95] font-semibold'>
                    Plantilla de campos para generar proyecto 
                  </h1>
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
              <ModalFormularioNuevoProyecto 
                formularioState={formularioState}
                setFormularioState={setFormularioState}
              />
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