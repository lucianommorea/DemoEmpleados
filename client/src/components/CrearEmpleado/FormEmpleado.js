import React from 'react';
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './FormEmpleado.module.css';
import { getAllEmployees, postEmployee } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const moment = require('moment');

function FormEmpleado() {

    const dispatch = useDispatch();
    const employees = useSelector(state => state.employees)
    const navigate = useNavigate();
    let [errors, setErrors] = useState({});
    let dateNow = new Date();
    const[input, setInput] = useState({
        nombre: '',
        apellido: '',
        dni: null,
        email: '',
        fechaNacimiento: null,
        telefono: '',
        domicilio: '',
        ciudad: '',
        fechaAlta: null
    })

    useEffect(()=> {
        dispatch(getAllEmployees())
    }, [dispatch])


    function validate(input){
        let errors = {}
        if(input.nombre.length > 30) errors.nombre = 'Máximo 30 caracteres'
        if(input.nombre && !/^[A-Za-z\s]+$/.test(input.nombre)) errors.nombre = 'Solo letras y espacios'
        if(input.apellido.length > 40) errors.apellido = 'Máximo 40 caracteres'
        if(input.apellido && !/^[A-Za-z\s]+$/.test(input.apellido)) errors.apellido = 'Solo letras y espacios'
        let dniExiste = employees.find(e=> e.dni === parseInt(input.dni));
        if(dniExiste) errors.dni = 'DNI ya registrado'
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


    async function handleSubmit(e){
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
                ' ERROR ', `No pudo darse de alta al Empleado/a. Corrige o completa los campos con errores`, 'error'
            )
            return
        }
        await dispatch(postEmployee(input));
        Swal.fire(
            ' ALTA EMPLEADO ', `Se ha dado de Alta a ${input.nombre} ${input.apellido}`, 'success'
        )
        setInput({
            nombre: '',
            apellido: '',
            dni: null,
            email: '',
            fechaNacimiento: null,
            telefono: '',
            domicilio: '',
            ciudad: '',
            fechaAlta: null
        })
        navigate('/empleados')
    }
    

    return (
        <div className={style.all}>
                <form className={style.form} onSubmit={handleSubmit}>
                    <div className={style.div1}>
                        <label className={style.label1} htmlFor='nombre'> Nombre: </label>
                        <input  type='text'
                                value={input.nombre || ""} 
                                name='nombre' 
                                id='nombre'
                                autoComplete='off'
                                onChange={handleChange}
                                className={errors.nombre ? style.errorInput : style.input1} 
                        />      
  
                        {   
                            errors.nombre && (
                                <div className={style.error}>
                                    <span> {errors.nombre}</span>
                                </div>
                            )
                        }

                    </div>

                    <div className={style.div1}>
                        <label className={style.label1} htmlFor='apellido'> Apellido: </label>
                        <input  type='text'
                                value={input.apellido || ""} 
                                name='apellido'
                                id='apellido' 
                                autoComplete='off'
                                onChange={handleChange}
                                className={errors.apellido ? style.errorInput : style.input1} 
                        />

                        {   
                            errors.apellido && (
                                <div className={style.error}>
                                    <span> {errors.apellido}</span>
                                </div>
                            )
                        }
        
                    </div>
                    
                    <div className={style.div1}>
                        <label className={style.label1} htmlFor='dni'> DNI: </label>
                        <input  type='number' 
                                value={input.dni || ""} 
                                name='dni' 
                                id='dni'
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
                        <label className={style.label1} htmlFor='fechaNacimiento'> Fecha de nacimiento: </label>
                        <input  type='date' 
                                value={input.fechaNacimiento || ""} 
                                name='fechaNacimiento' 
                                id='fechaNacimiento'
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
                        <label className={style.label1} htmlFor='email'> Email: </label>
                        <input  type='text' 
                                value={input.email || ""} 
                                name='email' 
                                id='email'
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
                        <label className={style.label1} htmlFor='telefono'> Telefono: </label>
                        <input  type='text' 
                                value={input.telefono || ""} 
                                name='telefono' 
                                id='telefono'
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
                        <label className={style.label1} htmlFor='domicilio'> Domicilio: </label>
                        <input  type='text' 
                                value={input.domicilio || ""} 
                                name='domicilio' 
                                id='domicilio'
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
                        <label className={style.label1} htmlFor='ciudad'> Ciudad: </label>
                        <input  type='text' 
                                value={input.ciudad || ""} 
                                name='ciudad' 
                                id='ciudad'
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
                        <label className={style.label1} htmlFor='fechaAlta'> Fecha Alta: </label>
                        <input  type='date' 
                                value={input.fechaAlta || ""} 
                                name='fechaAlta' 
                                id='fechaAlta'
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
                        <button 
                                // type: submit
                                // disabled={  !input.nombre || !input.apellido || !input.dni || !input.email || !input.fechaNacimiento || !input.telefono ||
                                // !input.domicilio || !input.ciudad || !input.fechaAlta || errors.nombre || errors.apellido || errors.dni || errors.email || 
                                // errors.fechaNacimiento || errors.telefono || errors.domicilio || errors.ciudad || errors.fechaAlta 
                                //         }
                                className={style.btn}>
                                Alta Empleado
                        </button>    
                    </div>
 
                </form>    
        </div>
    )
}

export default FormEmpleado