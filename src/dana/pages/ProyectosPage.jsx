
import { CrearProyecto } from "../components/CrearProyecto";

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
        <h1 className="pt-5">Proyectso</h1>
            <CrearProyecto />
            {/* {loading ? <SkeletonTabla headers={headers}/> :  <TablaCRUD tipoDatos={"PROYECTOS"} listaDatos = {proyectos} headers = {headers} editar = {false} eliminar = {true} seleccionMultiple = {false} />} */}
        </>
  )
}

export default ProyectosPage