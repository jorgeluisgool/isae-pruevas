import React, { useEffect, useState } from "react";
import { api } from "../helpers/variablesGlobales";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";

export const ClientesRegistrosPage = () => {
  const { userAuth, setUserAuth, setClienteSeleccionado } = useAuth();

  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${api}/obtener/clientes/usuario/${userAuth[0].clienteAplicacion.idcliente}`
        );
        const jsonData = await response.json();
        setClientes(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    // Ejecutar fetchData después de 1 segundo
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 2000);
  }, [clientes]);

  // funcion que hace que al hacer refesh se mantenga el usuario activo
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    const fetchData = () => {
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUserAuth(foundUser);
      }
    };

    // Ejecutar fetchData después de 1 segundo
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 1000);

    // Limpiar el temporizador en caso de que el componente se desmonte antes de que se complete el tiempo de espera
    // return () => clearTimeout(timeoutId);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtro para el search
  const filterClientes = clientes.filter((cliente) =>
    cliente.cliente.toLowerCase().includes(searchTerm.toLowerCase()) 
  );
  return (
    <>
      <h1 className="pt-2 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">
        Clientes
      </h1>
      <div className="mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold text-[#245A95] pb-2">Selecciona un cliente para poder ver sus registros.</h1>
      <div className="p-inputgroup md:px-40 lg:px-60 xl:px-80">
        <span className="p-float-label w-full mt-6">
          <InputText
            className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
            name="perfil"
            value={searchTerm}
            onChange={handleSearch}    
          />
          <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
            <i className="pi pi-file-edit text-white font-light text-xl"></i>
          </span>
          <label
            htmlFor="nombrealberca"
            className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
          >
            Busca el cliente
          </label>
        </span>
      </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-8 m-4 text-center">
          {filterClientes.map((cliente, index) => (
            <Link
              key={index}
              to="/registros"
              onClick={() => setClienteSeleccionado(cliente)}
            >
              <div className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
                <div className="px-3 bg-[#E2E2E2]">
                  <div className="font-bold text-sm xl:text-2xl mb-2 text-[#245A95]">
                    {cliente.cliente}
                  </div>
                </div>
                <div className="relative h-20 lg:h-40">
                  {cliente.urllogo ? (
                    <img
                      className="absolute inset-0 w-full h-full object-contain transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-75"
                      src={cliente.urllogo}
                      alt="Random image"
                    />
                  ) : (
                    <div className="flex items-center justify-center absolute inset-0 w-full h-full text-[#245A95] font-bold text-3xl">
                      {cliente.cliente}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
