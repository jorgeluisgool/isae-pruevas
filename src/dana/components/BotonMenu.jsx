import React from 'react'

const listaBotones = [
  {
    'id':'PROYECTOS',
    'icon':'archive-outline'
  },
  {
    'id':'USUARIOS',
    'icon':'bi bi-person-plus iconoblanco'
  },
  {
    'id':'CATALOGO',
    'icon':'archive-outline'
  },
  {
    'id':'ASIGNACIONES',
    'icon':'archive-outline'
  },
  {
    'id':'REGISTROS',
    'icon':'archive-outline'
  }
];

export const BotonMenu = ({titulo, icono}) => {
  
  return (
    <>
        <div className='bg-sky-700 w-20 h-20 object-cover rounded-full border border-indigo-500 text-center'>
          <span className='text-gray-800 hover:text-gray-400 duration-500 text-6xl text-slate-50 pt-2'>
            <ion-icon name={icono}></ion-icon>
          </span>
          <p className='pt-4 text-center'>{titulo}</p>
        </div>
      
    </>      
  )
}
