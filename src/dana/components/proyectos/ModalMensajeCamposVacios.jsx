import { Player } from '@lottiefiles/react-lottie-player'
import { Dialog } from 'primereact/dialog'
import React from 'react'

export const ModalMensajeCamposVacios = ({modalCampoRepetido, setModalCampoRepetido, dataMensajeRegistroGuardado }) => {

  return (
    <Dialog 
        header='MENSAJE' 
        visible={modalCampoRepetido} 
        closable={false} 
        style={{
            // position: 'fixed',
            // top: '20px', // Ajusta la distancia desde la parte superior
            // right: '20px', // Ajusta la distancia desde la parte derecha
            width: '350px', // Ajusta el ancho del Dialog
            // height: '300px',
            zIndex: 9999, // Asegúrate de que el zIndex sea superior para que se muestre por encima de otros elementos
            borderRadius: '20px', // Agrega bordes redondeados para un aspecto más agradable
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Agrega una sombra para el efecto de elevación
            backgroundColor: '#ffffff', // Ajusta el color de fondo del Dialog
          }} 
        onHide={() => setModalCampoRepetido(false)}
    >
        <div className='text-center'>
            <Player src='https://lottie.host/bc551603-94c8-49da-a9a1-77f8f941a635/IPTte6dfGl.json'
                className="player"
                loop
                autoplay
                style={{ height: '150px', width: '150px' }}
            />
            <h1 className='text-lg font-bold'>{dataMensajeRegistroGuardado}</h1>
        </div>

        <div className='mt-8 text-center'>
          <button
            type='submit'
            onClick={
                () => setModalCampoRepetido(false) 
            }
            className='hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto'
          >
            ACEPTAR
          </button>
        </div>
    </Dialog>
  )
}
