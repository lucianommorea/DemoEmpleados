import React from 'react';
import style from './FormPerfilEmpleado.module.css';


function EmpleadoModificacion({input, errors, handleChange, handleSubmit, changeEdit}) {


    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.div1}>
                <label className={style.label1} htmlFor='nombre'> Nombre: </label>
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
                <label className={style.label1} htmlFor='apellido'> Apellido: </label>
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
                <label className={style.label1} htmlFor='dni'> DNI: </label>
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
                <label className={style.label1} htmlFor='fechaNacimiento'> Fecha de nacimiento: </label>
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
                <label className={style.label1} htmlFor='email'> Email: </label>
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
                <label className={style.label1} htmlFor='telefono'> Telefono: </label>
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
                <label className={style.label1} htmlFor='domicilio'> Domicilio: </label>
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
                <label className={style.label1} htmlFor='ciudad'> Ciudad: </label>
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
                <label className={style.label1} htmlFor='fechaAlta'> Fecha Alta: </label>
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
                <button className={style.btnConfirm} onClick={changeEdit}>
                        Volver Atras
                </button>   
                <button className={style.btnConfirm2}>
                        Confirmar Modificación
                </button>  

            </div>

        </form> 
  )
}

export default EmpleadoModificacion