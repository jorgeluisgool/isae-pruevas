import React, { useState } from 'react'
import RegistrosForm from '../components/RegistrosForm'
import TableRegistros from '../components/TablaRegistros'
import { Dialog } from 'primereact/dialog';
import { useFetchUsers } from '../hooks/useFetchUsers';

const initialData = [  {    name: "Juan Perez",    email: "juan.perez@example.com",    image:      "https://randomuser.me/api/portraits/men/1.jpg",  },  {    name: "Maria Garcia",    email: "maria.garcia@example.com",    image:      "https://randomuser.me/api/portraits/women/2.jpg",  },  {    name: "Pedro Sanchez",    email: "pedro.sanchez@example.com",    image:      "https://randomuser.me/api/portraits/men/3.jpg",  },];

export const RegistrosPage = () => {

  const [data, setData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalAbrirCerrar, setModalAbrirCerrar] = useState(false); 
  const [showSub, setShowSub] = useState(null);
  
  const [listaRegistros, setListaRegistros] = useState([]);

  const { data: usuarios, loading } = useFetchUsers();
  // console.log(usuarios);

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

  // Funcoion para abrir y cerrar el sub acordion
  const toggleShow = (index) => {
    if (index === showSub) {
      setShowSub(null)
    } else {
      setShowSub(index)
    }
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
            data={data}
            headers={["Nombre e Email", "Folio"]}
            onDelete={handleDelete}
            onEdit={handleEdit}
            isSelected={isSelected}
            selectedRows={selectedRows}
            onSelectedRow={handleSelectedRow}
            setModalAbrirCerrar={setModalAbrirCerrar}
            listaRegistros={listaRegistros}
          />
    </div>
    </div>

    <Dialog header="Detalles de viaje" visible={modalAbrirCerrar} style={{ width: '90vw' }} onHide={() => setModalAbrirCerrar(false)}>
      <h1>Proyecto:</h1>
      <h1>Registro:</h1>

      <div className="bg-[#e2e2e2] rounded hs-accordion mt-3">
        <div className='flex items-center justify-around'>
          <div 
            // onClick={() => toggleShow(index)} 
            className="rounded p-4 hs-accordion-toggle hs-accordion-active:text-blue-600 py-1 inline-flex items-center gap-x-2 w-full font-black text-left text-[#245A95] text-xl transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400" 
            aria-controls="hs-basic-nested-sub-collapse-one"
          >
            <div className={`text-2xl text-[#245A95] p-2 right-12 ${showSub ? "rotate-180" : ""}`}>
              <ion-icon name="chevron-down"></ion-icon>
            </div>
              {''}   
          </div>
          <div className='pr-10'>
            {/* <button
              type="submit"
              onClick={() => eliminarCampo(index)}
              className="ml-auto h-10 w-10 object-cover active:scale-[.98] bg-transparent hover:bg-[#BE1622] hover:text-white text-[#BE1622] text-sm font-bold inline-flex items-center rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            >
              <span className='text-2xl'>
                <ion-icon name="trash"></ion-icon>
              </span>
              <span className="ml-1"></span>
            </button> */}
          </div>
        </div>
      </div>
    </Dialog>
    </>
    
  )
}
