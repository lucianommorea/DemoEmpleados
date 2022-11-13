import React from 'react';
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './FormPerfilEmpleado.module.css';
import { putEmployeeInfo } from '../../redux/actions';
import Swal from 'sweetalert2';
const moment = require('moment');

function FormPerfilEmpleado({nombre, apellido, dni, email, fechaNacimiento, telefono, domicilio, ciudad, fechaAlta}) {

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
                ' ERROR ', `No se pudieron modificar los datos de ${input.nombre} ${input.apellido}. Corrige o completa los campos con errores`, 'error'
            )
            return
        }
        dispatch(putEmployeeInfo(employee.id, input));
        setEdit(!edit)
        Swal.fire(
            ' EMPLEADO MODIFICADO CON EXITO ', `Se han modificado los datos de ${input.nombre} ${input.apellido}`, 'success'
        )

    }

    function changeEdit(){
        setEdit(!edit)
    }
    

    return (
        <div className={style.all}>
            {
                edit ?
                <form className={style.form} onSubmit={handleSubmit}>
                    <div className={style.div1}>
                        <label className={style.label1}> Nombre: </label>
                        <input  type='text'
                                value={input.nombre || ""} 
                                name='nombre' 
                                autoComplete='off'
                                onChange={handleChange}
                                className={errors.nombre ? style.errorInput : style.input1} />      
                        {   
                            errors.nombre && (
                                <div className={style.error}>
                                    <span> {errors.nombre}</span>
                                </div>
                            )
                        }
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> Apellido: </label>
                        <input  type='text'
                                value={input.apellido || ""} 
                                name='apellido' 
                                autoComplete='off'
                                onChange={handleChange}
                                className={errors.apellido ? style.errorInput : style.input1} />

                        {   
                            errors.apellido && (
                                <div className={style.error}>
                                    <span> {errors.apellido}</span>
                                </div>
                            )
                        }
        
                    </div>
                    
                    <div className={style.div1}>
                        <label className={style.label1}> DNI: </label>
                        <input  type='number' 
                                value={input.dni || ""} 
                                name='dni' 
                                autoComplete='off'
                                min= '0'
                                step= '1'
                                onChange={handleChange}
                                className={errors.dni ? style.errorInput : style.input1}
                        />
                        {   
                            errors.dni && (
                                <div className={style.error}>
                                    <span> {errors.dni}</span>
                                </div>
                            )
                        }
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> Fecha de nacimiento: </label>
                        <input  type='date' 
                                value={input.fechaNacimiento || ""} 
                                name='fechaNacimiento' 
                                min="1930-01-01"
                                max="2023-12-12"
                                autoComplete='off'
                                onChange={handleChange}
                                className={errors.fechaNacimiento ? style.errorInputFecha : style.inputFecha}
                        />
                        {   
                            errors.fechaNacimiento && (
                                <div className={style.error}>
                                    <span> {errors.fechaNacimiento}</span>
                                </div>
                            )
                        }
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> Email: </label>
                        <input  type='text' 
                                value={input.email || ""} 
                                name='email' 
                                autoComplete='off'
                                onChange={handleChange}
                                className={errors.email ? style.errorInput : style.input1}
                        />
                        {   
                            errors.email && (
                                <div className={style.error}>
                                    <span> {errors.email}</span>
                                </div>
                            )
                        }
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> Telefono: </label>
                        <input  type='text' 
                                value={input.telefono || ""} 
                                name='telefono' 
                                autoComplete='off'
                                onChange={handleChange}
                                className={errors.telefono ? style.errorInput : style.input1}
                        />
                        {   
                            errors.telefono && (
                                <div className={style.error}>
                                    <span> {errors.telefono}</span>
                                </div>
                            )
                        }
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> Domicilio: </label>
                        <input  type='text' 
                                value={input.domicilio || ""} 
                                name='domicilio' 
                                autoComplete='off'
                                onChange={handleChange}
                                className={errors.domicilio ? style.errorInput : style.input1}
                        />
                        {   
                            errors.domicilio && (
                                <div className={style.error}>
                                    <span> {errors.domicilio}</span>
                                </div>
                            )
                        }
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> Ciudad: </label>
                        <input  type='text' 
                                value={input.ciudad || ""} 
                                name='ciudad' 
                                autoComplete='off'
                                onChange={handleChange}
                                className={errors.ciudad ? style.errorInput : style.input1}
                        />
                        {   
                            errors.ciudad && (
                                <div className={style.error}>
                                    <span> {errors.ciudad} </span>
                                </div>
                            )
                        }
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> Fecha Alta: </label>
                        <input  type='date' 
                                value={input.fechaAlta || ""} 
                                name='fechaAlta' 
                                min="2010-01-01"
                                max="2030-01-01"
                                autoComplete='off'
                                onChange={handleChange}
                                className={errors.fechaAlta ? style.errorInputFecha : style.inputFecha}
                        />
                        {   
                            errors.fechaAlta && (
                                <div className={style.error}>
                                    <span> {errors.fechaAlta}</span>
                                </div>
                            )
                        }
                    </div>
                    <div className={style.divBtn}>
                        <button className={style.btnConfirm}>
                                Confirmar Modificación
                        </button>    
                    </div>
 
                </form> :
                <div className={style.form}>
                    <div className={style.div1}>
                        <label className={style.label1}> Nombre: </label>
                        <div className={style.campo}> {nombre} </div>     
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> Apellido: </label>
                        <div className={style.campo}> {apellido} </div>     
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> DNI: </label>
                        <div className={style.campo}> {dni} </div>     
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> Fecha de nacimiento: </label>
                        <div className={style.campo}> {fechaNacimiento ? fechaNacimiento.slice(0,10) : null} </div>     
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> Email: </label>
                        <div className={style.campo}> {email} </div>     
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> Telefono: </label>
                        <div className={style.campo}> {telefono} </div>     
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> Domicilio: </label>
                        <div className={style.campo}> {domicilio} </div>     
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> Ciudad: </label>
                        <div className={style.campo}> {ciudad} </div>     
                    </div>

                    <div className={style.div1}>
                        <label className={style.label1}> Fecha Alta: </label>
                        <div className={style.campo}> {fechaAlta ? fechaAlta.slice(0,10) : null} </div>     
                    </div>
        
                    <div className={style.divBtn}>
                        <button className={style.btn} onClick={changeEdit}>
                                Modificar Empleado
                        </button>    
                    </div>

                </div>    
            }
                
        </div>
    )
}

export default FormPerfilEmpleado