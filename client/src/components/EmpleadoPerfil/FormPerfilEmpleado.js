import React from 'react';
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './FormPerfilEmpleado.module.css';
import { putEmployeeActivity, putEmployeeInfo } from '../../redux/actions';
import Swal from 'sweetalert2';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import EmpleadoPerfil from './EmpleadoPerfil';
import EmpleadoModificacion from './EmpleadoModificacion';
const moment = require('moment');


function FormPerfilEmpleado({nombre, apellido, dni, email, fechaNacimiento, telefono, domicilio, ciudad, fechaAlta, fechaBaja}) {

    const dispatch = useDispatch();
    const employee = useSelector(state => state.employee);
    let [errors, setErrors] = useState({});
    let dateNow = new Date();
    let [input, setInput] = useState({
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        email: email,
        fechaNacimiento: fechaNacimiento,
        telefono: telefono,
        domicilio: domicilio,
        ciudad: ciudad,
        fechaAlta: fechaAlta,
    })
    let [edit, setEdit] = useState(false)

    useEffect(()=> {
        setInput({
            nombre: employee.nombre,
            apellido: employee.apellido,
            dni: employee.dni,
            email: employee.email,
            fechaNacimiento: employee ? employee?.fechaNacimiento?.slice(0,10) : null,
            telefono: employee.telefono,
            domicilio: employee.domicilio,
            ciudad: employee.ciudad,
            fechaAlta: employee ? employee?.fechaAlta?.slice(0,10) : null,
        })
    // eslint-disable-next-line
    }, [edit])

    function validate(input){
        let errors = {}
        if(input.nombre.length > 30) errors.nombre = 'Máximo 30 caracteres'
        if(input.nombre && !/^[A-Za-z\s]+$/.test(input.nombre)) errors.nombre = 'Solo letras y espacios'
        if(input.apellido.length > 40) errors.apellido = 'Máximo 40 caracteres'
        if(input.apellido && !/^[A-Za-z\s]+$/.test(input.apellido)) errors.apellido = 'Solo letras y espacios'
        if(parseInt(input.dni) < 0) errors.dni = 'DNI no puede ser menor a 0'
        if(parseInt(input.dni) > 100000000) errors.dni = 'DNI no puede ser mayor a 100.000.000'
        if(input.email.length > 50) errors.email = 'Máximo 50 caracteres'
        let inputFechaNac = moment(input.fechaNacimiento, "YYYY-MM-DD HH:mm:ss");
        if(inputFechaNac > dateNow) errors.fechaNacimiento = "Fecha mayor a la actual"
        if(input.telefono.length > 20) errors.telefono = 'Máximo 20 caracteres'
        if(input.domicilio.length > 50) errors.domicilio = 'Máximo 50 caracteres'
        if(input.ciudad.length > 30) errors.ciudad = 'Máximo 30 caracteres'
        let inputFechaAlta = moment(input.fechaAlta, "YYYY-MM-DD HH:mm:ss");
        if(inputFechaAlta > dateNow) errors.fechaAlta = "Fecha mayor a la actual"
        
       return errors
    }

    function validate2(input){
        let errors = {}
        if(!input.nombre) errors.nombre = ' '
        if(!input.apellido) errors.apellido = ' '
        if(!input.dni) errors.dni = ' '
        if(!input.email) errors.email = ' '
        if(!input.fechaNacimiento) errors.fechaNacimiento = ' '
        if(!input.telefono) errors.telefono = ' '
        if(!input.domicilio) errors.domicilio = ' '
        if(!input.ciudad) errors.ciudad = ' '
        if(!input.fechaAlta) errors.fechaAlta = ' '
        
       return errors
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!input.nombre || !input.apellido || !input.dni || !input.email || !input.fechaNacimiento || !input.telefono || !input.domicilio || !input.ciudad || !input.fechaAlta) setErrors(validate2({
            nombre: input.nombre,
            apellido: input.apellido,
            dni: input.dni,
            email: input.email,
            fechaNacimiento: input.fechaNacimiento,
            telefono: input.telefono,
            domicilio: input.domicilio,
            ciudad: input.ciudad,
            fechaAlta: input.fechaAlta
        }))
        if( errors.nombre || errors.apellido || errors.dni || errors.email || errors.fechaNacimiento || errors.telefono || errors.domicilio || 
            errors.ciudad || errors.fechaAlta || !input.nombre || !input.apellido || !input.dni || !input.email || !input.fechaNacimiento || 
            !input.telefono || !input.domicilio || !input.ciudad || !input.fechaAlta){
            Swal.fire(
                ' ERROR ', `No se pudieron modificar los datos de ${input.nombre} ${input.apellido}. Corrige o completa los campos con errores.`, 'error'
            )
            return
        }
        dispatch(putEmployeeInfo(employee.id, input));
        setEdit(!edit)
        Swal.fire(
            ' EMPLEADO MODIFICADO CON EXITO ', `Se han modificado los datos de ${input.nombre} ${input.apellido}.`, 'success'
        )

    }

    function changeEdit(){
        setEdit(!edit)
    }

    const bajaAltaEmpleado = (e) => {
        e.preventDefault();
        if(employee.situacionLaboral === 'ACTIVO') {
            if(employee.estado === "IN") {
              Swal.fire(
                ' ERROR ', `${input.nombre} ${input.apellido} está en la Empresa. Registra un Egreso primero.`, 'error'
              )
            }
            else{
              let modify = { situacionLaboral: "INACTIVO", fechaBaja: dateNow  };
              dispatch(putEmployeeActivity(employee.id, modify))              
            }
        }
        else if(employee.situacionLaboral === 'INACTIVO'){
            let modify2 = { situacionLaboral: "ACTIVO", fechaBaja: null };
            dispatch(putEmployeeActivity(employee.id, modify2))
        }
      };
    
      const confirmChange = (e) => {
        confirmAlert({
          title: `Dar de Baja a ${employee.nombre} ${employee.apellido}`,
          message: "¿Está seguro?",
          buttons: [
            {
              label: "Sí",
              onClick: () => bajaAltaEmpleado(e),
            },
            {
              label: "No",
            },
          ],
        });
      };

      const confirmChange2 = (e) => {
        confirmAlert({
          title: `Dar de alta a ${employee.nombre} ${employee.apellido}`,
          message: "¿Está seguro?",
          buttons: [
            {
              label: "Sí",
              onClick: () => bajaAltaEmpleado(e),
            },
            {
              label: "No",
            },
          ],
        });
      };
    

    return (
        <div className={style.all}>
            {
                edit 
                ? <EmpleadoModificacion input={input} errors={errors} handleChange={handleChange} handleSubmit={handleSubmit} changeEdit={changeEdit} />
                : <EmpleadoPerfil  nombre={nombre} apellido={apellido} dni={dni} fechaNacimiento={fechaNacimiento} email={email} telefono={telefono} 
                                    domicilio={domicilio} ciudad={ciudad} fechaAlta={fechaAlta}fechaBaja={fechaBaja} changeEdit={changeEdit}
                                    confirmChange={confirmChange} confirmChange2={confirmChange2} />
            }
                
        </div>
    )
}

export default FormPerfilEmpleado