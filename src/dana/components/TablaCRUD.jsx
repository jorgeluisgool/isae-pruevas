import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import {InputPassword} from "../components/TiposDeCampos";
import './stylosPrimeReact.css'

export const TablaCRUD = ({ listaDatos = [], headers = [], tipoDatos = '', editar = false, eliminar = false, seleccionMultiple = false}) => {

    const [globalFilter, setGlobalFilter] = useState(null);
    const [datoSeleccionado, setDatoSeleccionado] = useState()
    const [lista, setLista] = useState(listaDatos)
    const [deleteProjectDialog, setDeleteProyectDialog] = useState(false);
    const [proyecto, setProyecto] = useState();
    const [passwordConfirnacion, setPasswordConfirnacion] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);

    
    const confirmDeleteProduct = (proyecto) => {
        console.log(proyecto);
        setProyecto(proyecto);
        setDeleteProyectDialog(true);
    };
    
    const hideDeleteProjectDialog = () => {
        setPasswordConfirnacion('');
        setDeleteProyectDialog(false);
    }
    
    
    const handleAceptarEliminar = ()=>{
        if (passwordConfirnacion === '') {
            console.log('Contraseña vacia');
            setErrorPassword(true);
        }else if (passwordConfirnacion === 'eliminarproyecto170313'){
            console.log('Contraseña correcta');
            const newLista = lista.filter((item) => item.idproyecto !== proyecto.idproyecto);
            setLista(newLista);
            hideDeleteProjectDialog();
            
        }
    }
    
    const onSelection = (event) => {
        console.log(event.value);
        setDatoSeleccionado(event.value);
    }
    
    const onChangePass = (event)=>{
        setPasswordConfirnacion(event.target.value);
        if(passwordConfirnacion != ''){
            setErrorPassword(false);
        }
    }
    
    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Lista de {tipoDatos}</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    const actionBodyTemplate = (rowData) => {
        return (
            <>
            {editar &&
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={()=>{}} />}
            {eliminar &&     
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={()=>{confirmDeleteProduct(rowData)}} />}
            </>
        );
    }
    const deleteProjectDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProjectDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={handleAceptarEliminar} />
        </>
    );

    return (
        <Card className="m-8 ">
            <div className="datatable-crud-demo">
                {/* <Toast ref={toast} /> */}

                {/* <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

                <DataTable value={lista} selection={datoSeleccionado} onSelectionChange={onSelection}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} y {last} de {totalRecords} registros"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    {seleccionMultiple &&  <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>}
                    {headers.map((head, index) => (
                        <Column key={index} field={head} header={head} sortable style={{ minWidth: '5rem' }}></Column>
                    ))}
                    {(editar || eliminar) && <Column header='Opciones' body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>}
                </DataTable>
            </div>

            <Dialog visible={deleteProjectDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProjectDialogFooter} onHide={hideDeleteProjectDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {proyecto && <span>¿Estas seguro de eliminar el proyecto <b>{proyecto.proyecto}</b>?, toda la informacion que contenga sera eliminada permanentemente (Registros, Evidencias, Fotografias, Documentos generados (PDF))</span>}
                <br/>
                <br/>
                <i>Ingresa la contraseña para poder eliminar el proyecto</i>
                <br/>
                <br/>
                <InputPassword valor={passwordConfirnacion} onChangevalor={onChangePass} onError={errorPassword}/>
                </div>
            </Dialog>

        </Card>
    )
}