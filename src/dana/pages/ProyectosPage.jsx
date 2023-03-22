
import { CrearProyecto } from "../components/CrearProyecto";
import { SkeletonTabla } from "../components/SkeletonTabla";
import { TablaCRUD } from "../components/TablaCRUD";

import { useFetchProjects } from "../hooks/useFetchProjects";

const ProyectosPage = () => {

  const { data: proyectos, loading } = useFetchProjects();
    const headers = [
        "idproyecto",
        "proyecto",
        "descripcion",
        "fechacreacion",
    ];
  return (
        <>
        <h1 className="p-5 text-2xl font-black">Proyectos</h1>
            <CrearProyecto />
            <div className="m-12 container mx-auto">
            {loading ? <SkeletonTabla headers={headers}/> :  <TablaCRUD tipoDatos={"PROYECTOS"} listaDatos = {proyectos} headers = {headers} editar = {false} eliminar = {true} seleccionMultiple = {false} />}
            </div> 
        </>
  )
}

export default ProyectosPage