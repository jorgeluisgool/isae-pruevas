import { Formik, Field, Form} from 'formik';
import { Dialog } from 'primereact/dialog';
import React from 'react'
import useAuth from '../../hooks/useAuth';

export const FormularioUsuarios = ({formularioState, setFormularioState}) => {

    const { userAuth: usuarioLogiado} = useAuth();

    const initialValues = {
           
    };

    const onSubmit = (values) => {

    }

  return (
    <>
        <Dialog header='DAR DE ALTA NUEVO USUARIO' visible={formularioState} baseZIndex={-1} style={{ width: '70vw', height: '40vw' }} onHide={() => setFormularioState(false)} className='pt-20'>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, handleChange }) => (
                <Form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        <div className='grid place-items-center'>
                        </div>
                    </div>
                </Form>
            )}
            </Formik>
        </Dialog>
    </>
  )
}
