import { Field, useFormikContext } from 'formik'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';       
import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas'

import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';

import '../../styles/sigCanvas.css'
import { format } from 'date-fns';


export const ComponentTipoCampo = ({campo, dataProyectoSeleccionado, values, indexAgrupacion, indexCampo, itemagrupacion}) => {

  const { setFieldValue } = useFormikContext();

   // State del Calendar
   const [selectedDate, setSelectedDate] = useState(new Date(campo.valor));
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
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);

  const [hora, setHora] = useState(parseHora(campo.valor));

  function parseHora(horaString) {
    const [hora, minutos] = horaString.split(':');
    const fechaActual = new Date();
    fechaActual.setHours(hora);
    fechaActual.setMinutes(minutos);
    return fechaActual;
  }

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
        _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;
    e.files.forEach((file) => {
        _totalSize += file.size || 0;
    });
    setTotalSize(_totalSize);
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

  const itemTemplate = (file, props) => {
    return (
        <div className="flex align-items-center flex-wrap">
            <div className="flex align-items-center" style={{ width: '40%' }}>
                <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                <span className="flex flex-column text-left ml-4">
                    {file.name}
                    <small className='ml-4'>{new Date().toLocaleDateString()}</small>
                </span>
            </div>
            <Tag value={props.formatSize} severity="warning" className="px-3 py-2 ml-6" />
            <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
        </div>
    );
  };

  const emptyTemplate = () => {
    return (
        <div className="flex align-items-center flex-column">
            <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
            <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                Drag and Drop Image Here
            </span>
        </div>
    );
  };

  const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
  const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

  const [inputValue, setInputValue] = useState(campo.valor);


  return (
    <>
      <div className="p-inputgroup">
        
        {campo.tipoCampo === 'CALENDARIO' && (
          <span className='p-float-label relative'>
            <Field name={campo.nombreCampo}>
              {({ field, form }) => (
                <Calendar
                  className="w-full appearance-none focus:outline-none bg-transparent"
                  value={selectedDate}
                  dateFormat="dd/mm/yy"
                  onChange={(e) => {
                    const formattedDate = format(e.value, 'dd/MM/yy');
                    setSelectedDate(e.value); // Actualiza la variable de estado con la fecha seleccionada
                    form.setFieldValue(field.name, formattedDate);
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
            <Field
              className="w-full appearance-none focus:outline-none bg-transparent"
              as={Dropdown}
              name={campo.nombreCampo}
              value={selectedValueCatalogo}
              options={dataProyectoSeleccionado?.catalogos[campo?.nombreCampo].catalogo.map(option => ({
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
              value={selectedValueCatalogoInput}
              options={dataProyectoSeleccionado?.catalogos[campo?.nombreCampo].catalogo.map(option => ({
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

        {/* {campo.tipoCampo === 'CHECKBOX-EVIDENCIA' && (
          <div>
            <button 
              className="m-auto h-10 px-4 py-1 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-full shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95]"
              onClick={()=>{
                setModalEvidencia(true)
              }}
            >
              <ion-icon name="images"></ion-icon> Subir evidencia
            </button>
          </div>
        )} */}
    
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
    <Dialog header='Evidencia' visible={modalEvidencia} style={{ width: '50vw' }} onHide={() => setModalEvidencia(false)}>
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


