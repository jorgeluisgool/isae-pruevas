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



//Funcion para las firmas

export function saveSignatureFromURL(signatureURL, campo, idInventario) {
  if (signatureURL) {
    const conversionPromise = fetch(signatureURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener la firma desde la URL: ${response.statusText}`);
        }
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => new Uint8Array(arrayBuffer));

    // Esperar a que la conversión esté completa
    return conversionPromise.then((result) => {
      const Firma = {
        idFirma: 0,
        firma: uint8ArrayAListaInt(result),
        nombreFirma: campo.nombreCampo,
        camposProyecto: {
          idcamposproyecto: campo.idCampo,
        },
        inventario: {
          idinventario: idInventario,
        },
      };

      return Firma;
    });
  } else {
    console.log("No se ha proporcionado una URL de firma.");
    return Promise.resolve(null);
  }
}

export function savePhotosFromURL(signatureURL, campo, idInventario) {
  if (signatureURL) {
    const conversionPromise = fetch(signatureURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener la firma desde la URL: ${response.statusText}`);
        }
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => new Uint8Array(arrayBuffer));

    // Esperar a que la conversión esté completa
    return conversionPromise.then((result) => {
      const Firma = {
        idEvidencia: 0,
        evidencia: uint8ArrayAListaInt(result),
        nombreEvidencia: campo.nombreCampo,
        camposProyecto: {
          idcamposproyecto: campo.idCampo,
        },
        inventario: {
          idinventario: idInventario,
        },
      };

      return Firma;
    });
  } else {
    console.log("No se ha proporcionado una URL de firma.");
    return Promise.resolve(null);
  }
}


function uint8ArrayAListaInt(uint8Array) {
  const listaInt =  Array.from(uint8Array, byte => byte);
  return listaInt;
}