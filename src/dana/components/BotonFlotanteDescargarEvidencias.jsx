import React from 'react'
import { api } from '../helpers/variablesGlobales';

export const BotonFlotanteDescargarEvidencias = ({selectedRows}) => {

  const handleDescargarEvidencias = () => {

    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/obtener/evidencias/inventarios`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json', 
            // otras cabeceras según sea necesario
          },
          body: JSON.stringify(selectedRows),
        });

            // Acceder al cuerpo de la respuesta como JSON
          const data = await response.json();
          console.log(data); // Aquí puedes ver el contenido de la respuesta como un objeto JavaScript

      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  };

  return (
    <button
      className="fixed bottom-4 right-4 px-4 border mr-auto w-14 h-14 object-cover active:scale-[.98] py-3 bg-[#245A95] hover:bg-white hover:text-[#245A95] text-white text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4"
      onClick={handleDescargarEvidencias}
    >
      <ion-icon name="image"></ion-icon>
    </button>
  )
}
