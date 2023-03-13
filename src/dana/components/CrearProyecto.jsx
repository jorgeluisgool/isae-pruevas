import { useState } from "react";

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown'

export const CrearProyecto = () => {
    const [tipoProyecto, settipoProyecto] = useState('')
    const tipoProyectos = [
        { name: 'MIGRACIONES', code: 'MIG' },
        { name: 'INVENTARIO', code: 'INV' },
        { name: 'MANTENIMIENTO', code: 'MANT' },
        { name: 'OTROS', code: 'OTR' },
    ];
    return (
        <>
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
                        />
                    </div>
                    <div className="mt-8 flex flex-col gap-y-4 w-full lg:w-1/4">
                            <label htmlFor="text-lg font-medium">Tipo de Proyecto</label>
                            <select
                                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparet"
                                name="tipo"
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
        </>
    )
}