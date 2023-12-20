import React, { useState } from 'react'
import RegistrosForm from '../components/RegistrosForm'
import TableRegistros from '../components/TablaRegistros'
import { Dialog } from 'primereact/dialog';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { Form, Formik } from 'formik';
import { ComponentTipoCampo } from '../components/ComponentTipoCampo';
import { BotonFlotanteRegresar } from '../components/BotonFlotanteRegresar';
import { useNavigate } from 'react-router-dom';
import { useFetchProjetsClientes } from '../hooks/useFetchProjetsClientes';
import useAuth from '../hooks/useAuth';
import { ModalHistorialRegistros } from '../components/ModalHistorialRegistros';
import { api } from '../helpers/variablesGlobales';
import { DialogConfirmacion } from '../../ui/components/DialogConfirmacion';
import { DialogDuplicidad } from '../../ui/components/DialogDuplicidad';
import { DialogRegistroGuardado } from '../../ui/components/DialogRegistroGuardado';
import { guardarEvidencias, newRegister, updateRegister } from '../components/functions/Functions';

export const RegistrosPage = () => {

  const [files, setFiles] = useState([]);
  const [signatures, setSignatures] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [idCampo, setIdCampo] = useState([]);

  const navigate = useNavigate();

  const [editIndex, setEditIndex] = useState(null);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalAbrirCerrar, setModalAbrirCerrar] = useState(false);
  const [modalHistorialAbrirCerrar, setModalHistorialAbrirCerrar] = useState(false);
  const [modalAceptarAbrirCerrar, setModaAceptarlAbrirCerrar] = useState(false); 
  const [modalMensajeDuplicidad, setModalMensajeDuplicidad] = useState(false);
  const [dataMensajeDuplicidad, setDataMensajeDuplicidad] = useState('');
  const [modalRegistroGuardado, setModalRegistroGuardado ] = useState(false)
  const [dataMensajeRegistroGuardado, setdataMensajeRegistroGuardado] = useState('');

  const [listaRegistros, setListaRegistros] = useState([]);

  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [dataProyectoSeleccionado, setDataProyectoSeleccionado] = useState([]);
  const [showAcordion, setShowAcordion] = useState(null);
  const [ventanaCarga, setVentanaCarga] = useState(false);



  const mandarDatos = {};

  const toggleShow = (index) => {
    if (index === showAcordion) {
      setShowAcordion(null)
    } else {
      setShowAcordion(index)
    }
  }

  // Aqui obtengo el context del cliente seleccionado
  const { clienteSeleccionado, userAuth } = useAuth();

  const { data: usuarios, loading } = useFetchUsers();
  const { data: proyectosClientes, loadingProyectosClientes } = useFetchProjetsClientes(clienteSeleccionado);

  // console.log(proyectosClientes);
  //console.log(dataProyectoSeleccionado);
  //console.log(listaRegistros);

  const handleSelectedRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((item) => item !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleDelete = (index) => {
    setData(data.filter((item, i) => i !== index));
  };

  const handleEdit = (index, item) => {
    setData([
      ...data.slice(0, index),
      item,
      ...data.slice(index + 1),
    ]);
    setEditIndex(null);
  };

  const isSelected = (index) => (selectedRows.includes(index));

// FUNCION DE CONFIMACION DE ACEPTAR CAMBIOS
  const handleMensajeAceptar = (values) => { 
    //setVentanaCarga(true);
    setModaAceptarlAbrirCerrar(false);

    const newData = { ...dataProyectoSeleccionado }
          newData.listaAgrupaciones.forEach((agrupacion) => {
            agrupacion.campos.forEach((campo) => {
              if (values.hasOwnProperty(campo.nombreCampo)) {
                campo.valor = values[campo.nombreCampo];
              }
            });
          });

    console.log(newData);

    // Suponiendo que tienes dataProyectoSeleccionado y deseas filtrar los campos válidos duplicados
    const arregloDuplicidad = newData.listaAgrupaciones.flatMap((agrupacion) =>
      agrupacion.campos.filter((item) => item.validarduplicidad === 'TRUE')
    );

    fetch(`${api}/validar/valores/duplicados/${proyectoSeleccionado.proyecto.idproyecto}/${proyectoSeleccionado.idinventario}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(arregloDuplicidad) 
    })
      .then(response => response.text())
      .then(responseData => {
        // Lógica adicional después de enviar los datos a la API
        // console.log('Respuesta de la API:', responseData);

        if (responseData != 'SIN DUPLICADOS') {
          setModalMensajeDuplicidad(true);
          setDataMensajeDuplicidad(responseData);
        }else{

          const dataColeccion = {
            ind: 0,
            inventario: proyectoSeleccionado,
            usuario: usuariosSeleccionados.length === 0 ? userAuth[0] : usuariosSeleccionados[0],
            estatus: proyectoSeleccionado.estatus,
            listaAgrupaciones: newData.listaAgrupaciones,
            evidencias: files,
            firmas: signatures,
            fotos: photos,
          }

          console.log(dataColeccion);
          

          if(dataColeccion.inventario.idinventario===0){
            newRegister(dataColeccion,proyectoSeleccionado);
          }else{
         
                if(updateRegister(dataColeccion, proyectoSeleccionado)){
                  console.log("todo ok");
                  setVentanaCarga(false);
                  setModalAbrirCerrar(false);
                  setModalRegistroGuardado(true);
                  setdataMensajeRegistroGuardado('Datos guardados')
                  setSignatures([]);
                }else{
                  console.log("todo no ok");
                  setModalRegistroGuardado();
                  setdataMensajeRegistroGuardado('Datos no guardados')
                }
              
          }

          

          /* if(dataColeccion.inventario.idinventario!=0){

            fetch(`${api}/inventario/actualizar/valores`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json' 
              },
              body: JSON.stringify(dataColeccion) 
            })
              .then(response => response.json())
              .then(responseData => {
                // Lógica adicional después de enviar los datos a la API
                // console.log('Respuesta de la API:', responseData);
  
                fetch(`${api}/generar/nuevo/documento/${proyectoSeleccionado.idinventario}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json' 
                  },
                  // body: JSON.stringify(arregloDuplicidad) 
                })
                  .then(response => response.text())
                  .then(responseData => {
                    // Lógica adicional después de enviar los datos a la API
                    // console.log('Respuesta de la API:', responseData);
                    setVentanaCarga(false);
                    setModalAbrirCerrar(false);
                    setModalRegistroGuardado(true);
                    setdataMensajeRegistroGuardado('Datos guardados')
                    setSignatures([]);
                    
                  })
                  .catch(error => console.log(error));
  
              })
              .catch(error => {
                console.log(error);
                setModalRegistroGuardado();
                setdataMensajeRegistroGuardado('Datos no guardados')
              });
          }
  */
          
         
        }
      })
      .catch(error => console.log(error));
  }

  const handleClickRegresar = () => {
    // Acciones a realizar cuando se hace clic en el botón flotante izquierdo
    navigate('/clientes');
  };

  const handleReset = (historialCambio) => {
      // console.log(historialCambio)
      const newData = { ...dataProyectoSeleccionado }
      newData.listaAgrupaciones.forEach((agrupacion) => {
        agrupacion.campos.forEach((campo) => {
          if (historialCambio.campo.idcamposproyecto === campo.idCampo) {
            campo.valor = historialCambio.valoranterior; 
           } 
        });
      });

      setDataProyectoSeleccionado(newData);
  }

  return (
    <>
    {ventanaCarga && (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-200 bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex items-center transition duration-500 ease-in-out">
          <span className="hover:text-gray-400 duration-500 text-3xl text-slate-50">
            <img src="/src/assets/isae.png" alt="Icono" className="h-20 xl:h-40 mr-1 animate-spin"/>
          </span>
          <img src="/src/assets/letras_isae.png" alt="Icono" className="h-20 xl:h-40 mr-2" />
        </div>
        <div className='fixed pt-36 xl:pt-60'>
        <h1 className='text-[#C41420] text-4xl font-black animate-pulse'>Cargando...</h1>
        </div>
      </div>
    )}
    <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Registros</h1>
    <div className="container mx-auto">
        <RegistrosForm 
          usuariosSeleccionados={usuariosSeleccionados} 
          setUsuariosSeleccionados={setUsuariosSeleccionados} 
          usuarios={usuarios} 
          loading={loading} 
          listaRegistros={listaRegistros} 
          setListaRegistros={setListaRegistros}
          proyectosClientes={proyectosClientes}
          setDataProyectoSeleccionado={setDataProyectoSeleccionado}
          setModalAbrirCerrar={setModalAbrirCerrar}
          setProyectoSeleccionado={setProyectoSeleccionado}
        />
    </div>
    <div className="overflow-x-auto">
        <div className="my-6 mx-4 xl:mx-20">
          <TableRegistros 
            onDelete={handleDelete}
            onEdit={handleEdit}
            isSelected={isSelected}
            selectedRows={selectedRows}
            onSelectedRow={handleSelectedRow}
            setModalAbrirCerrar={setModalAbrirCerrar}
            listaRegistros={listaRegistros}
            setProyectoSeleccionado={setProyectoSeleccionado}
            setDataProyectoSeleccionado={setDataProyectoSeleccionado}
            usuariosSeleccionados={usuariosSeleccionados}
          />
    </div>
    </div>

    {console.log(proyectoSeleccionado)}

    {/* MODAL DE SELECCION DEL PROYECTO */} 
    <Dialog header={`PROYECTO: ${proyectoSeleccionado?.proyecto?.proyecto}`} visible={modalAbrirCerrar} baseZIndex={-1} style={{ width: '70vw', height: '40vw' }} onHide={() => setModalAbrirCerrar(false)} className='mt-16'>
      <h1 className='text-lg font-bold xl:mx-36'>Registro: {proyectoSeleccionado ? proyectoSeleccionado.folio : 'Cargando...'}</h1>
      <Formik initialValues={{}} onSubmit={handleMensajeAceptar}>
      {({ values }) => (
      <Form >
      {dataProyectoSeleccionado.listaAgrupaciones && dataProyectoSeleccionado.listaAgrupaciones.length > 0 && (
        dataProyectoSeleccionado.listaAgrupaciones.map((itemagrupacion, indexAgrupacion) => (
          <div key={indexAgrupacion} className="bg-[#e2e2e2] rounded-md hs-accordion mt-7 xl:mx-36">
            <div className='bg-[#245A95] flex items-center justify-around rounded-md cursor-pointer shadow-slate-900 shadow-md' onClick={() => toggleShow(indexAgrupacion)}>
              <div 
                // onClick={() => toggleShow(index)} 
                className="rounded p-4 hs-accordion-toggle hs-accordion-active:text-blue-600 py-1 inline-flex items-center gap-x-2 w-full font-black text-left text-white text-xl transition hover:text-gray-300 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400" 
                aria-controls="hs-basic-nested-sub-collapse-one"
              >
                <div className={`text-2xl text-white p-2 right-12 transform transition duration-300 ease-in-out ${showAcordion === indexAgrupacion ? "rotate-180" : ""}`}>
                  <ion-icon name="chevron-down"></ion-icon>
                </div>
                  {itemagrupacion.agrupacion}   
              </div>
              <div className='pr-10'>
              </div>
            </div>
              {
                showAcordion === indexAgrupacion && (
                  <div className='px-2 xl:px-10 py-3'>
                    {
                      itemagrupacion.campos.map((item, indexCampo) => (
                      <div key={item.idCampo} className="mt-8">
                        {/*console.log(dataProyectoSeleccionado)*/}
                        <span className='p-float-label'>
                          <div className='grid grid-cols-2'>
                            <div className=''>
                              <p className='text-sm xl:text-base text-[#245A95] font-semibold text-right pr-5'>{item.nombreCampo}:</p>
                            </div>
                            <div className=''>
                              <ComponentTipoCampo dataProyectoSeleccionado={dataProyectoSeleccionado} itemagrupacion={itemagrupacion} campo={item} indexAgrupacion={indexAgrupacion} indexCampo={indexCampo} setFiles={setFiles} setIdCampo={setIdCampo} files={files} signatures={signatures} setSignatures={setSignatures} photos={photos} setPhotos={setPhotos} />
                            </div>
                          </div>
                        </span>
                      </div>
                      ))
                    }    
                  </div>
                )
              }   
          </div>
        ))
        )}
        <div className="cursor-pointer absolute inset-x-0 bottom-4 left-4 flex gap-3">
          <button
            type="button"
            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
            onClick={() =>{
               setModaAceptarlAbrirCerrar(true)}}
          >
            Aceptar
          </button>
          <button
            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
            onClick={() => {
              setSignatures([]);
              setModalAbrirCerrar(false)
            }}
            type='button'
          >
            Cancelar
          </button>

          <div className="flex ml-auto pr-8">
            <button
              type='button'
              className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
              onClick={() => setModalHistorialAbrirCerrar(true)}
            >
              <i className="pi pi-history"></i>
            </button>
          </div>
        </div>
          <DialogConfirmacion handleMensajeAceptar={handleMensajeAceptar} modaAceptarlAbrirCerrar={modalAceptarAbrirCerrar} setModaAceptarlAbrirCerrar={setModaAceptarlAbrirCerrar}/>
        </Form> 
        )}
        </Formik>    
    </Dialog>

    <DialogDuplicidad 
      modalMensajeDuplicidad={modalMensajeDuplicidad} 
      setModalMensajeDuplicidad={setModalMensajeDuplicidad}
      dataMensajeDuplicidad={dataMensajeDuplicidad}
    />
    <DialogRegistroGuardado
      modalRegistroGuardado={modalRegistroGuardado}
      setModalRegistroGuardado={setModalRegistroGuardado}
      dataMensajeRegistroGuardado={dataMensajeRegistroGuardado}
    />

    <ModalHistorialRegistros 
      modalHistorialAbrirCerrar={modalHistorialAbrirCerrar} 
      setModalHistorialAbrirCerrar={setModalHistorialAbrirCerrar} 
      proyectoSeleccionado={proyectoSeleccionado}
      handleReset={handleReset}
    />

    <BotonFlotanteRegresar  onClick={handleClickRegresar} />
    </>
    
  )
}






