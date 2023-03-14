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
        <div className='hover:scale-[1.4] bg-[#245A95] w-20 h-20 object-cover rounded-full border border-sky-700 text-center pt-2'>
          <span className='hover:text-gray-400 duration-500 text-6xl text-slate-50'>
            <ion-icon name={icono}></ion-icon>
          </span>
          <p className='pt-4 text-center'>{titulo}</p>
        </div>
      
    </>      
  )
}
