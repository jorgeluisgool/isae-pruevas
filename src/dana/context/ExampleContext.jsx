import { useState } from "react";
import { createContext } from "react";

export const ExampleContex = createContext({});

export default function ExampleContexProvider({children}) {

    const [dataCrearProyecto, setDataCrearProyecto] = useState('Aqui va el nombre del proyecto');

    return (
        <ExampleContex.Provider value={{dataCrearProyecto, setDataCrearProyecto}}>
            {children}
        </ExampleContex.Provider>
    )

}