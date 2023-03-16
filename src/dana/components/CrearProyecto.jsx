
import { useState } from "react";
import * as XLSX from "xlsx"

export const CrearProyecto = () => {
    
    const [proyecto, setProyecto] = useState('');
    const [tipo, setTipo] = useState('');

    const [excelData, setExcelData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(proyecto, tipo);        
    }

    function handleFileUpload(event) {
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
            // console.log(excelData.);
        };
      
        reader.readAsBinaryString(file);
      }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className='bg-slate-50 m-5 px-8 py-5 rounded-3xl border-2 border-[#245A95]'>
                <label className="text-lg font-medium">
                    Registrar Proyecto
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="mt-8 flex flex-col gap-y-4">
                        <button className="active:scale-[.98] transition-all py-3 rounded-xl bg-[#245A95] hover:bg-sky-700 text-white text-lg font-bold">
                            <ion-icon name="document-outline" />
                        </button>
                    </div>
                    <div className="mt-8 flex flex-col gap-y-4 w-full">
                        <input 
                            className='w-full border-2 border-gray-300 rounded-xl py-3 bg-transparet'
                            type='text'
                            placeholder='Proyecto'
                            name='proyecto'
                            value={proyecto}
                            onChange={(e)=> setProyecto(e.target.value)}
                        />
                    </div>
                    <div className="mt-8 flex flex-col gap-y-4">
                            <select
                                className="border-2 border-gray-300 rounded-xl py-3 bg-transparet"
                                name="tipo"
                                value={proyecto}
                            onChange={(e)=> setTipo(e.target.value)}
                            >
                                <option value="migraciones">MIGRACIONES</option>
                                <option value="inventario">INVENTARIO</option>
                                <option value="mentenimiento">MANTENIMIENTO</option>
                                <option value="otros">OTROS</option>
                            </select>
                    </div>
                    <div className="mt-8 flex flex-col gap-y-4">
                        <input 
                            className="form-input border border-gray-300 bg-white text-gray-900 w-full py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" 
                            type="file" 
                            name="agregarArchivo"
                            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onChange={handleFileUpload}
                        />
            
                        {/* <Button className="active:scale-[.98] transition-all py-3 rounded-xl bg-[#245A95] hover:bg-sky-600 text-white text-lg font-bold" type="file">
                            Cargar Campos
                        </Button> */}
                    </div>
                    </div>
                    
                    
                </div>

            </form>
                
        </>
    )
}