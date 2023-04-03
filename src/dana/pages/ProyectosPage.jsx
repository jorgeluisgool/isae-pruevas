
import { CrearProyecto } from "../components/CrearProyecto";
import { SkeletonTabla } from "../components/SkeletonTabla";
import { TablaCRUD } from "../components/TablaCRUD";
import * as XLSX from "xlsx"
import { useFetchProjects } from "../hooks/useFetchProjects";
import { useState } from "react";

const ProyectosPage = () => {

  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
        const content = event.target.result;
        const workbook = XLSX.read(content, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        console.log(data);
        setExcelData(data);
        console.log(excelData);
    };
  
    reader.readAsBinaryString(file);
  }

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
            <CrearProyecto excelData={excelData} handleFileUpload={handleFileUpload}/>
            <div className="m-12 container mx-auto">
            {loading ? <SkeletonTabla headers={headers}/> :  <TablaCRUD tipoDatos={"PROYECTOS"} listaDatos = {proyectos} headers = {headers} editar = {false} eliminar = {true} seleccionMultiple = {false} />}
            </div> 
        </>
  )
}

export default ProyectosPage