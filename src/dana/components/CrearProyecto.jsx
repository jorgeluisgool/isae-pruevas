import { useState } from "react";
import { Navigate } from "react-router-dom";

export const CrearProyecto = ({excelData, handleFileUpload}) => {
    
    const [proyecto, setProyecto] = useState('');
    const [tipo, setTipo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Navigate ('/camposproyecto', {
        //     replace: true
        // })
        console.log(proyecto, tipo); 
        console.log(excelData);     
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
                            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-[#245A95] file:text-white
                            hover:file:bg-sky-700
                            form-input border border-gray-300 bg-whit py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" 
                            type="file" 
                            name="agregarArchivo"
                            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onChange={handleFileUpload}
                        />
                    </div>
                    
                    </div>
                    <div className="flex">
                        <button
                          type="submit"
                          className="ml-auto w-14 h-14 object-cover active:scale-[.98] py-3 bg-[#245A95] hover:bg-sky-700 text-white text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4">
                          <ion-icon name="arrow-forward"></ion-icon>
                        </button>
                    </div>
                </div>

            </form>
                
        </>
    )
}