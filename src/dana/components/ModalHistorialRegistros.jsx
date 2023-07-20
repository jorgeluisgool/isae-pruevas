import { Dialog } from 'primereact/dialog'
import React, { useState } from 'react'
import { useFetchHistorialCambios } from '../hooks/useFetchHistorialCambios';

export const ModalHistorialRegistros = ({modalHistorialAbrirCerrar, setModalHistorialAbrirCerrar, proyectoSeleccionado, handleReset}) => {

  const { data: historialCambiosData, loading } = useFetchHistorialCambios(proyectoSeleccionado, modalHistorialAbrirCerrar);

  console.log(historialCambiosData);

  return (
    <Dialog header='Historial de cambios' visible={modalHistorialAbrirCerrar} style={{ width: '70vw' }} onHide={() => setModalHistorialAbrirCerrar(false)}>
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md mb-6">
      <thead className="bg-[#245A95] text-white uppercase">
        <tr className='text-left'>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Campo</span>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Usuario</span>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Anterior</span>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Nuevo</span>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Fecha_cambio</span>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Hora</span>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Restablecer</span>
            </div>
          </th>  
        </tr>
      </thead>
        <tbody className="divide-y divide-gray-200" >
          {
            historialCambiosData.slice().reverse().map((historialCambio, index) =>(
              <tr 
                key={index} 
                className='cursor-pointer hover:bg-[#E2E2E2]'
              >
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{historialCambio.campo.campo}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{historialCambio.usuario.usuario}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{historialCambio.valoranterior}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{historialCambio.valornuevo}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{historialCambio.fechacambio}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{historialCambio.horacambio}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                    <div className="text-sm font-medium text-gray-900 mx-auto p-1">
                      <button
                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-full shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95] ml-auto"
                        onClick={() => handleReset(historialCambio)}
                      >
                        <i className="pi pi-refresh"></i>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          }
          
        </tbody>
      </table>   
    </Dialog>
  )
}
