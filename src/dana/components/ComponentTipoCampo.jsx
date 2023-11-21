import { Field, useFormikContext } from 'formik'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';       
import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas'

import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';

import '../../styles/sigCanvas.css'
import {parse, format, isValid, parseISO } from 'date-fns';


export const ComponentTipoCampo = ({campo, dataProyectoSeleccionado, values, indexAgrupacion, indexCampo, itemagrupacion}) => {

  const { setFieldValue } = useFormikContext();

  const [selectedDate, setSelectedDate] = useState(campo.valor);

  const [filesArray, setFilesArray] = useState([]);


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
  const [modalFirmaAbrirCerrar, setModalFirmaAbrirCerrar] = useState(false);
  const [modalEvidencia, setModalEvidencia] = useState(false) 
  const sigCanvas = useRef({})
  const limpiar = () => sigCanvas.current.clear()
  const guardar = () => setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"))

  const toast = useRef(null);
  
  const fileUploadRef = useRef(null);

  // const [hora, setHora] = useState(parseHora(campo.valor));

  const [hora, setHora] = useState(() => {
    const parsedHora = parseHora(campo.valor);

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
  //////////////////////////////////////////////////
  ///// Funciones y estados para el FileUpload/////
  ////////////////////////////////////////////////

  const [totalSize, setTotalSize] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
        _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = async (e) => {
    let _totalSize = 0;

    const uploadPromises = e.files.map((file) => {
        return new Promise((resolve) => {
            const formData = new FormData();
            formData.append("file", file);

            // Reemplaza "/api/upload" con la URL de tu API de carga de imágenes
            fetch("/api/upload", {
                method: "POST",
                body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                // Suponemos que la API devuelve la URL de la imagen en la propiedad "imageUrl"
                file.imageUrl = data.imageUrl;
                _totalSize += file.size || 0;
                resolve();
            });
        });
    });

    await Promise.all(uploadPromises);

    setTotalSize(_totalSize);
    setUploadedFiles([...e.files]);
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
};


  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

    return (
        <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
            {chooseButton}
            {uploadButton}
            {cancelButton}
            <div className="flex align-items-center gap-3 ml-auto">
                <span>{formatedValue} / 1 MB</span>
                <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
            </div>
        </div>
    );
  };

/*   const itemTemplate = (file, props) => {
    const isImage = file.type.startsWith('image');
    const isPDF = file.type === 'application/pdf';

    return (
        <div className="flex align-items-center flex-wrap">
          
          {isImage ? (<div className="flex align-items-center" style={{ width: '65%' }}>
                {URL.createObjectURL(file) && <img alt={file.name} role="presentation" src={URL.createObjectURL(file)} style={{width: '300px', height: '200px'}}/>}
                
                <span className="d-flex flex-colum text-left ml-3">
                    <small className='mr-2'>{file.name}</small>
                    <br></br>
                    <small>{new Date().toLocaleDateString()}</small>
                </span>
            </div>) : isPDF ? (
              <div className="flex align-items-center" style={{ width: '65%' }}>
              <i className="pi pi-file-pdf p-mr-1" style={{ fontSize: '7rem', color: '#ff0000' }} />
              <span className="d-flex flex-colum text-left ml-3">
                  <small className='mr-2'>{file.name}</small>
                  <br></br>
                  <small>{new Date().toLocaleDateString()}</small>
              </span>
          </div>
          
        ) : (
          <></>
        )}
            
            <Tag value={props.formatSize} severity="warning" className="px-3 py-2 h-10 m-auto" />
            <button
                type="button"
                icon="pi pi-times"
                className="p-button p-button-danger p-button-text"
                onClick={() => onTemplateRemove(file, props.onRemove)}
            >
            <i className="pi pi-trash" />
            </button>
        </div>
    );
}; */

const itemTemplate = (file, props) => {
  const isImage = file.type.startsWith('image');
  const isPDF = file.type === 'application/pdf';

  return (
    <div className="flex align-items-center flex-wrap" style={{ position: 'relative'}}>
      {isImage ? (
        <div className="image-container" style={{ position: 'relative', width: "300px", backgroundColor: "green", margin: "auto"}}>
         
          <small  style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1, backgroundColor: '#010a1c', width: '300px', height:'55px', paddingRight: 12, color: "white"}}>{file.name}</small>
          <button
            type="button"
            icon="pi pi-times"
            className="p-button p-button-danger p-button-text"
            style={{ position: 'absolute', bottom: 2, right: 20, zIndex: 1, backgroundColor: '#fa7878', borderRadius: "50%", width: '35px', height:'35px', paddingLeft: 9, color: "white"}}
            onClick={() => onTemplateRemove(file, props.onRemove)}
          >
            <i className="pi pi-trash" />
          </button>
          <button
            type="button"
            icon="pi pi-download"
            className="p-button p-button-info p-button-text"
            style={{ position: 'absolute', bottom: 2, right: 60, zIndex: 1, backgroundColor: '#7eb9f7', borderRadius: "50%", width: '35px', height:'35px', paddingLeft: 9, color: "white"}}
            
          >
            <i className="pi pi-download" />
          </button>
          <Tag value={props.formatSize} severity="warning" className="px-3 py-2 h-7 m-auto" style={{ position: 'absolute', bottom: 5, left: 10, zIndex: 1, }} />
          {URL.createObjectURL(file) && (
            <img alt={file.name} role="presentation" src={URL.createObjectURL(file)} style={{ width: '300px', height: '200px', zIndex: 0 }} />
          )}
        </div>
      ) : isPDF ? (
        <div className="image-container" style={{ position: 'relative', width: "300px", margin: "auto"}}>
         
          <small  style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1, backgroundColor: '#010a1c', width: '300px', height:'55px', paddingRight: 12, color: "white"}}>{file.name}</small>
          <button
            type="button"
            icon="pi pi-times"
            className="p-button p-button-danger p-button-text"
            style={{ position: 'absolute', bottom: 2, right: 20, zIndex: 1, backgroundColor: '#fa7878', borderRadius: "50%", width: '35px', height:'35px', paddingLeft: 9, color: "white"}}
            onClick={() => onTemplateRemove(file, props.onRemove)}
          >
            <i className="pi pi-trash" />
          </button>
          <button
            type="button"
            icon="pi pi-download"
            className="p-button p-button-info p-button-text"
            style={{ position: 'absolute', bottom: 2, right: 60, zIndex: 1, backgroundColor: '#7eb9f7', borderRadius: "50%", width: '35px', height:'35px', paddingLeft: 9, color: "white"}}
            
          >
            <i className="pi pi-download" />
          </button>
          <Tag value={props.formatSize} severity="warning" className="px-3 py-2 h-7 m-auto" style={{ position: 'absolute', bottom: 5, left: 10, zIndex: 1, }} />
          <div style={{width: "300px", height: "200px"}}>
          <i className="pi pi-file-pdf p-mr-1" style={{ fontSize: '7rem', color: '#ff0000', zIndex: 0, textAlign: "center"}} />
          </div>
          
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};





/* const itemTemplate = (file) => {
  const isImage = file.type.startsWith('image');
  const isPDF = file.type === 'application/pdf';

  return (
    <div className="p-d-flex p-ai-center p-flex-wrap">
      <div className="p-mr-2">
        {isImage ? (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            style={{ maxWidth: '500px', maxHeight: '500px', marginRight: '5px' }}
          />
        ) : isPDF ? (
          <i className="pi pi-file-pdf p-mr-1" style={{ fontSize: '2rem', color: '#ff0000' }} />
        ) : (
          <i className="pi pi-file p-mr-1" style={{ fontSize: '2rem' }} />
        )}
      </div>
      <div>
        <div>{file.name}</div>
        <small>{file.size} bytes</small>
      </div>
      <div>
      <button className="p-button p-button-danger p-button-text">
          <i className="pi pi-trash" />
      </button>
      </div>
    </div>
  );
};
 */


  const emptyTemplate = () => {
    return (
        <div className="flex align-items-center flex-column">
            <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
            <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                Arrastra la o las imagenes aqui
            </span>
        </div>
    );
  };

  const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
  const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

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

  const handlebtnEvidencias = async () => {
    setModalEvidencia(true);
    var cont = 0;
    // Array para almacenar objetos File
    const filesArray = [];
  
    // Función para descargar un archivo desde la URL y convertirlo en un objeto File
    const downloadAndCreateFile = async (url) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const filename = url.substring(url.lastIndexOf('/') + 1);
        const file = new File([blob], filename);
        filesArray.push(file);
      } catch (error) {
        console.error(`Error al descargar el archivo desde ${url}:`, error);
      }
    };
  
    // Iterar sobre las URLs y descargar los archivos
    await Promise.all(
      dataProyectoSeleccionado.respuestaCheckboxEvidencia.map((evidence) =>
        {downloadAndCreateFile(evidence.url);
        cont++;}
      )
    );
  
    // Ahora filesArray contiene objetos File descargados desde las URLs
    console.log(filesArray);
    setFilesArray(filesArray);
    
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
            {console.log(dataProyectoSeleccionado)}
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
            <span className="bg-[#4CAF50] border border-gray-300 p-2 rounded-md">
              <i className="pi pi-check-square text-white font-bold text-2xl"></i>
            </span>
            <Field
              className="w-full appearance-none focus:outline-none bg-transparent"
              as={InputText}
              name={campo.nombreCampo}
              defaultValue={campo.valor}
              maxLength={campo.longitud}
              keyfilter={RegExp(`[0-9A-Za-z ${campo.restriccion.replace('[','').replace(']','')}]`)}
              // onChange={''} 
            />
            <span className="hover:bg-[#245A95] hover:text-white cursor-pointer border border-[#245A95] p-2 rounded-md">
              <i className="pi pi-camera font-bold text-2xl"></i>
            </span>
            <span className="hover:bg-[#245A95] hover:text-white cursor-pointer border border-[#245A95] p-2 rounded-md">
              <i className="pi pi-image font-bold text-2xl"></i>
            </span>
          </span>
        )}

        {/* {campo.tipoCampo === 'FIRMA' && (
          <div className='grid grid-cols-2'>
            <div>
              <span className="bg-[#4CAF50] border border-gray-300 p-2 rounded-md mr-1">
                <i className="pi pi-check-square text-white text-2xl"></i>
              </span>
              <button
                type="submit"
                className="m-auto h-10 px-4 py-1 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95]"
                onClick={()=>{
                  setModalFirmaAbrirCerrar(true);
                }}
              >
                <ion-icon name="create"></ion-icon> Firmar
              </button>
            </div>
            <div>
              <img
                className='h-30 w-35 bg-white p-2 cursor-pointer'
                src={imageURL}
                alt='Firma'
                onClick={()=>{
                  setModalAbrirFirma(true);
                }}
              />
            </div>
          </div>
        )} */}

        {campo.tipoCampo === 'CHECKBOX-EVIDENCIA' && (
          <div>
            <button 
            type='button'
              className="m-auto h-10 px-4 py-1 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-full shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95]"
              onClick={()=>{
                handlebtnEvidencias();
              }}
            >
              <ion-icon name="images"></ion-icon> Subir evidencia
            </button>
          </div>
        )}
    
      </div>

  {/* MODAL GENERAR FIRMA */}
  <Dialog header='' visible={modalFirmaAbrirCerrar} style={{ width: '50vw' }} onHide={() => setModalFirmaAbrirCerrar(false)}>
      <SignatureCanvas 
        ref={sigCanvas}
        canvasProps={{
          className: "signatureCanvas"}}
      />
      <button 
        className="m-auto h-10 px-4 py-1 mt-2 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-full shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95]"
        onClick={() => {
          setModalFirmaAbrirCerrar(false);
          limpiar();
        }}
      >
        <ion-icon name="trash"></ion-icon> Limpiar
      </button>
      
        <button 
          className="m-auto h-10 px-4 py-1 mt-2 ml-2 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-full shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95]"
          onClick={guardar}
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

    {/* MODAL SUBIR EVIDENCIA */}
    <Dialog header='Evidencia' visible={modalEvidencia} style={{ width: '40vw' }} onHide={() => setModalEvidencia(false)}>
    <span className='p-float-label relative'>
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
        onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
        headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
      />
      
    </span>
    </Dialog>
    </>
  
  )
}


