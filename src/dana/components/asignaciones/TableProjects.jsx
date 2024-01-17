import { Button } from "primereact/button";

export const TableProjects = ({
  showTable,
  currentRows,
  currentPage,
  rowsPerPage,
  totalRows,
  totalPages,
  indexOfLastRow,
  setDeleteProject,
  setModalConfirmar,
  setRowsPerPage,
  selectedUser,
  paginate,
}) => {
  return (
    <div
      className={`transition-opacity duration-500 overflow-x-auto  ${
        showTable ? "opacity-100" : "opacity-0"
      }`}
    >
      {showTable ? (
        <div>
          <h1 className="pt-2 xl:pt-6 pl-3 xl:pl-0 text-2xl font-black text-[#245A95] mb-2">
            Proyectos asignados
          </h1>
          <div class="flex justify-center lg:ml-0 ml-80 lg:pl-0 pl-10">
            <table class="w-full bg-white shadow-md">
              <thead className="bg-[#245A95] text-white uppercase">
                <tr className="text-left">
                  <th scope="col" className="relative px-6 py-3">
                    <div className="items-center">
                      <span>USUARIO</span>
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <div className="items-center">
                      <span>PROYECTO</span>
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <div className="items-center">
                      <span>TIPO DE PROYECTO</span>
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <div className="items-center">
                      <span>FECHA CREACION</span>
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <div className="items-center">
                      <span>ELIMINAR</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Array.isArray(currentRows) &&
                  currentRows.map((project, index) => (
                    <tr key={index}>
                      <td className="px-6 py-2">
                        <div className="flex items-center">
                          <div className="ml-2">
                            <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                              {selectedUser.usuario}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2">
                        <div className="flex items-center">
                          <div className="ml-2">
                            <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                              {project.proyecto}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2">
                        <div className="flex items-center">
                          <div className="ml-2">
                            <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                              {project.tipoproyecto.descripcion}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2">
                        <div className="flex items-center">
                          <div className="ml-2">
                            <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                              {project.fechacreacion}
                            </div>
                          </div>
                        </div>
                      </td>
                      {/*  <td className="px-6 py-2">
                        <div className="flex items-center">
                          <div className="ml-2">
                            <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                              <Button
                                icon="pi pi-trash"
                                className="p-button-rounded p-button-danger"
                                onClick={() => {
                                  setDeleteProject(project);
                                  setModalConfirmar(true);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </td> */}
                      <td className="px-6">
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteProject(project);
                              setModalConfirmar(true);
                            }}
                            className="hover:shadow-slate-600 border h-6 w-6 bg-red-700 text-white text-xs xl:text-base font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-red-500 ml-6"
                            style={{ borderRadius: "50%" }}
                          >
                            <ion-icon
                              name="trash"
                              className="rounded-full"
                            ></ion-icon>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <span className="mr-2 text-[#245A95] font-bold text-xs lg:text-lg">
                Datos:
              </span>
              <select
                className="border border-gray-300 rounded px-3 py-1"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <h1 className="text-[#245A95] font-bold text-xs lg:text-lg ml-24">
              Total de proyectos:
              <span className="text-gray-700"> {totalRows}</span>
            </h1>
            <div className="flex items-center pl-4">
              <span className="mr-2 text-[#245A95] font-bold text-xs lg:text-lg ml-24">
                Página <span className="text-gray-700">{currentPage}</span> de{" "}
                <span className="text-gray-700">{totalPages}</span>
              </span>
              <nav className="relative z-0 inline-flex shadow-sm rounded-md">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-l-md focus:outline-none ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-white hover:bg-[#245A95]"
                  }`}
                >
                  <div className="text-[#245A95] hover:text-white">
                    <ion-icon name="caret-back-circle"></ion-icon>
                  </div>
                </button>
                <span className="px-3 py-1 bg-gray-300 text-gray-700">
                  {currentPage}
                </span>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastRow >= totalRows}
                  className={`px-3 py-1 rounded-r-md focus:outline-none ${
                    indexOfLastRow >= totalRows
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-white hover:bg-[#245A95]"
                  }`}
                >
                  <div className="text-[#245A95] hover:text-white">
                    <ion-icon name="caret-forward-circle"></ion-icon>
                  </div>
                </button>
              </nav>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
