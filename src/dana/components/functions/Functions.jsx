/* //Funcion que convierte el array de files en array de files de 8 bits para mandarlos al backend
export function guardarEvidencias(evidencias, idRegistro) {
    const promesasDeConversion = [];
  
    if (evidencias.length > 0) {
      evidencias.forEach((evidencia) => {
        const conversionPromise = new Promise((resolve) => {
          const reader = new FileReader();
  
          reader.onload = function (event) {
            const arrayBuffer = event.target.result;
            const byteArray = new Uint8Array(arrayBuffer);
            resolve(byteArray);
          };
  
          reader.readAsArrayBuffer(evidencia);
        });

        const Evidencia = {
          idEvidencia: 0,
          evidencia: conversionPromise,
          idCampo: 0,
          idInventario: idRegistro,
          nombreEvidencia: evidencia.name
        }
  
        //promesasDeConversion.push(conversionPromise);
        
        promesasDeConversion.push(Evidencia);
      });
  
      // Esperar a que todas las conversiones estén completas
      //return Promise.all(promesasDeConversion);
     return Promise.all(promesasDeConversion);

      
    } else {
      console.log("No se han proporcionado evidencias.");
      return Promise.resolve([]);
    }
  } */

  // Función que convierte el array de files en array de files de 8 bits para mandarlos al backend
export function guardarEvidencias(evidencias, idRegistro, idCampo) {
  const promesasDeConversion = [];

  if (evidencias.length > 0) {
    evidencias.forEach((evidencia) => {
      const conversionPromise = new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = function (event) {
          const arrayBuffer = event.target.result;
          const byteArray = new Uint8Array(arrayBuffer);
          resolve(byteArray);
        };

        reader.readAsArrayBuffer(evidencia);
      });

      const Evidencia = {
        idEvidencia: 0,
        evidencia: conversionPromise,
        camposProyecto:{
          idcamposproyecto: idCampo,
        },
        inventario:{
          idinventario: idRegistro,
        },
        nombreEvidencia: evidencia.name,
      
      };

      promesasDeConversion.push(Evidencia);
    });

    // Esperar a que todas las conversiones estén completas
    return Promise.all(
      promesasDeConversion.map((evidencia) => evidencia.evidencia)
    ).then((result) => {
      return promesasDeConversion.map((evidencia, index) => ({
        ...evidencia,
        evidencia: uint8ArrayAListaInt(result[index]),
      }));
    });
  } else {
    console.log("No se han proporcionado evidencias.");
    return Promise.resolve([]);
  }
}

function uint8ArrayAListaInt(uint8Array) {
  // Usa Array.from() con una función de mapeo para convertir Uint8Array a una lista de enteros
  //console.log(uint8Array);
  const listaInt =  Array.from(uint8Array, byte => byte);
  
  return listaInt;
}


  function obtenerIdCampo(campoARecuperar) {
    let respuesta = 0;
  
    for (const agrupacion of registroProvider.listaAgrupaciones) {
      for (const campo of agrupacion.campos) {
        if (campoARecuperar === campo.nombreCampo) {
          respuesta = campo.idCampo;
          break;
        }
      }
    }
  
    return respuesta;
  }

//Funcion para las firmas
export function guardarFirmas(registro){

}
