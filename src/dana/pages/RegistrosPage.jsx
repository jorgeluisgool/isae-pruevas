import React, { useState } from 'react'
import RegistrosForm from '../components/RegistrosForm'
import TableRegistros from '../components/TablaRegistros'
import { Dialog } from 'primereact/dialog';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { Field, Formik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { ComponentTipoCampo } from '../components/ComponentTipoCampo';

export const RegistrosPage = () => {

  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalAbrirCerrar, setModalAbrirCerrar] = useState(false); 
  const [showSub, setShowSub] = useState(null);
  
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

  const { data: usuarios, loading } = useFetchUsers();

  const handleSelectedRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((item) => item !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleAdd = (item) => {
    setData([...data, item]);
    setShowForm(false);
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

  const handleSubmit = (values) => {
    if (editIndex === null) {
      setData([...data, values]);
    } else {
      const newData = [...data];
      newData[editIndex] = values;
      setData(newData);
    }
    setShowForm(false);
  };

  const isSelected = (index) => {
    return selectedRows.includes(index);
  };

  return (
    <>
    <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Registros</h1>
    <div className="container mx-auto">
        <RegistrosForm usuarios={usuarios} loading={loading} listaRegistros={listaRegistros} setListaRegistros={setListaRegistros}/>
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
          />
    </div>
    </div>

    <Dialog header="" visible={modalAbrirCerrar} style={{ width: '70vw' }} onHide={() => setModalAbrirCerrar(false)}>
      <h1 className='text-2xl font-black xl:mx-36'>Proyecto:</h1>
      <h1 className='text-2xl font-black xl:mx-36'>Registro:</h1>

      {dataProyectoSeleccionado.listaAgrupaciones && dataProyectoSeleccionado.listaAgrupaciones.length > 0 && (
        dataProyectoSeleccionado.listaAgrupaciones.map((item, index) => (
          <div key={index} className="bg-[#e2e2e2] rounded-md hs-accordion mt-7 xl:mx-36">
            <div className='bg-[#245A95] flex items-center justify-around rounded-md cursor-pointer shadow-slate-900 shadow-md' onClick={() => toggleShow(index)}>
              <div 
                // onClick={() => toggleShow(index)} 
                className="rounded p-4 hs-accordion-toggle hs-accordion-active:text-blue-600 py-1 inline-flex items-center gap-x-2 w-full font-black text-left text-white text-xl transition hover:text-gray-300 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400" 
                aria-controls="hs-basic-nested-sub-collapse-one"
              >
                <div className={`text-2xl text-white p-2 right-12 transform transition duration-300 ease-in-out ${showAcordion === index ? "rotate-180" : ""}`}>
                  <ion-icon name="chevron-down"></ion-icon>
                </div>
                  {item.agrupacion}   
              </div>
              <div className='pr-10'>
              </div>
            </div>
            <Formik initialValues={''} onSubmit={''}>
              {
                showAcordion === index && (
                  <div className='px-2 xl:px-10 py-3'>
              {
                item.campos.map((item) => (
                <div key={item.idCampo} className="mt-8">
                  <span className='p-float-label'>
                    <div className='grid grid-cols-2'>
                      <div className=''>
                        <p className='text-sm xl:text-base text-[#245A95] font-semibold text-right pr-5'>{item.nombreCampo}:</p>
                      </div>
                      <div className=''>
                        <ComponentTipoCampo tipoCampo={item.tipoCampo}/>
                      </div>
                    </div>
                  </span>
                </div>
                ))
              }    
            </div>
                )
              }
            
            </Formik>
            
          </div>
        ))
        )}
      
    </Dialog>
    </>
    
  )
}


