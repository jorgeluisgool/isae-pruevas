import AcordionCampos from '../components/AcordionCampos'
import { useContext, useEffect } from 'react';
import { ExampleContex } from '../context/ExampleContext';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { BotonFlotanteGuardar } from '../components/BotonFlotanteGuardar';
import { BotonFlotanteRegresar } from '../components/BotonFlotanteRegresar';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useFetchProjects } from '../hooks/useFetchProjects';
import { api } from '../helpers/variablesGlobales';

/// COMPONETE ///
const CamposProyectoPage = () => {

  const { userAuth, setUserAuth, dataCrearProyecto } = useAuth();
  // console.log(dataCrearProyecto.tipo.name)

  const { data: proyectos, loading } = useFetchProjects();

  // Función que mantiene el estado del usuario al hacer refesh
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserAuth(foundUser);
      // console.log(foundUser)
    }
  }, []);

  const navigate = useNavigate();

   // Context del formulario crear proyecto
   const example = useContext(ExampleContex);

  // Context del archivo excel
  const { dataArchivoExcel, setDataArchivoExcel } = useContext(ExampleContex);
  // console.log(dataArchivoExcel)

  const handleDragEnd =(event) => {
    const {active, over} = event

    const oldIndex = dataArchivoExcel.findIndex(element => element.id === active.id); 
    const newIndex = dataArchivoExcel.findIndex(element => element.id === over.id);

    const newOrder = arrayMove(dataArchivoExcel, oldIndex, newIndex);

    setDataArchivoExcel(newOrder)
    console.log(newOrder)
  }

  const onSubmit = (values) => {

      fetch(`${api}/crear/proyecto/${dataCrearProyecto.proyecto}/${dataCrearProyecto.tipo.name}`, {
        method: 'POST', // O 'PUT' según el tipo de solicitud que desees realizar
        headers: {
          'Content-Type': 'application/json' // Asegúrate de establecer el tipo de contenido adecuado
        },
        body: JSON.stringify(dataArchivoExcel) // Convierte los valores a JSON antes de enviarlos
      })
        .then(response => response.json())
        .then(responseData => {
          // Lógica adicional después de enviar los datos a la API
          // ...
          console.log('Respuesta de la API:', responseData);
        })
        .catch(error => console.log(error));
    
      // resetForm();
  
      // setEmpresaActual(values);


    // console.log(values);
    // const empresa = {...values, usuario}
    // console.log(empresa)
   
  }; 

  const handleClickGuardar = () => {
    // Acciones a realizar cuando se hace clic en el botón flotante
    console.log('Botón flotante clickeado');
  };

  const handleClickRegresar = () => {
    // Acciones a realizar cuando se hace clic en el botón flotante izquierdo
    navigate('/proyectos');
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
      <BotonFlotanteGuardar onClick={onSubmit} />
      <BotonFlotanteRegresar onClick={handleClickRegresar} />
    </>
  )
}

export default CamposProyectoPage