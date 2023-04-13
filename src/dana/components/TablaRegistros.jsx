import React from 'react';

const TableRegistros = ({data, headers, onDelete, onEdit, selectedRows, isSelected, onSelectedRow}) => {
  return (
    <table className="min-w-full bg-white rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-gray-500 uppercase">
        <tr>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Seleccionar</span>
            <input
              type="checkbox"
              className="absolute h-4 w-4 top-3 left-3"
              onChange={() => {}}
              checked={selectedRows.length === data.length}
            />
          </th>
          {headers.map((header) => (
            <th
              key={header}
              scope="col"
              className="px-6 py-3 text-left font-bold"
            >
              {header}
            </th>
          ))}
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Editar / Borrar</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-4 w-4">
                  <input
                    type="checkbox"
                    className=" top-3 left-3 p-2"
                    checked={isSelected(index)}
                    onChange={() => onSelectedRow(index)}
                  />
                </div>
                <div className="flex-shrink-0 h-10 w-10">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={item.image}
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.email}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex space-x-4">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => onEdit(index)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => onDelete(index)}
                >
                  Borrar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableRegistros;