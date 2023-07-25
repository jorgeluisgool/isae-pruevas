import React, { useState } from 'react'
import RegistrosForm from '../components/RegistrosForm'
import TableRegistros from '../components/TablaRegistros'
import { Dialog } from 'primereact/dialog';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { Field, Form, Formik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { ComponentTipoCampo } from '../components/ComponentTipoCampo';
import { useForm, Controller } from 'react-hook-form';
import { BotonFlotanteRegresar } from '../components/BotonFlotanteRegresar';
import { useNavigate } from 'react-router-dom';
import { useFetchProjetsClientes } from '../hooks/useFetchProjetsClientes';
import useAuth from '../hooks/useAuth';
import { ModalHistorialRegistros } from '../components/ModalHistorialRegistros';
import { useEffect } from 'react';

export const RegistrosPage = () => {

  const navigate = useNavigate();

  const [editIndex, setEditIndex] = useState(null);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalAbrirCerrar, setModalAbrirCerrar] = useState(false);
  const [modalHistorialAbrirCerrar, setModalHistorialAbrirCerrar] = useState(false); 
  
  const [listaRegistros, setListaRegistros] = useState([]);

  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [dataProyectoSeleccionado, setDataProyectoSeleccionado] = useState([]);
  const [showAcordion, setShowAcordion] = useState(null);

  const toggleShow = (index) => {
    if (index === showAcordion) {
      setShowAcordion(null)
    } else {
      setShowAcordion(index)
    }
  }
   
  console.log(dataProyectoSeleccionado);

  // Aqui obtengo el context del cliente seleccionado
  const { clienteSeleccionado } = useAuth();

  const { data: usuarios, loading } = useFetchUsers();
  const { data: proyectosClientes, loadingProyectosClientes } = useFetchProjetsClientes(clienteSeleccionado);

  // console.log(proyectosClientes);

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

  const isSelected = (index) => {
    return selectedRows.includes(index);
  };

  const handleSubmit = (values) => {
    // console.log(values);

        const newData = { ...dataProyectoSeleccionado }
          newData.listaAgrupaciones.forEach((agrupacion) => {
            agrupacion.campos.forEach((campo) => {
              if (values.hasOwnProperty(campo.nombreCampo)) {
                campo.valor = values[campo.nombreCampo];
              }
            });
          });

        console.log(newData);
  };

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
    {/* MODAL DE SELECCION DEL PROYECTO */}
    
    <Dialog header={`PROYECTO: ${proyectoSeleccionado?.proyecto?.proyecto}`} visible={modalAbrirCerrar} style={{ width: '90vw', height: '190vw'}} onHide={() => setModalAbrirCerrar(false)}>
      <h1 className='text-lg font-bold xl:mx-36'>Registro: {proyectoSeleccionado ? proyectoSeleccionado.folio : 'Cargando...'}</h1>
      <Formik initialValues={{}} onSubmit={handleSubmit}>
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
                        <span className='p-float-label'>
                          <div className='grid grid-cols-2'>
                            <div className=''>
                              <p className='text-sm xl:text-base text-[#245A95] font-semibold text-right pr-5'>{item.nombreCampo}:</p>
                            </div>
                            <div className=''>
                              <ComponentTipoCampo dataProyectoSeleccionado={dataProyectoSeleccionado} itemagrupacion={itemagrupacion} campo={item} indexAgrupacion={indexAgrupacion} indexCampo={indexCampo}/>
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
        <div className="absolute inset-x-0 bottom-4 left-4 flex gap-3">
          <button
            type="submit"
            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-full shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95]"
          >
            Aceptar
          </button>
          <button
            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-full shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95]"
            onClick={() => console.log('Cancelar')}
          >
            Cancelar
          </button>

          <div className="flex ml-auto pr-8">
            <button
              className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-full shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95] ml-auto"
              onClick={() => setModalHistorialAbrirCerrar(true)}
            >
              <i className="pi pi-history"></i>
            </button>
          </div>
        </div>
        </Form> 
        )}
        </Formik>    
    </Dialog>

    <ModalHistorialRegistros 
      modalHistorialAbrirCerrar={modalHistorialAbrirCerrar} 
      setModalHistorialAbrirCerrar={setModalHistorialAbrirCerrar} 
      proyectoSeleccionado={proyectoSeleccionado}
      handleReset={handleReset}
    />

    <BotonFlotanteRegresar onClick={handleClickRegresar} />
    </>
    
  )
}






