import { useEffect, useState } from "react";
import { getProyectos } from "../helpers/getProjects";

const acomodarDatos = (lista) => {
  const nuevaLista = [];
  lista.map((item, index) => {
      const newItem = { ...item, id: index };
      nuevaLista.push(newItem);
  });

  return nuevaLista;
}

export const useFetchProjects = ()=>{
    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        getProyectos()
          .then(proyectos => {
            // console.log('Cargando datos...');
            setState({
                data: acomodarDatos(proyectos),
                loading: false
            });

          });
          //Utilizar los parentesis para mandar el parametro en dado caso que necesitemos volver a cargar el metodo
      }, [])

    return state;

}