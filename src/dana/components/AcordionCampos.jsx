import React, { useState } from 'react'

const AcordionCampos = ({titulo, subTitulo}) => {

  const [show, setShow] = useState(false);
  const [showSub, setShowSub] = useState(false);

  return (
    <>
      <div className="hs-accordion-group bg-slate-50 m-4 px-5 py-3 rounded-2xl border-2 border-[#245A95]">
         <div className="hs-accordion active" id="hs-basic-nested-heading-one">
           <button onClick={() => setShow(!show)} className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400" aria-controls="hs-basic-nested-collapse-one">
              <div className={`text-2xl text-[#245A95] ${show ? "rotate-180" : ""}`}>
              <ion-icon name="chevron-down"></ion-icon>
              </div>
                {titulo}
           </button>
           {/* <button>
             <ion-icon name="add-outline"></ion-icon>
             <p>Nuevo campo</p>
            </button> */}
           
           {show && (
            <div id="hs-basic-nested-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-nested-heading-one">
            <div className="hs-accordion-group pl-6">
              <div className="bg-[#E2E2E2] rounded hs-accordion active" id="hs-basic-nested-sub-heading-one">
                <button onClick={() => setShowSub(!showSub)} className="rounded border-2 border-slate-300 p-2 hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400" aria-controls="hs-basic-nested-sub-collapse-one">
                  {subTitulo}
                  <div className={`text-2xl text-[#245A95] p-2 absolute right-9 ${showSub ? "rotate-180" : ""}`}>
                  <ion-icon name="chevron-down"></ion-icon>
                  </div>
                </button>
                {
                  showSub && (
                    <div id="hs-basic-nested-sub-collapse-one" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border-2 border-slate-100 hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-nested-sub-heading-one">
                      <div className='mt-2 flex flex-col gap-y-4'>
                        <span>Tipo campo:</span>
                        <div class="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-2 gap-1 space-y-1">

                        {/* <label class="cursor-pointer">
                          <input type="radio" class="peer sr-only" name="pricing" />
                          <div class="w-72 max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                            <div class="flex flex-col gap-1">
                              <div class="flex items-center justify-between">
                                <p class="text-sm font-semibold uppercase text-gray-500">Alfanumerico</p>
                                <div>
                                  <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                                </div>
                              </div>
                              <div class="flex items-end justify-between">
                                <p><span class="text-lg font-bold">12 GB</span> of storage</p>
                                <p class="text-sm font-bold">$12 / mo</p>
                              </div>
                            </div>
                          </div>
                        </label> */}

                          <label for="hs-vertical-checkbox-in-form" class="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span class="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="text"></ion-icon>
                              <ion-icon name="calculator"></ion-icon>
                              Alfanumerico
                            </span>
                          </label>

                          <label for="hs-vertical-checkbox-in-form" class="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span class="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="text"></ion-icon>
                              Alfabetico
                            </span>
                          </label>

                          <label for="hs-vertical-checkbox-in-form" class="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span class="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="calculator"></ion-icon>
                              Numerico
                            </span>
                          </label>

                          <label for="hs-vertical-checkbox-in-form" class="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span class="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="newspaper"></ion-icon>
                              Catalogo
                            </span>
                          </label>

                          <label for="hs-vertical-checkbox-in-form" class="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span class="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="create"></ion-icon>
                              Firma
                            </span>
                          </label>

                          <label for="hs-vertical-checkbox-in-form" class="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span class="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="image"></ion-icon>
                              Foto
                            </span>
                          </label>

                          <label for="hs-vertical-checkbox-in-form" class="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span class="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="calendar-number"></ion-icon>
                              Calendario
                            </span>
                          </label>

                          <label for="hs-vertical-checkbox-in-form" class="max-w-xs p-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form"/>
                            <span class="text-xs text-gray-500 ml-3 dark:text-gray-400">
                            <ion-icon name="checkmark-circle"></ion-icon>
                              Checkbox
                            </span>
                          </label>
                        </div>
                        

                      </div>
                      <div className='mt-2 flex flex-col gap-y-4'>
                      <span>Campo:</span>
                      <div>
                          <div class="flex rounded-md shadow-sm">
                            <span class="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">Campo:</span>
                            <input type="text" class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                          </div>
                      </div>

                      </div>
                      <div className='mt-2 flex flex-col gap-y-4'>
                      <span>Restricció:</span>
                      <div>
                          <div class="flex rounded-md shadow-sm">
                            <span class="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">Restricción:</span>
                            <input type="text" class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                          </div>
                      </div>

                      </div>
                      <div className='mt-2 flex flex-col gap-y-4'>
                      <span>Tamaño:</span>
                      <div>
                          <div class="flex rounded-md shadow-sm">
                            <span class="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">Tamaño:</span>
                            <input type="text" class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                          </div>
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
    </>
  )
}

export default AcordionCampos