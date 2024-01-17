export const TableRegisters = ({
  showTable,
  currentRowsA,
  currentPageA,
  rowsPerPageA,
  totalRowsA,
  totalPagesA,
  indexOfLastRowA,
  setRowsPerPageA,
  selectedUser,
  paginateA,
  handleCheckboxChange,
  selectedItems,
}) => {
  return (
    <div
      className={`transition-opacity duration-500 ${
        !showTable ? "opacity-100" : "opacity-0"
      }`}
    >
      {!showTable ? (
        <div>
          <h1 className="pt-2 xl:pt-6 pl-3 xl:pl-0 text-2xl font-black text-[#245A95] mb-2">
            Registros
          </h1>
          <div class="flex justify-center lg:ml-0 ml-40 lg:pl-0 pl-8">
            <table class="w-full bg-white shadow-md">
              <thead className="bg-[#245A95] text-white uppercase">
                <tr className="">
                  <th scope="col" className="relative px-6 py-1">
                    <div className="items-center">
                      <span>SELECCIONAR</span>
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-1">
                    <div className="items-center">
                      <span>FOLIO</span>
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-1">
                    <div className="items-center">
                      <span>FECHA CREACION</span>
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-1">
                    <div className="items-center">
                      <span>ESTATUS</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Array.isArray(currentRowsA) &&
                  currentRowsA.map((registers, index) => (
                    <tr key={index}>
                      <td className="px-6 py-2">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(
                            registers.idinventario
                          )}
                          onChange={() =>
                            handleCheckboxChange(registers.idinventario)
                          }
                        />
                      </td>
                      <td className="px-6 py-2">
                        <div className="flex items-center">
                          <div className="ml-2">
                            <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                              {registers.folio}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2">
                        <div className="flex items-center">
                          <div className="ml-2">
                            <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                              {registers.fechacreacion}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2">
                        <div className="flex items-center">
                          <div className="ml-2">
                            <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                              {registers.estatus}
                            </div>
                          </div>
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
                value={rowsPerPageA}
                onChange={(e) => setRowsPerPageA(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <h1 className="text-[#245A95] font-bold text-xs lg:text-lg lg:ml-18 ml-10">
              Total de registros:
              <span className="text-gray-700"> {totalRowsA}</span>
            </h1>
            <div className="flex items-center pl-4">
              <span className="mr-2 text-[#245A95] font-bold text-xs lg:text-lg lg:ml-18 ml-10">
                Página <span className="text-gray-700">{currentPageA}</span> de{" "}
                <span className="text-gray-700">{totalPagesA}</span>
              </span>
              <nav className="relative z-0 inline-flex shadow-sm rounded-md">
                <button
                  onClick={() => paginateA(currentPageA - 1)}
                  disabled={currentPageA === 1}
                  className={`px-3 py-1 rounded-l-md focus:outline-none ${
                    currentPageA === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-white hover:bg-[#245A95]"
                  }`}
                >
                  <div className="text-[#245A95] hover:text-white">
                    <ion-icon name="caret-back-circle"></ion-icon>
                  </div>
                </button>
                <span className="px-3 py-1 bg-gray-300 text-gray-700">
                  {currentPageA}
                </span>
                <button
                  onClick={() => paginateA(currentPageA + 1)}
                  disabled={indexOfLastRowA >= totalRowsA}
                  className={`px-3 py-1 rounded-r-md focus:outline-none ${
                    indexOfLastRowA >= totalRowsA
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
