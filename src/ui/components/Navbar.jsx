import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
  // funcionamiento del estado del Menu
  // let [open,setOpen]=useState(false);

  //Hoock para Cerrrar Sesión
  // const navigate = useNavigate();

  //Funcion Boton Cerrar sesión
  // const onLogout = () => {

  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');

  //     navigate('/login', {
  //         replace: true
  //     });
  // }

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      <div className="z-30 shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-[#245A95] py-2 md:px-6 px-5">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] mt-2">
            <Link to="/menu">
              <div className="flex items-center transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl hover:bg-white rounded-md">
                <span className="hover:text-gray-400 duration-500 text-3xl text-slate-50">
                  <img
                    src="/src/assets/isae.png"
                    alt="Icono"
                    className="h-11 mr-1 hover:animate-spin"
                  />
                </span>
                <img
                  src="/src/assets/letras_isae.png"
                  alt="Icono"
                  className=" h-7 mr-2"
                />
              </div>
            </Link>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-4xl absolute right-7 top-3 cursor-pointer text-slate-50 xl:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>
          <ul
            ref={navbarRef}
            className={`xl:flex xl:items-center xl:pb-0 pb-3 pt-1 absolute xl:static bg-[#245A95] xl:z-auto z-[-1] left-40 w-full xl:w-auto xl:pl-0 pl-3 transition-all duration-500 ease-in ${
              open ? "top-20" : "top-[-520px]"
            } `}
          >
            <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
              <Link
                className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white"
                to="/proyectos"
              >
                <div className="xl:hidden">
                  <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                    <ion-icon name="library-outline"></ion-icon>
                  </div>
                </div>
                <div className="xl:ml-1 ml-2">
                  <p className="text-xl font-semibold">Proyectos</p>
                </div>
              </Link>
            </li>
            <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
              <Link
                className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white"
                to="/usuarios"
              >
                <div className="xl:hidden">
                  <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                    <ion-icon name="person-add-outline"></ion-icon>
                  </div>
                </div>
                <div className="xl:ml-1 ml-2">
                  <p className="text-xl font-semibold">Usuarios</p>
                </div>
              </Link>
            </li>
            <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
              <Link
                className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white"
                to="/catalogos"
              >
                <div className="xl:hidden">
                  <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadowxl text-[#245A95] text-3xl">
                    <ion-icon name="clipboard-outline"></ion-icon>
                  </div>
                </div>
                <div className="xl:ml-1 ml-2">
                  <p className="text-xl font-semibold">Catalogo</p>
                </div>
              </Link>
            </li>
            <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
              <Link
                className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white"
                to="/asignaciones"
              >
                <div className="xl:hidden">
                  <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                    <ion-icon name="accessibility-outline"></ion-icon>
                  </div>
                </div>
                <div className="xl:ml-1 ml-2">
                  <p className="text-xl font-semibold">Asignaciones</p>
                </div>
              </Link>
            </li>
            <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
              <Link
                className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white"
                to="/clientes"
              >
                <div className="xl:hidden">
                  <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                    <ion-icon name="create-outline"></ion-icon>
                  </div>
                </div>
                <div className="xl:ml-1 ml-2">
                  <p className="text-xl font-semibold">Registros</p>
                </div>
              </Link>
            </li>
            <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
              <Link
                className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white"
                to="/asistencia"
              >
                <div className="xl:hidden">
                  <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                    <ion-icon name="id-card-outline"></ion-icon>
                  </div>
                </div>
                <div className="xl:ml-1 ml-2">
                  <p className="text-xl font-semibold">Asistencia</p>
                </div>
              </Link>
            </li>
            <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
              <Link
                className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white"
                to="/dashboard"
              >
                <div className="xl:hidden">
                  <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                    <ion-icon name="extension-puzzle-outline"></ion-icon>
                  </div>
                </div>
                <div className="xl:ml-1 ml-2">
                  <p className="text-xl font-semibold">Dashborad</p>
                </div>
              </Link>
            </li>
            <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
              <Link
                className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white"
                to="/"
              >
                <div className="xl:hidden">
                  <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                    <ion-icon name="bar-chart-outline"></ion-icon>
                  </div>
                </div>
                <div className="xl:ml-1 ml-2">
                  <p className="text-xl font-semibold">Balance</p>
                </div>
              </Link>
            </li>
            <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
              <Link
                className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white"
                to="/"
              >
                <div className="xl:hidden">
                  <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                    <ion-icon name="documents-outline"></ion-icon>
                  </div>
                </div>
                <div className="xl:ml-1 ml-2">
                  <p className="text-xl font-semibold">Duplicados</p>
                </div>
              </Link>
            </li>
            {/* Resto de elementos del menú */}
            <button
              className="bg-[#245A95] text-white border border-white hover:bg-white hover:text-[#245A95] shadow-md py-2 px-3 mt-2 rounded-full md:ml-4 duration-500 font-bold"
              onClick={onLogout}
            >
              <i className="pi pi-sign-out"></i>
            </button>
          </ul>
        </div>
      </div>
      {open && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-20" />
      )}

      {/* <div className='z-10 shadow-md w-full fixed top-0 left-0'>
        <div className='md:flex items-center justify-between bg-[#245A95] py-2 md:px-6 px-5'>
            <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] mt-2'>
                <Link to='/menu'>
                    <div className="flex items-center transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl hover:bg-white rounded-md">
                        <span className='hover:text-gray-400 duration-500 text-3xl text-slate-50'>
                          <img src="/src/assets/isae.png" alt="Icono" className="h-11 mr-1 hover:animate-spin" />
                        </span>
                        <img src="/src/assets/letras_isae.png" alt="Icono" className=" h-7 mr-2" />
                    </div>
                </Link> 
            </div>
            <div onClick={()=>setOpen(!open)} className='text-4xl absolute right-7 top-3 cursor-pointer text-slate-50 xl:hidden'>
                <ion-icon name={open ? 'close':'menu'}></ion-icon>
            </div>
            <ul className={`xl:flex xl:items-center xl:pb-0 pb-3 pt-1 absolute xl:static bg-[#245A95] xl:z-auto z-[-1] left-40 w-full xl:w-auto xl:pl-0 pl-3 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-520px]'} `}>
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/proyectos">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="library-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Proyectos</p>
                    </div> 
                  </Link>
                </li>
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="person-add-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Usuarios</p>
                    </div> 
                  </Link>
                </li>
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadowxl text-[#245A95] text-3xl">
                        <ion-icon name="clipboard-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Catalogo</p>
                    </div> 
                  </Link>
                </li>
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="accessibility-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Asignaciones</p>
                    </div> 
                  </Link>
                </li>
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/registros">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="create-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Registros</p>
                    </div> 
                  </Link>
                </li>
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="id-card-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Asistencia</p>
                    </div> 
                  </Link>
                </li>
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="extension-puzzle-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Dashborad</p>
                    </div> 
                  </Link>
                </li>
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="bar-chart-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Balance</p>
                    </div> 
                  </Link>
                </li>
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="documents-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Duplicados</p>
                    </div> 
                  </Link>
                </li>
                
                <button 
                    className='bg-[#245A95] text-white border border-white hover:bg-white hover:text-[#245A95] shadow-md py-2 px-3 mt-2 rounded-full md:ml-4 duration-500 font-bold'
                    onClick={onLogout}
                >
                    <i className="pi pi-sign-out"></i>
                </button>
            </ul>
        </div>
    </div> */}
    </>
  );
};
