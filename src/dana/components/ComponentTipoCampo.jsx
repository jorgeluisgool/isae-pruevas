import { Field } from 'formik'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { FileUpload } from 'primereact/fileupload';
        
import React from 'react'

export const ComponentTipoCampo = ({tipoCampo}) => {

  return (
  <div className="p-inputgroup">
    {tipoCampo === 'CALENDARIO' && (
    <span className='p-float-label relative'>
      <Field
        className="w-full appearance-none focus:outline-none bg-transparent"
        as={Calendar}
        name="proyecto"
      />
      <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
        <i className="pi pi-calendar-plus text-[#245A95] font-bold text-2xl"></i>
      </span>
    </span>
    )}
    {tipoCampo === 'HORA' && (
    <span className='p-float-label relative'>
      <Field
        className="w-full appearance-none focus:outline-none bg-transparent"
        as={Calendar}
        name="proyecto"
        timeOnly 
      />
      <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
        <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
      </span>
    </span>
    )}
    {tipoCampo === "ALFABETICO" && (
      <span className='p-float-label relative'>
        <Field
          className="w-full appearance-none focus:outline-none bg-transparent"
          as={InputText}
          name="proyecto"
        />
        <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
          <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
        </span>
      </span>
    )}
    {tipoCampo === "ALFANUMERICO" && (
      <span className='p-float-label relative'>
        <Field
          className="w-full appearance-none focus:outline-none bg-transparent"
          as={InputText}
          name="proyecto"
        />
        <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
          <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
        </span>
      </span>
    )}
    {tipoCampo === "NUMERICO" && (
      <span className='p-float-label relative'>
        <Field
          className="w-full appearance-none focus:outline-none bg-transparent"
          as={InputText}
          name="proyecto"
        />
        <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
          <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
        </span>
      </span>
    )}
    {tipoCampo === "CORREO" && (
      <span className='p-float-label relative'>
        <Field
          className="w-full appearance-none focus:outline-none bg-transparent"
          as={InputText}
          name="proyecto"
        />
        <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
          <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
        </span>
      </span>
    )}
    {tipoCampo === "CODIGO" && (
      <span className='p-float-label relative'>
        <Field
          className="w-full appearance-none focus:outline-none bg-transparent"
          as={InputText}
          name="proyecto"
        />
        <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
          <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
        </span>
      </span>
    )}
    {tipoCampo === 'CATALOGO' && (
    <span className='p-float-label relative'>
      <Field
        className="w-full appearance-none focus:outline-none bg-transparent"
        as={Dropdown}
        name="proyecto"
        timeOnly 
      />
      <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
        <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
      </span>
    </span>
    )}
    {tipoCampo === 'CATALOGO-INPUT' && (
    <span className='p-float-label relative'>
      <Field
        className="w-full appearance-none focus:outline-none bg-transparent"
        as={Dropdown}
        name="proyecto"
        timeOnly 
      />
      <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
        <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
      </span>
    </span>
    )}
    {tipoCampo === 'CHECKBOX' && (
    <span className='p-float-label relative'>
      <Field
        className="w-full appearance-none focus:outline-none bg-transparent"
        as={Checkbox}
        name="proyecto"
        checked={''} 
      />
    </span>
    )}
    {tipoCampo === 'FOTO' && (
    <span className='p-float-label relative'>
      <span className="bg-[#4CAF50] border border-gray-300 p-2 rounded-md">
        <i className="pi pi-check-square text-white font-bold text-2xl"></i>
      </span>
      <Field
        className="w-full appearance-none focus:outline-none bg-transparent"
        as={InputText}
        name="proyecto"
        checked={''} 
      />
      <span className="hover:bg-[#245A95] hover:text-white cursor-pointer border border-[#245A95] p-2 rounded-md">
        <i className="pi pi-camera font-bold text-2xl"></i>
      </span>
      <span className="hover:bg-[#245A95] hover:text-white cursor-pointer border border-[#245A95] p-2 rounded-md">
        <i className="pi pi-image font-bold text-2xl"></i>
      </span>
    </span>
    )}
    {tipoCampo === 'CHECKBOX-EVIDENCIA' && (
    <span className='p-float-label relative'>
      <span className="bg-[#4CAF50] border border-gray-300 p-2 rounded-md">
        <i className="pi pi-check-square text-white font-bold text-2xl"></i>
      </span>
      
      <Toast ref={''}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload ref={''} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
        onUpload={''} onSelect={''} onError={''} onClear={''}
        headerTemplate={''} itemTemplate={''} emptyTemplate={''}
        chooseOptions={''} uploadOptions={''} cancelOptions={''} 
      />

      <span className="hover:bg-[#245A95] hover:text-white cursor-pointer border border-[#245A95] p-2 rounded-md">
        <i className="pi pi-camera font-bold text-2xl"></i>
      </span>
      <span className="hover:bg-[#245A95] hover:text-white cursor-pointer border border-[#245A95] p-2 rounded-md">
        <i className="pi pi-image font-bold text-2xl"></i>
      </span>
    </span>
    )}
    
  </div>
  )
}
