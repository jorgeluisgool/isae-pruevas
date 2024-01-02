import { api } from "../../helpers/variablesGlobales";

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

//Funcion para la foto 

export function savePhotosFromURL(signatureURL, campo, idInventario) {
  console.log("CAMPO",  campo);
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

//this function will be use for news register with same method 
export function newRegister(dataColeccion, proyectoSeleccionado){

  fetch(`${api}/registrar/inventario/${dataColeccion.listaAgrupaciones[0].campos[0].valor}/${dataColeccion.inventario.proyecto.idproyecto}`,{
    method:'GET',
    headers:{
      'Content-Type': 'application/json' 
    }
  })
  .then(response => response.json())
  .then(responseData => {
    console.log(responseData);
    if(responseData[0]!=="existe"){
      console.log(responseData);
      dataColeccion.inventario.idinventario = responseData[0];

      const valores = [];
      
      for(var i = 0; i < dataColeccion.listaAgrupaciones.length; i++){
        dataColeccion.listaAgrupaciones[i].idInventario = responseData[0]; 
        
        for(var j = 0; j < dataColeccion.listaAgrupaciones[i].campos.length; j++){
          const val = {
          valor : dataColeccion.listaAgrupaciones[i].campos[j].valor || '',
          idCampo: dataColeccion.listaAgrupaciones[i].campos[j].idCampo,
          idInventario: responseData[0]
        }
        valores.push(val);
        }
      }

      for(var i = 0; i < dataColeccion.firmas.length; i++){
        dataColeccion.firmas[i].inventario.idinventario = responseData[0];
      }

      for(var i = 0; i < dataColeccion.evidencias.length; i++){
        dataColeccion.evidencias[i].inventario.idinventario = responseData[0];
      }

      for(var i = 0; i < dataColeccion.fotos.length; i++){
        dataColeccion.fotos[i].inventario.idinventario = responseData[0];
      }

      console.log(valores);

      fetch(`${api}/registrar/campo/valores`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)        
      })
      .then(response => response.json())
      .then(responseData => {
        updateRegister(dataColeccion,proyectoSeleccionado);
        console.log(responseData);
      })
      .catch(error => console.log(error));

      fetch(`${api}/asignar/registro/${dataColeccion.usuario.idusuario}`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(responseData)
      })
      .then(response => response.text())
      .then(responseData => console.log(responseData))
      .catch(error => console.log(error));

      console.log(dataColeccion);
    }
    
  })
  .catch(error => console.log(error));

}

export function updateRegister(dataColeccion, proyectoSeleccionado){
  fetch(`${api}/inventario/actualizar/valores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(dataColeccion) 
  })
    .then(response => response.json())
    .then(responseData => {
      // Lógica adicional después de enviar los datos a la API
      // console.log('Respuesta de la API:', responseData);

      fetch(`${api}/generar/nuevo/documento/${proyectoSeleccionado.idinventario}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' 
        },
        // body: JSON.stringify(arregloDuplicidad) 
      })
        .then(response => response.text())
        .then(responseData => {
          // Lógica adicional después de enviar los datos a la API
          // console.log('Respuesta de la API:', responseData);
        
          
        })
        .catch(error => console.log(error));

    })
    .catch(error => {
      console.log(error);
      return false;
    });

    return true;
}


