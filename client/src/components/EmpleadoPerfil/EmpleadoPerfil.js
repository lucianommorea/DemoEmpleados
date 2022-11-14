import React from 'react';
import style from './FormPerfilEmpleado.module.css';
import {useSelector} from 'react-redux';

function EmpleadoPerfil({nombre, apellido, dni, fechaNacimiento, email, telefono, domicilio, ciudad, fechaAlta, fechaBaja, changeEdit, confirmChange, confirmChange2}) {

    const employee = useSelector(state => state.employee)

    return (
        <div className={style.form}>
            <div className={style.div1}>
                <label className={style.label2}> Nombre: </label>
                <span className={style.campo}> {nombre} </span>     
            </div>

            <div className={style.div1}>
                <label className={style.label2}> Apellido: </label>
                <span className={style.campo}> {apellido} </span>     
            </div>

            <div className={style.div1}>
                <label className={style.label2}> DNI: </label>
                <span className={style.campo}> {dni} </span>     
            </div>

            <div className={style.div1}>
                <label className={style.label2}> Fecha de nacimiento: </label>
                <span className={style.campo}> {fechaNacimiento ? fechaNacimiento.slice(0,10) : null} </span>     
            </div>

            <div className={style.div1}>
                <label className={style.label2}> Email: </label>
                <span className={style.campo}> {email} </span>     
            </div>

            <div className={style.div1}>
                <label className={style.label2}> Telefono: </label>
                <span className={style.campo}> {telefono} </span>     
            </div>

            <div className={style.div1}>
                <label className={style.label2}> Domicilio: </label>
                <span className={style.campo}> {domicilio} </span>     
            </div>

            <div className={style.div1}>
                <label className={style.label2}> Ciudad: </label>
                <span className={style.campo}> {ciudad} </span>     
            </div>

            <div className={style.div1}>
                <label className={style.label2}> Fecha Alta: </label>
                <span className={style.campo}> {fechaAlta ? fechaAlta.slice(0,10) : null} </span>     
            </div>

            {   
                fechaBaja ?
                <div className={style.div1}>
                    <label className={style.label2}> Fecha Baja: </label>
                    <span className={style.campo}> {fechaBaja ? fechaBaja.slice(0,10) : null} </span>   
                </div> :
                null                
            }

            <div className={style.divBtn}>
                <button className={style.btn1} onClick={changeEdit}>
                        Modificar Empleado
                </button>  

                {
                    employee.situacionLaboral === 'ACTIVO' ?
                    <button className={style.btn2} onClick={confirmChange}>
                        Dar de Baja
                    </button>  :
                    <button className={style.btn3} onClick={confirmChange2}>
                        Dar de Alta
                    </button>                            
                }  
                
            </div>

        </div>    
  )
}

export default EmpleadoPerfil