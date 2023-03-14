
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
        <h1 className="p-5 text-lg font-bold">Proyectos</h1>
            <CrearProyecto />
            {loading ? <SkeletonTabla headers={headers}/> :  <TablaCRUD tipoDatos={"PROYECTOS"} listaDatos = {proyectos} headers = {headers} editar = {false} eliminar = {true} seleccionMultiple = {false} />}
        </>
  )
}

export default ProyectosPage