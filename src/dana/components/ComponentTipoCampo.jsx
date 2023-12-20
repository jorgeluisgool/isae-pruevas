import { Field, useFormikContext } from 'formik'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';       
import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas'
import { api } from '../helpers/variablesGlobales';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';

import '../../styles/sigCanvas.css'
import {parse, format, isValid, parseISO } from 'date-fns';
import { guardarEvidencias, savePhotosFromURL, saveSignatureFromURL } from './functions/Functions';


export const ComponentTipoCampo = ({campo, dataProyectoSeleccionado, values, indexAgrupacion, indexCampo, itemagrupacion, setFiles, setIdCampo, files, signatures, setSignatures, photos, setPhotos}) => {

  console.log(dataProyectoSeleccionado);

  const { setFieldValue } = useFormikContext();

  const [selectedDate, setSelectedDate] = useState(campo.valor);

  const [filesArray, setFilesArray] = useState([]);

  const [archivos, setArchivos] = useState([]);

  const [photoURL, setPhotoURL] = useState("");
  const [booleanPhoto, setBooleanPhoto] = useState("");
  const [booleanSignature, setBooleanSiganture] = useState("");

  const [idFiles, setIdFiles] =  useState([]);
  const [archivosEliminar, setArchivosEliminar] = useState([]);
  const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
  const dropAreaRef = useRef(null);

  // Agregar eventos de arrastrar y soltar
  const handleDragOver = (e) => {
    e.preventDefault();
    dropAreaRef.current.classList.add('active');
  };

  const handleDragLeave = () => {
    dropAreaRef.current.classList.remove('active');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dropAreaRef.current.classList.remove('active');

    // Obtener la lista de archivos soltados
    const files = e.dataTransfer.files;

    // Procesar los archivos (puedes enviarlos al servidor aquí)
    subirArchivos(files);
  };


  const borrarEvidencia = () =>{
    fetch(`${api}/eliminar/evidencias/web`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(archivosEliminar)
    })
      .then(response => response.text())
  }


  const handleDescargarArchivo = (archivo) => {
    // Simular la descarga de archivo
    const url = URL.createObjectURL(archivo);
    const link = document.createElement('a');
    link.href = url;
    link.download = archivo.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemoveArchivo = (index) => {
    // Crear una copia de archivos seleccionados y eliminar el archivo en el índice dado
    const nuevosArchivos = [...archivosSeleccionados];
    const nuevosIds = [...idFiles];
    nuevosArchivos.splice(index, 1);
    nuevosIds.splice(index, 1);
    setArchivosEliminar(prevEliminar => [...prevEliminar, idFiles[index]])
    setArchivosSeleccionados(nuevosArchivos);
    setArchivos(nuevosArchivos);
    setIdFiles(nuevosIds);
    
  };

  const subirArchivos = (e) => {
    const nuevosArchivos = Array.from(e);
    setArchivos((archivosAnteriores) => [...archivosAnteriores, ...nuevosArchivos]);
    setArchivosSeleccionados((archivosAnteriores) => [...archivosAnteriores, ...nuevosArchivos]);
  };

  const insertarArchivos = async () => {
    if (archivos.length > 0) {
      async function construirDataColeccion() {
        try {
          // Esperar a que se resuelva la promesa
          const evidenciasConvertidas = await guardarEvidencias(
            archivos,
            dataProyectoSeleccionado.listaAgrupaciones[0].idInventario,
            campo.idCampo
          );
      
          // Asignar la evidencia al objeto dataColeccion
          return evidenciasConvertidas;

        } catch (error) {
          console.error('Error al obtener evidencias:', error);
        }
      }
      
      // Llamar a la función
      construirDataColeccion().then((dataColeccionResuelta =>{

        const archivosFiltrados = dataColeccionResuelta.filter((archivo) =>{
          return !filesArray.some((file) => file.name === archivo.nombreEvidencia);
        })

        const archivosEnFilesArrayNoEnData = filesArray.filter((file)=>{
          return !dataColeccionResuelta.some((archivo) => archivo.nombreEvidencia === file.name);
        })

        //setFiles(dataColeccionResuelta);
        setFiles(archivosFiltrados);
        console.log(files);
        console.log(archivosEnFilesArrayNoEnData);
      }))
      
    } else {
      console.log("No se han seleccionado archivos.");
    }
    setArchivos([]);
    setArchivosSeleccionados([]);
    setArchivosEliminar([]);
  };

  const getSiganture = () =>{
    dataProyectoSeleccionado.respuestaFirmas.map((firm)=>{
      if(firm.camposProyecto.idcamposproyecto == campo.idCampo){
        setImageURL(firm.url);
      }
      if(firm.url!==''){
        setBooleanSiganture("#5DC460");
      }else{
        setBooleanSiganture("#f44336");
      }
    })
  }

  const getPhoto = () =>{
    dataProyectoSeleccionado.respuestaFotos.map((firm)=>{
      if(firm.campoProyecto.idcamposproyecto == campo.idCampo){
        setPhotoURL(firm.url);
      }
      if(firm.url!==''){
        setBooleanPhoto("#5DC460");
      }else{
        setBooleanPhoto("#f44336");
      }
    })
  }

  useEffect(() => {
    getSiganture();
    getPhoto();
  }, []);
  



  // Función para convertir la fecha en formato válido
  const parseDate = (dateString) => {
    const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
    return parsedDate;
  };

  // Función para formatear la fecha a string
  const formatDateToString = (date) => {
    const formattedDate = format(date, 'dd/MM/yyyy');
    return formattedDate;
  };

  const [selectedValueCatalogo, setSelectedValueCatalogo] = useState(campo.valor);
  const [selectedValueCatalogoInput, setSelectedValueCatalogoInput] = useState(campo.valor);
  const [inputNumerico, setInputNumerico] = useState(campo.valor);

  const [imageURL, setImageURL] = useState(null);
  const [modalAbrirFirma, setModalAbrirFirma] = useState(false);
  const [modalAbrirFoto, setModalAbrirFoto] = useState(false);
  const [modalFirmaAbrirCerrar, setModalFirmaAbrirCerrar] = useState(false);
  const [modalEvidencia, setModalEvidencia] = useState(false) 
  const sigCanvas = useRef({})
  const limpiar = () => sigCanvas.current.clear()
 /*  const guardar = (campo, idInventario) => {

  setSignatures(saveSignatureFromURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"), campo, idInventario));

  console.log(signatures);
  setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"))
  setModalFirmaAbrirCerrar(false);
} */

const guardar = async (campo, idInventario) => {
  try {
    // Obtener la firma actual o inicializar un array vacío si es nulo o no es un array
    const currentSignatures = Array.isArray(signatures) ? [...signatures] : [];

    // Esperar a que la promesa se resuelva
    const signatureData = await saveSignatureFromURL(
      sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"),
      campo,
      idInventario
    );

    // Agregar la nueva firma al array existente
    currentSignatures.push(signatureData);

    // Actualizar el estado con el nuevo array de firmas
    setSignatures(currentSignatures);
    console.log(currentSignatures);

    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    setModalFirmaAbrirCerrar(false);
  } catch (error) {
    console.error(error);
  }
};

const inputFileRef = React.createRef();

  // Función para abrir la ventana de selección de archivo
  const handleClick = () => {
    inputFileRef.current.click();
  };

  // Función que se ejecuta al seleccionar un archivo
  const handleFileChange = async (event, campo, idInventario) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      try{
      const url = URL.createObjectURL(selectedFile);
      setPhotoURL(url);

      const currentPhotos = Array.isArray(photos) ? [...photos] : [];

      const photoData = await savePhotosFromURL(url,campo, idInventario);

      currentPhotos.push(photoData);

      setPhotos(currentPhotos);

      console.log(currentPhotos);

        
    }catch(error){
      console.log(error);
    }
    }
    // Puedes manejar el archivo seleccionado aquí, por ejemplo, subirlo a un servidor
    console.log('Archivo seleccionado:', selectedFile);
  };


  const toast = useRef(null);
  

  // const [hora, setHora] = useState(parseHora(campo.valor));

  const [hora, setHora] = useState(() => {
    const parsedHora = parseHora(campo.valor || "");

    if (isValid(parsedHora)) {
      return parsedHora;
    } else {
      // Si no se puede obtener una hora válida desde campo.valor, usar la hora actual
      return new Date();
    }
  });

  function parseHora(horaString) {
    const [hora, minutos] = horaString.split(':');
    const fechaActual = new Date();
    fechaActual.setHours(hora);
    fechaActual.setMinutes(minutos);
    return fechaActual;
  }

  const currentCatalogo = dataProyectoSeleccionado?.catalogos?.[campo?.nombreCampo]?.catalogo || [];
  const defaultOption = selectedValueCatalogoInput || '';

  // Si selectedValueCatalogoInput no está en el arreglo del catálogo, agregarlo
  if (selectedValueCatalogoInput && !currentCatalogo.includes(selectedValueCatalogoInput)) {
    currentCatalogo.push(selectedValueCatalogoInput);
  }

  /* const handlebtnEvidencias = () =>{
    setModalEvidencia(true)
    dataProyectoSeleccionado.respuestaCheckboxEvidencia.map((evidence)=>{
      console.log(evidence.url);
    })
  } */

  const handlebtnEvidencias = async (campo) => {

    setIdCampo(campo.idCampo);
    
    var cont = 0;
    // Array para almacenar objetos File
    const filesArray = [];
    const idFiles = [];
  
    // Función para descargar un archivo desde la URL y convertirlo en un objeto File
    const downloadAndCreateFile = async (url, id) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();

    
        // Obtener el tipo de contenido del encabezado de la respuesta
        var contentType = response.headers.get('content-type') || '';

       
    
        // Obtener el nombre del archivo de la URL
        var filename = url.substring(url.lastIndexOf('/') + 1);

        if (url.toLowerCase().includes('media&token')) {
          filename = url.substring(url.lastIndexOf('=') + 1);
        }

        if (url.toLowerCase().includes('.pdf')) {
          filename = url.substring(url.lastIndexOf('=') + 1).replace('.png', '.pdf');
          contentType = "application/pdf"
        }
    
        // Crear el objeto File con el tipo y el nombre correctos
        const file = new File([blob], filename, { type: contentType });
        filesArray.push(file);
        idFiles.push(id);
        console.log(idFiles);
      } catch (error) {
        console.error(`Error al descargar el archivo desde ${url}:`, error);
      }
    };
    
  
    // Iterar sobre las URLs y descargar los archivos
     await Promise.all(
      dataProyectoSeleccionado.respuestaCheckboxEvidencia.map((evidence) =>
        {downloadAndCreateFile(evidence.url, evidence.idfoto);
          //console.log(evidence.url);
        cont++;}
      )
    );
  
    // Ahora filesArray contiene objetos File descargados desde las URLs
    console.log(filesArray);
    
    setIdFiles(idFiles);
    setArchivosSeleccionados(filesArray);
    setFilesArray(filesArray);
    setArchivos(filesArray);
    setArchivosEliminar([]);
    setTimeout(() => {
      setModalEvidencia(true);
    }, 1000);


    
  };

  
  


  return (
    <>
      <div className="p-inputgroup">
        
        {campo.tipoCampo === 'CALENDARIO' && (
          <span className='p-float-label relative'>
            <Field name={campo.nombreCampo}>
              {({ field, form }) => (
                <Calendar
                  className="w-full appearance-none focus:outline-none bg-transparent"
                  value={selectedDate ? parseDate(selectedDate) : null}
                  dateFormat="dd/MM/yy"
                  onChange={(e) => {
                    const formattedDate = formatDateToString(e.value);
                    setSelectedDate(formattedDate); // Actualiza la variable de estado con la fecha seleccionada
                    form.setFieldValue(field.name, formattedDate); // Aquí asumo que tienes la variable 'form' disponible en el scope de tu componente
                  }}
                />
              )}
            </Field>
            <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
              <i className="pi pi-calendar-plus text-[#245A95] font-bold text-2xl"></i>
            </span>
          </span>
        )}

        {campo.tipoCampo === 'HORA' && (
          <span className='p-float-label relative'>
            <Field name={campo.nombreCampo}>
              {({ field, form }) => (
                <Calendar
                  className="w-full appearance-none focus:outline-none bg-transparent"
                  value={hora}
                  onChange={(e) => {
                    const formattedDate = format(e.value, 'HH:mm');
                    setHora(e.value);
                    form.setFieldValue(field.name, formattedDate);
                  }}
                  timeOnly
                />
              )}
            </Field>
            <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
              <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
            </span>
          </span>
        )}

        {campo.tipoCampo === "ALFABETICO" && (      
          <span className='p-float-label relative'>
            <Field 
              as={InputText}
              className="w-full appearance-none focus:outline-none bg-transparent"
              name={campo.nombreCampo}
              defaultValue={campo.valor}
              maxLength={campo.longitud}
              // onChange={(e) => {
              //   e.target.value = e.target.value.toUpperCase();
              // }}
              keyfilter={RegExp(`[A-Z ${campo.restriccion.replace('[','').replace(']','')}]`)}
            />
            <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
              <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
            </span>
          </span>         
        )}

        {campo.tipoCampo === "ALFANUMERICO" && ( 
          <span className='p-float-label relative'>
            <Field 
              as={InputText}
              className="w-full appearance-none focus:outline-none bg-transparent" 
              name={campo.nombreCampo}
              defaultValue={campo.valor}
              maxLength={campo.longitud}
              keyfilter={RegExp(`[0-9A-Z ${campo.restriccion.replace('[','').replace(']','')}]`)}
            />
            <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
              <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
            </span>
          </span> 
        )}

        {campo.tipoCampo === "NUMERICO" && (
          <span className='p-float-label relative'>
            <Field
              className="w-full appearance-none focus:outline-none bg-transparent"
              as={InputText}
              name={campo.nombreCampo}
              defaultValue={campo.valor}
              maxLength={campo.longitud}
              keyfilter={RegExp(`[0-9${campo.restriccion.replace('[','').replace(']','')}]`)}
            />
            <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
              <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
            </span>
          </span>
        )}

        {campo.tipoCampo === "CORREO" && (
          <span className='p-float-label relative'>
            <Field
              className="w-full appearance-none focus:outline-none bg-transparent"
              as={InputText}
              name={campo.nombreCampo}
              defaultValue={campo.valor}
              maxLength={campo.longitud}
              keyfilter={RegExp(`[A-Za-z1-9@\\-_.${campo.restriccion.replace('[','').replace(']','')}]`)}
            />
            <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
              <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
            </span>
          </span>
        )}

        {campo.tipoCampo === "CODIGO" && (
          <span className='p-float-label relative'>
            <Field
              className="w-full appearance-none focus:outline-none bg-transparent"
              as={InputText}
              name={campo.nombreCampo}
              defaultValue={campo.valor}
              maxLength={campo.longitud}
              keyfilter={RegExp(`[0-9A-Za-z${campo.restriccion.replace('[','').replace(']','')}]`)}
            />
            <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
              <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
            </span>
          </span>
        )}

        {campo.tipoCampo === 'CATALOGO' && (
          <span className='p-float-label relative'>
          {/* {console.log(dataProyectoSeleccionado)} */}
            <Field
              className="w-full appearance-none focus:outline-none bg-transparent"
              as={Dropdown}
              name={campo.nombreCampo}
              value={selectedValueCatalogo}
              options={dataProyectoSeleccionado?.catalogos[campo?.nombreCampo]?.catalogo.map(option => ({
                label: option,
                value: option
              }))}
              filter
              emptyFilterMessage='No se encontraron conincidencias'
              placeholder="Seleccione una opción"
              onChange={(e) => {
                setSelectedValueCatalogo(e.value);
                setFieldValue(campo.nombreCampo, e.value);
              }}
              maxLength={campo.longitud}
            />
            <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
              <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
            </span>
          </span>
        )}

        {campo.tipoCampo === 'CATALOGO-INPUT' && (
          <span className='p-float-label relative'>
            <Field
              className="w-full appearance-none focus:outline-none bg-transparent"
              as={Dropdown}
              name={campo.nombreCampo}
              value={defaultOption}
              options={currentCatalogo.map(option => ({
                label: option,
                value: option
              }))} 
              filter
              emptyFilterMessage='No se encontraron conincidencias'
              placeholder="Seleccione una opción"
              onChange={(e) => {
                setSelectedValueCatalogoInput(e.value);
                setFieldValue(campo.nombreCampo, e.value);
              }}
              maxLength={campo.longitud} 
            />
            <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
              <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
            </span>
          </span>
        )}

        {campo.tipoCampo === 'CHECKBOX' && (
          <span className='p-float-label relative'>
            <Field name={campo.nombreCampo}>
              {({ field, form }) => (
                <Checkbox
                className="w-full appearance-none focus:outline-none bg-transparent"
                checked={field.value === 'true'}
                onChange={(e) => {
                  const stringValue = e.target.checked ? 'true' : 'false';
                  form.setFieldValue(field.name, stringValue);
                }}
              />
              )}
            </Field>
          </span>
        )}

        {campo.tipoCampo === 'FOTO' && (
          <span className='p-float-label relative'>
           {/*  <span className="bg-[#4CAF50] border border-gray-300 p-2 rounded-md">
              <i className="pi pi-check-square text-white font-bold text-2xl"></i>
            </span> */}
            <Field
              className="w-full appearance-none focus:outline-none bg-transparent ml-1 mr-1"
              as={InputText}
              name={campo.nombreCampo}
              defaultValue={campo.valor}
              maxLength={campo.longitud}
              keyfilter={RegExp(`[0-9A-Za-z ${campo.restriccion.replace('[','').replace(']','')}]`)}
              // onChange={''} 
            />   
            

<div className="flex">

   
  <span
    className="hover:bg-[#245A95] hover:text-white cursor-pointer border border-[#245A95] p-2 rounded-md mr-2 ml-2"
    onClick={handleClick}
  >
    <i className="pi pi-camera font-bold text-2xl"></i>
  </span>

  <input
    type="file"
    ref={inputFileRef}
    style={{ display: 'none'}}
    onChange={(event) => handleFileChange(event, campo, dataProyectoSeleccionado.listaAgrupaciones[0].idInventario)}
  />

  <span className="hover:bg-[#245A95] hover:text-[#245A95] cursor-pointer border border-[#fff] p-2 rounded-md ml-2 text-white hover:border-[#245A95]"
  style={{background: booleanPhoto,
  }} 
    onClick={() => {
      setModalAbrirFoto(true);
    }}
  >
    <i className="pi pi-image font-bold text-2xl"></i>
  </span>
</div>

          </span>
        )}
          {/* <div className='grid grid-cols-2'> */}
         {campo.tipoCampo === 'FIRMA' && (          
            <div className='grid h-30 '>
            <div>
              <img
                className='h-30 w-35 bg-white p-2 cursor-pointer rounded-md shadow-md'
                src={imageURL}
                alt='Firma'
                onClick={()=>{
                  setModalAbrirFirma(true);
                }}
              />
            </div>
            <div className='m-auto mt-3'>
             
              <button
                type="button"
                className="m-auto h-10 px-4 py-1 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95]"
                onClick={()=>{
                  setModalFirmaAbrirCerrar(true);
                }}
              >
                <ion-icon name="create"></ion-icon> Firmar
              </button>
              <span className=" border border-gray-300 p-2 rounded-md mr-1"
              style={{background: booleanSignature,
              }} >
                <i className="pi pi-check-square text-white text-2xl"></i>
              </span>
            </div>
            
          </div>
      

        )} 

        {campo.tipoCampo === 'CHECKBOX-EVIDENCIA' && (
          <div>
            <button 
            type='button'
              className="m-auto h-10 px-4 py-1 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-full shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95]"
              onClick={()=>{
                handlebtnEvidencias(campo);
              }}
            >
              <ion-icon name="images"></ion-icon> Subir evidencia
            </button>
          </div>
        )}
    
      </div>

  {/* MODAL GENERAR FIRMA */}
  <Dialog header={campo.nombreCampo} visible={modalFirmaAbrirCerrar} style={{ width: '40vw', backgroundColor: "blue" }} onHide={() => setModalFirmaAbrirCerrar(false)} className="bg-[#245A95]">
      <SignatureCanvas 
        ref={sigCanvas}
        canvasProps={{
          className: "signatureCanvas"}}
      />
      <button 
        className="m-auto h-10 px-4 py-1 mt-2 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-full shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95]"
        onClick={() => {
          limpiar();
        }}
      >
        <ion-icon name="trash"></ion-icon> Limpiar
      </button>
      
        <button
        type='button'
          className="m-auto h-10 px-4 py-1 mt-2 ml-2 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-full shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95]"
          onClick={() =>guardar(campo, dataProyectoSeleccionado.listaAgrupaciones[0].idInventario)}
        >
          <ion-icon name="checkmark"></ion-icon> Aceptar
        </button>
    </Dialog>
    {/* MODAL ABRIR IMAGEN */}
    <Dialog header='FIRMA' visible={modalAbrirFirma} style={{ width: '40vw' }} onHide={() => setModalAbrirFirma(false)}>
    <img
        className='h-50 w-55 bg-white p-2'
        src={imageURL}
        alt='Firma'
      />
    </Dialog>

    {/* MODAL ABRIR IMAGEN */}
    <Dialog header='FOTO' visible={modalAbrirFoto} style={{ width: '40vw' }} onHide={() => setModalAbrirFoto(false)}>
    <div className=''>
    <img
        className='bg-white p-2 m-auto'
        src={photoURL}
        alt='Foto'
        style={{ width: '50%' }}
      />
      </div>
    </Dialog>

    <Dialog header='Evidencia' visible={modalEvidencia} style={{ width: '70vw', height:'40vw' }} onHide={() => setModalEvidencia(false)}>
    <span className='p-float-label relative'>
      <Toast ref={toast}></Toast>

      <div
      id='drop-area'
      onDragOver={(e)=> handleDragOver(e)}
      onDragLeave={()=>handleDragLeave()}
      onDrop={(e)=>handleDrop(e)}
      ref={dropAreaRef}
      style={{display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px dashed #ccc',
      padding: '20px',
      textAlign: 'center',
   }}
      >
        <h3>Arrastra y suelta tus archivos aquí</h3>
        <p>o</p>
        <input type='file' name='files' accept='image/*,application/pdf' onChange={(e)=> subirArchivos(e.target.files)} className="block text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100" />
      </div>

    
     
  <div>
  <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
  <button
    type="button"
    onClick={() => insertarArchivos()}
    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
  >
    Subir Evidencia
  </button>
  <button
    type="button"
    onClick={() => {
      borrarEvidencia();
    }}
    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
  >
    Borrar Evidencia
  </button>
</div>
  
    <h4>Archivos Seleccionados:</h4>

  <div className="flex align-items-center flex-wrap" style={{ position: 'relative', display: 'flex', flexWrap: 'wrap'}}>
    {archivosSeleccionados.map((archivo, index) => (
      <div key={index} className="image-container" style={{ position: 'relative', width: 'calc(33.33% - 10px)', margin: '5px', boxSizing: 'border-box' }}>
        <small  style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1, backgroundColor: '#010a1c', width: '100%', height:'55px', paddingRight: 12, color: "white"}}>{archivo.name}</small>
        <button
          type="button"
          className="p-button p-button-danger p-button-text"
          style={{ position: 'absolute', bottom: 2, right: 20, zIndex: 1, backgroundColor: '#fa7878', borderRadius: "50%", width: '35px', height:'35px', paddingLeft: 9, color: "white"}}
          onClick={() => handleRemoveArchivo(index)}
        >
          <i className="pi pi-trash" />
        </button>
        <button
          type="button"
          className="p-button p-button-info p-button-text"
          style={{ position: 'absolute', bottom: 2, right: 60, zIndex: 1, backgroundColor: '#7eb9f7', borderRadius: "50%", width: '35px', height:'35px', paddingLeft: 9, color: "white"}}
          onClick={() => handleDescargarArchivo(archivo)}
        >
          <i className="pi pi-download" />
        </button>
      
        {archivo.type.startsWith('image/') && (
          <img alt={archivo.name} role="presentation" src={URL.createObjectURL(archivo)} style={{ width: '100%', height: '200px', zIndex: 0 }} />
        )}
        {archivo.type === 'application/pdf' && (
          <div style={{width: "100%", height: "200px"}}>
              <iframe
                  title={archivo.name}
                  src={URL.createObjectURL(archivo)}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                />
          </div>
        )}
      </div>
    ))}
  </div>
</div>

     
     
      
    </span>
    </Dialog>
    </>
  
  )
}


