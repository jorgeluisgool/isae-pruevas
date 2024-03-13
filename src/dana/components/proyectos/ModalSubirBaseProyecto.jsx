import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import React, { useState } from 'react'
import { useFetchUsers } from '../../hooks/useFetchUsers';
import { api } from '../../helpers/variablesGlobales';
import { DialogFoliosRepetidos } from '../../../ui/components/DialogFoliosRepetidos';
import { DialogRegistroGuardado } from '../../../ui/components/DialogRegistroGuardado';

export const ModalSubirBaseProyecto = ({modalBase, setModalBase, proyectoSeleccionado}) => {

  const { data: listaUsuarios, loading: loadingUsuarios } = useFetchUsers(); 
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({});
  const [arregloBytesExcel, setArregloBytesExcel] = useState([]);
  const [modalFoliosRep, setModalFoliosRep] = useState(false);
  const [foliosRepetidosArreglo, setFoliosRepetidosArreglo] = useState([]);
  const [modalRegistroGuardado, setModalRegistroGuardado] = useState(false)

  // console.log(arregloBytesExcel)
  // console.log(usuarioSeleccionado.idusuario)
  // console.log(proyectoSeleccionado.idproyecto)
  // console.log(proyectoSeleccionado)

  const handleFileUpload = (event) => {
    const fileInput = event.currentTarget;
    
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        // `e.target.result` contiene los bytes del archivo como ArrayBuffer
        const byteArray = new Uint8Array(e.target.result);
  
        // Ahora `byteArray` es un arreglo que contiene los bytes del archivo
        setArregloBytesExcel(byteArray);
      };
  
      // Lee el archivo como ArrayBuffer
      reader.readAsArrayBuffer(file);
    }
  };

   const handleClimb = () => {
  
     console.log(usuarioSeleccionado.idusuario);
     console.log(proyectoSeleccionado.idproyecto);

     // Convertir Uint8Array a un arreglo de enteros
     const arregloEnteros = Array.from(arregloBytesExcel, byte => byte);

     fetch(`${api}/obtener/excel/datos/proyecto/${usuarioSeleccionado.idusuario}/${proyectoSeleccionado.idproyecto}`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(arregloEnteros)
     })
       .then(response => response.text())
       .then(responseData => {
          if (responseData.includes("Folios Repetidos")) {
            setModalBase(false);
            setModalFoliosRep(true);

            // Busca la posición del primer carácter '>'
            const primerMayorIndex = responseData.indexOf('>');
            // Extrae la subcadena que contiene los folios repetidos
            const foliosRepetidos = responseData.substring(primerMayorIndex + 1);
            // Separa los folios repetidos en un array utilizando el carácter '>'
            const foliosArray = foliosRepetidos.split('>');

            setFoliosRepetidosArreglo(foliosArray);
            setUsuarioSeleccionado({});

          } else if (responseData.includes("correcto")) {
            setModalRegistroGuardado(true);
            setModalBase(false);
            setUsuarioSeleccionado({});
          }

       console.log('Respuesta de la API:', responseData);
         // return 'Correcto';
     })
     .catch(error =>{ 
         console.log(error);
         return 'Error';
     }
     );
   };
  

  return (
    <>
        <Dialog header={`SUBIR REGISTROS A: ${proyectoSeleccionado.proyecto}`} visible={modalBase} baseZIndex={-1} onHide={() => setModalBase(false)} className='xl:mt-0 sm:w-3/4 md:w-3/4 lg:w-3/4'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-10"> 
                <div className="">
                    <h1 className="text-base font-black text-[#245A95]">1. Selecciona un usuario</h1> 
                    <div className="p-inputgroup mt-3 lg:mt-6 shadow-xl">
                      <span className='p-float-label  w-full'>
                        <Dropdown
                            className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                            name="usuarios"
                            value={usuarioSeleccionado}
                            onChange={(e) => {setUsuarioSeleccionado(e.target.value)}}
                            options={listaUsuarios}
                            optionLabel="usuario"
                            filter
                        />
                        <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                          <i className="pi pi-file-edit text-white font-light text-xl"></i>
                        </span>
                        <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                          Usuario*
                        </label>
                      </span>
                    </div>
                </div> 
                <div className="">
                <h1 className="text-base font-black text-[#245A95] pb-5">2. Selecciona el excel con los registros</h1> 
                    <input 
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#245A95] file:text-white
                        hover:file:bg-sky-700
                        form-input border border-gray-300 bg-whit py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" 
                        id="archivo"
                        type="file" 
                        name="agregarArchivo"
                        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        onChange={handleFileUpload}
                        // onChange={(event) => {
                        //     setFieldValue("agregarArchivo", event.currentTarget.files[0]); handleFileUpload(event);
                        // }}
                    />
                </div> 
            </div>
            <div className="cursor-pointer absolute inset-x-0 bottom-4 right-6 flex gap-3 justify-end">
              <button
                type="button"  // Asegúrate de que el tipo sea 'submit'
                onClick={handleClimb}
                className="hover:shadow-slate-600 border h-8 px-3 bg-[#245A95] text-white text-sm lg:text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
              >
                <ion-icon name="checkmark"></ion-icon> Aceptar
              </button>    
              <button
                className="hover:shadow-slate-600 border h-8 px-3 bg-[#245A95] text-white text-sm lg:text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                onClick={() => {
                  setModalBase(false);
                }}
                type='button'
              >
                <ion-icon name="close-circle"></ion-icon> Cancelar
              </button>
            </div>
        </Dialog>

        <DialogFoliosRepetidos 
          modalFoliosRep={modalFoliosRep}
          setModalFoliosRep={setModalFoliosRep}
          foliosRepetidosArreglo={foliosRepetidosArreglo}
        />

        <DialogRegistroGuardado 
          modalRegistroGuardado={modalRegistroGuardado}
          setModalRegistroGuardado={setModalRegistroGuardado}
          dataMensajeRegistroGuardado='Se han subido los registros satisfactoriamente.'
        />
        </>
  )
}
