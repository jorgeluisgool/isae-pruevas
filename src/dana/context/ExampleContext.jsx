import { useState } from "react";
import { createContext } from "react";

export const ExampleContex = createContext({});

export default function ExampleContexProvider({children}) {

    const [dataCrearProyecto, setDataCrearProyecto] = useState('');

    const [dataArchivoExcel, setDataArchivoExcel] = useState([]);

    return (
        <ExampleContex.Provider value={{
            dataCrearProyecto, 
            setDataCrearProyecto,
            dataArchivoExcel,
            setDataArchivoExcel
        }}>
            {children}
        </ExampleContex.Provider>
    )
}