import React, { useEffect, useState } from 'react'
import AcordionCampos from '../components/AcordionCampos'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useContext } from 'react';
import { ExampleContex } from '../context/ExampleContext';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { BotonFlotanteGuardar } from '../components/BotonFlotanteGuardar';
import { BotonFlotanteRegresar } from '../components/BotonFlotanteRegresar';
import { useNavigate } from 'react-router-dom';

/// COMPONETE ///
const CamposProyectoPage = () => {

  const navigate = useNavigate();

   // Context del formulario crear proyecto
   const example = useContext(ExampleContex);

  // Context del archivo excel
  const { dataArchivoExcel, setDataArchivoExcel } = useContext(ExampleContex);

  const handleDragEnd =(event) => {
    const {active, over} = event

    const oldIndex = dataArchivoExcel.findIndex(element => element.id === active.id); 
    const newIndex = dataArchivoExcel.findIndex(element => element.id === over.id);

    const newOrder = arrayMove(dataArchivoExcel, oldIndex, newIndex);

    setDataArchivoExcel(newOrder)
    console.log(newOrder)
  }

  const handleClickGuardar = () => {
    // Acciones a realizar cuando se hace clic en el botón flotante
    console.log('Botón flotante clickeado');
  };

  const handleClickRegresar = () => {
    // Acciones a realizar cuando se hace clic en el botón flotante izquierdo
    navigate('/proyectos');
    console.log('Botón flotante izquierdo clickeado');
  };

  return (
    <>
      <h1 className="pt-6 pb-8 pl-4 text-4xl font-black">Campos proyecto: { <span className='text-[#245A95]'>{example.dataCrearProyecto.proyecto}</span> }</h1>
      <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      >
        <div className='lg:w-8/12 lg:h-11/12 mx-auto bg-white shadow-lg p-8'>
          <div className='drop-shadow-lg flex flex-auto flex-col px-4 md:mx-10 md:px-5'>
              <SortableContext
                items={dataArchivoExcel}
                strategy={verticalListSortingStrategy}
              >
                {
                  dataArchivoExcel.map((item, index) => (
                    <AcordionCampos key={item.id} data={item} dataArchivoExcel={dataArchivoExcel} index={index} setDataArchivoExcel={setDataArchivoExcel}/>
                  ))          
                }
              </SortableContext>
            </div>
          </div>
      </DndContext>
      <BotonFlotanteGuardar onClick={handleClickGuardar} />
      <BotonFlotanteRegresar onClick={handleClickRegresar} />

    </>
  )
}

export default CamposProyectoPage