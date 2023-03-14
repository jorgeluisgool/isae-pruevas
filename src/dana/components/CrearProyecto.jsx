import { useState } from "react";
import { Button } from 'primereact/button';

export const CrearProyecto = () => {
    
    const [proyecto, setProyecto] = useState('');
    const [tipo, setTipo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(proyecto, tipo);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
            <div className='bg-slate-50 m-5 px-8 py-5 rounded-3xl border-2 border-sky-500'>
                    <label className="text-lg font-medium">
                        Registrar Proyecto
                    </label>
                    <div className="mt-8 flex flex-col gap-y-4">
                        <Button className="active:scale-[.98] transition-all py-3 rounded-xl bg-sky-500 hover:bg-sky-700 text-white text-lg font-bold">
                            <ion-icon name="document-outline" />
                        </Button>
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
                        <Button className="active:scale-[.98] transition-all py-3 rounded-xl bg-sky-500 hover:bg-sky-700 text-white text-lg font-bold">
                            Cargar Campos
                        </Button>
                    </div>
                </div>

            </form>
                
        </>
    )
}