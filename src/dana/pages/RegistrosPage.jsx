import React, { useState } from 'react'
import RegistrosForm from '../components/RegistrosForm'
import TableRegistros from '../components/TablaRegistros'

const initialData = [  {    name: "Juan Perez",    email: "juan.perez@example.com",    image:      "https://randomuser.me/api/portraits/men/1.jpg",  },  {    name: "Maria Garcia",    email: "maria.garcia@example.com",    image:      "https://randomuser.me/api/portraits/women/2.jpg",  },  {    name: "Pedro Sanchez",    email: "pedro.sanchez@example.com",    image:      "https://randomuser.me/api/portraits/men/3.jpg",  },];

export const RegistrosPage = () => {

  const [data, setData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  

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


  const handleCancel = () => {
    setShowForm(false);
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
    <h1 className="pt-6 pl-4 text-4xl font-black">Registros</h1>
    <div className="container mx-auto">
        <RegistrosForm/>
    </div>
    <div className="overflow-x-auto">
        <div className="my-6 mx-4">
          <TableRegistros 
            data={data}
            headers={["Nombre e Email", "Folio"]}
            onDelete={handleDelete}
            onEdit={handleEdit}
            isSelected={isSelected}
            selectedRows={selectedRows}
            onSelectedRow={handleSelectedRow}
          />
    </div>
    </div>
    </>
    
  )
}
