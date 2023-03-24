import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';


const AcordionCampos = ({acordionEstate, setAcordionEstate}) => {

  const [show, setShow] = useState(false);
  const [showSub, setShowSub] = useState(false);

  return (
    <>
    {acordionEstate.map((acordion, index) => (
    <Draggable key={acordion.id} draggableId={acordion.id} index={index}>
    {(draggableProvided) => ( 
      <div 
        {...draggableProvided.draggableProps}
        ref={draggableProvided.innerRef}
        {...draggableProvided.dragHandleProps}
        className="hs-accordion-group bg-slate-50 px-5 py-3 my-2 rounded-2xl border-2 border-[#245A95]"
      >
        <span className='absolute right-8 text-2xl text-[#245A95]'>
        <ion-icon name="reorder-three-outline"></ion-icon>
        </span>
         <div className="hs-accordion active" id="hs-basic-nested-heading-one">
           <button onClick={() => setShow(!show)} className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400" aria-controls="hs-basic-nested-collapse-one">
              <div className={`text-2xl text-[#245A95] ${show ? "rotate-180" : ""}`}>
              <ion-icon name="chevron-down"></ion-icon>
              </div>
                {acordion.titulo}
           </button>
           
           {show && (
            <div id="hs-basic-nested-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-500" aria-labelledby="hs-basic-nested-heading-one">
            <div className="hs-accordion-group pl-6">
              <div className="bg-[#E2E2E2] rounded hs-accordion active" id="hs-basic-nested-sub-heading-one">
                <button onClick={() => setShowSub(!showSub)} className="rounded border-2 border-slate-300 p-2 hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400" aria-controls="hs-basic-nested-sub-collapse-one">
                  {acordion.subtitulo}
                  <div className={`text-2xl text-[#245A95] p-2 absolute right-12 ${showSub ? "rotate-180" : ""}`}>
                  <ion-icon name="chevron-down"></ion-icon>
                  </div>
                </button>
                {
                  showSub && (
                    <div id="hs-basic-nested-sub-collapse-one" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border-2 border-slate-100 hs-accordion-content w-full overflow-hidden transition-[height] duration-500" aria-labelledby="hs-basic-nested-sub-heading-one">
                      <div className='mt-2 flex flex-col gap-y-4'>
                        <span>Tipo campo:</span>
                        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-2 gap-1 space-y-1">
                          {/* Checkbox campos proyecto */}
                          <label htmlFor="hs-vertical-checkbox-in-form" className="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form" checked/>
                            <span className="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="text"></ion-icon>
                              <ion-icon name="calculator"></ion-icon>
                              Alfanumerico
                            </span>
                          </label>

                          <label htmlFor="hs-vertical-checkbox-in-form" className="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span className="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="text"></ion-icon>
                              Alfabetico
                            </span>
                          </label>

                          <label htmlFor="hs-vertical-checkbox-in-form" className="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span className="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="calculator"></ion-icon>
                              Numerico
                            </span>
                          </label>

                          <label htmlFor="hs-vertical-checkbox-in-form" className="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span className="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="at-outline"></ion-icon>
                              Correo
                            </span>
                          </label>

                          <label htmlFor="hs-vertical-checkbox-in-form" className="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span className="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="newspaper"></ion-icon>
                              Catalogo
                            </span>
                          </label>

                          <label htmlFor="hs-vertical-checkbox-in-form" className="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span className="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="create"></ion-icon>
                              Firma
                            </span>
                          </label>

                          <label htmlFor="hs-vertical-checkbox-in-form" className="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span className="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="image"></ion-icon>
                              Foto
                            </span>
                          </label>

                          <label htmlFor="hs-vertical-checkbox-in-form" className="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span className="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="calendar-number"></ion-icon>
                              Calendario
                            </span>
                          </label>

                          <label htmlFor="hs-vertical-checkbox-in-form" className="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span className="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="checkmark-circle"></ion-icon>
                              Checkbox
                            </span>
                          </label>
                        </div>
                      </div>
                      {/* Inputs de campos proyecto */}
                      <div className='mt-2 flex flex-col gap-y-4'>
                      <span>Campo:</span>
                          <div className="flex rounded-md shadow-sm">
                            <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">Campo:</span>
                            <input type="text" className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                          </div>
                      </div>
                      <div className='mt-2 flex flex-col gap-y-4'>
                      <span>Restricció:</span>
                          <div className="flex rounded-md shadow-sm">
                            <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">Restricción:</span>
                            <input type="text" className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                          </div>
                      </div>
                      <div className='mt-2 flex flex-col gap-y-4'>
                      <span>Tamaño:</span>
                          <div className="flex rounded-md shadow-sm">
                            <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">Tamaño:</span>
                            <input type="text" className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                          </div>
                      </div>
                    </div>
                  )
                }
                
              </div>
           </div>
         </div>
           )}
           
        </div>
        
      </div> 
      )}
      </Draggable>
      ))}
    </>
  )
}

export default AcordionCampos