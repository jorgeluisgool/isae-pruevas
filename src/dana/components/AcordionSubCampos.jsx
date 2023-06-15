import React, { useContext, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { ExampleContex } from '../context/ExampleContext';
import { RadioButton } from 'primereact/radiobutton';
import { Field, Form, Formik } from 'formik';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/// COMPONETES ///
const AcordionSubCampos = ({data, acordionEstate, index}) => {


  const [ingredient, setIngredient] = useState('');

  const { dataArchivoExcel, setDataArchivoExcel } = useContext(ExampleContex);
  
  // Estado para abrir y cerrar el sub acordion 
  const [showSub, setShowSub] = useState(null);

  // Funcoion para abrir y cerrar el sub acordion
  const toggleShow = (index) => {
    if (index === showSub) {
      setShowSub(null)
    } else {
      setShowSub(index)
    }
  };

  // const camposOrdenados = arreglo2[1].campos.sort((a,b) => {
  //   return a.campo.localeCompare(b.campo);
  // });

  // console.log(camposOrdenados);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: data.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <>  
      {/* { data.campos.map((acor, index) => ( */}
        <div 
          style={style}
          ref={setNodeRef}
          {...attributes}
          className="bg-[#e2e2e2] rounded hs-accordion mt-3"
        >
          <span className='absolute right-12 text-xl text-[#245A95]' {...listeners}>
            <ion-icon name="reorder-three-outline"></ion-icon>
          </span>
          <div onClick={() => toggleShow(index)} className="rounded border-2 border-slate-300 p-4 hs-accordion-toggle hs-accordion-active:text-blue-600 py-1 inline-flex items-center gap-x-2 w-full font-black text-left text-[#245A95] text-xl transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400" aria-controls="hs-basic-nested-sub-collapse-one">
            <div className={`text-2xl text-[#245A95] p-2 right-12 ${showSub ? "rotate-180" : ""}`}>
              <ion-icon name="chevron-down"></ion-icon>
            </div>
              {data.campo}   
          </div>
          {
            showSub === index && (
              <Formik>
                <Form>
                <div id="hs-basic-nested-sub-collapse-one" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-4 border-2 border-slate-100 hs-accordion-content w-full overflow-hidden transition-[height] duration-500" aria-labelledby="hs-basic-nested-sub-heading-one">
                  
                    <div className='mt-2 flex flex-col gap-y-4'>
                      <span className='text-[#245A95] font-black'>Tipo campo:</span>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-1 space-y-1">
                        {/* Checkbox campos proyecto */}
                          <div className="flex items-center">
                            <RadioButton inputId="ingredient1" name="pizza" value="Cheese" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Cheese'} />
                            <div className="flex items-center ml-1">
                              <ion-icon name="text" className="text-gray-700 text-xl"></ion-icon>
                              <ion-icon name="calculator" className="text-gray-700 text-xl ml-2"></ion-icon>
                            </div>
                            <label htmlFor="ingredient1" className="ml-1 text-gray-700 font-black text-xs">/Alfanumérico</label>
                          </div>
                          <div className="flex items-center">
                            <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Mushroom'} />
                            <div className="flex items-center ml-1">
                              <ion-icon name="text" className="text-gray-700 text-xl"></ion-icon>
                            </div>
                            <label htmlFor="ingredient1" className="ml-1 text-gray-700 font-black text-xs">/Alfabético</label>
                          </div>
                          <div className="flex items-center">
                            <RadioButton inputId="ingredient3" name="pizza" value="Pepper" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Pepper'} />
                            <div className="flex items-center ml-1">
                              <ion-icon name="calculator"></ion-icon>
                            </div>
                            <label htmlFor="ingredient1" className="ml-1 text-gray-700 font-black text-xs">/Numérico</label>
                          </div>
                          <div className="flex items-center">
                            <RadioButton inputId="ingredient4" name="pizza" value="aaaa" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'aaaa'} />
                            <div className="flex items-center ml-1">
                              <ion-icon name="at-outline"></ion-icon>
                            </div>
                            <label htmlFor="ingredient1" className="ml-1 text-gray-700 font-black text-xs">/Correo</label>
                          </div>
                          <div className="flex items-center">
                            <RadioButton inputId="ingredient5" name="pizza" value="bbbb" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'bbbb'} />
                            <div className="flex items-center ml-1">
                              <ion-icon name="newspaper"></ion-icon>
                            </div>
                            <label htmlFor="ingredient1" className="ml-1 text-gray-700 font-black text-xs">/Catálago</label>
                          </div>
                          <div className="flex items-center">
                            <RadioButton inputId="ingredient6" name="pizza" value="firma" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'firma'} />
                            <div className="flex items-center ml-1">
                              <ion-icon name="create"></ion-icon>
                            </div>
                            <label htmlFor="ingredient1" className="ml-1 text-gray-700 font-black text-xs">/Firma</label>
                          </div>
                          <div className="flex items-center">
                            <RadioButton inputId="ingredient7" name="pizza" value="foto" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'foto'} />
                            <div className="flex items-center ml-1">
                              <ion-icon name="image"></ion-icon>
                            </div>
                            <label htmlFor="ingredient1" className="ml-1 text-gray-700 font-black text-xs">/Foto</label>
                          </div>
                          <div className="flex items-center">
                            <RadioButton inputId="ingredient8" name="pizza" value="calendario" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'calendario'} />
                            <div className="flex items-center ml-1">
                              <ion-icon name="calendar-number"></ion-icon>
                            </div>
                            <label htmlFor="ingredient1" className="ml-1 text-gray-700 font-black text-xs">/Calendario</label>
                          </div>
                          <div className="flex items-center">
                            <RadioButton inputId="ingredient8" name="pizza" value="check" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'check'} />
                            <div className="flex items-center ml-1">
                              <ion-icon name="checkmark-circle"></ion-icon>
                            </div>
                            <label htmlFor="ingredient1" className="ml-1 text-gray-700 font-black text-xs">/Checkbox</label>
                          </div>
                        </div>
                      </div>
                      {/* Inputs de campos proyecto */}
                      <div className='mt-2 flex flex-col gap-y-4'>
                      <div className=''>
                        <span className='text-[#245A95] font-black'>Campo:</span>
                          <div className="flex rounded-md shadow-sm">
                            <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">Campo:</span>
                            <input type="text" className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                          </div>
                      </div>
                      <div className=''>
                      <span className='text-[#245A95] font-black'>Restricció:</span>
                          <div className="flex rounded-md shadow-sm">
                            <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">Restricción:</span>
                            <input type="text" className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                          </div>
                      </div>
                      <div className=''>
                        <span className='text-[#245A95] font-black'>Tamaño:</span>
                          <div className="flex rounded-md shadow-sm">
                            <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">Tamaño:</span>
                            <input type="text" className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                          </div>
                      </div>
                      </div>
                </div>
                </Form>
              </Formik>
            )
          }   
      </div> 
      {/* ))
      } */}
    </>
  )
}

export default AcordionSubCampos