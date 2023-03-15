import { useState } from "react";
import { Button } from 'primereact/button';

export const CrearProyecto = () => {
    
    const [proyecto, setProyecto] = useState('');
    const [tipo, setTipo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(proyecto, tipo);        
    }

    function handleFileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onload = function (event) {
          const content = event.target.result;
          console.log(content);
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
                    <div className="mt-8 flex flex-col gap-y-4">
                        <button className="active:scale-[.98] transition-all py-3 rounded-xl bg-[#245A95] hover:bg-sky-700 text-white text-lg font-bold">
                            <ion-icon name="document-outline" />
                        </button>
                    </div>
                    <div className="mt-8 flex flex-col gap-y-4 w-full lg:w-1/4">
                        <label htmlFor="text-lg font-medium">Proyecto</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparet'
                            type='text'
                            placeholder='Proyecto'
                            name='proyecto'
                            value={proyecto}
                            onChange={(e)=> setProyecto(e.target.value)}
                        />
                    </div>
                    <div className="mt-8 flex flex-col gap-y-4 w-full lg:w-1/4">
                            <label htmlFor="text-lg font-medium">Tipo de Proyecto</label>
                            <select
                                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparet"
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
                            className="active:scale-[.98] transition-all py-3 rounded-xl bg-[#245A95] hover:bg-sky-600 text-white text-lg font-bold" 
                            type="File" 
                            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onChange={handleFileUpload}
                        />
            
                        {/* <Button className="active:scale-[.98] transition-all py-3 rounded-xl bg-[#245A95] hover:bg-sky-600 text-white text-lg font-bold" type="file">
                            Cargar Campos
                        </Button> */}
                    </div>
                </div>

            </form>
                
        </>
    )
}