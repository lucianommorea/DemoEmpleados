import React from 'react';
import { useSelector } from 'react-redux';
import style from './TablaEmpleados.module.css';


function TablaEmpleados({width, status}) {

    let employees = useSelector(state => state.employees);

    function formatNumber(number){
        return new Intl.NumberFormat().format(number)
    }

    return (
        <>
        <div className={`row align-items-start ${style.topT}`}>
            {
                width > 1100 ?
                <p className={`col-3 ${style.tableTop}`}>Apellido</p> :
                <p className={`col-4 ${style.tableTop}`}>Apellido</p>
            }
            {
                width > 1100 ?
                <p className={`col-3 ${style.tableTop}`}>Nombre</p> :
                <p className={`col-4 ${style.tableTop}`}>Nombre</p>
            }
            {
                width > 1100 ?
                <p className={`col-1 ${style.tableTop}`}>Legajo</p> :
                null
            }
            {
                width > 1100 ?
                <p className={`col-2 ${style.tableTop}`}>DNI</p> :
                null
            }
            {
                status === 'IN' ?
                width > 1100 ?
                <p className={`col-3 ${style.tableTop}`}>Último Ingreso</p> :
                <p className={`col-4 ${style.tableTop}`}>Último Ingreso</p> :
                width > 1100 ?
                <p className={`col-3 ${style.tableTop}`}>Último Egreso</p> :
                <p className={`col-4 ${style.tableTop}`}>Último Egreso</p>
            }
        </div>
        
        <div className={style.totalTable}>

     
        {   employees.map((e) => 
                employees.length > 0 ?
                <div className={`row align-items-start ${style.info}`} key={e.id}>
                {
                    width > 1100 ?
                    <p className={`col-3 ${style.tableDown}`}>{e.apellido}</p> :
                    <p className={`col-4 ${style.tableDown}`}>{e.apellido}</p>
                }
                {
                    width > 1100 ?
                    <p className={`col-3 ${style.tableDown}`}>{e.nombre}</p> :
                    <p className={`col-4 ${style.tableDown}`}>{e.nombre}</p>
                }
                {
                    width > 1100 ?
                    <p className={`col-1 ${style.tableDown}`}>{e.id}</p> :
                    null
                }
                {
                    width > 1100 ?
                    <p className={`col-2 ${style.tableDown}`}>{formatNumber(e.dni)}</p> :
                    null
                }
                {
                    status === 'IN' ?
                    width > 1100 ?
                    <p className={`col-3 ${style.tableTop}`}>{e?.ingresos[e.ingresos.length-1]?.date.slice(0,10)} {e?.ingresos[e.ingresos.length-1]?.date.slice(11,19)}</p> :
                    <p className={`col-4 ${style.tableTop}`}>{e?.ingresos[e.ingresos.length-1]?.date.slice(0,10)} {e?.ingresos[e.ingresos.length-1]?.date.slice(11,19)}</p> :
                    width > 1100 ?
                    <p className={`col-3 ${style.tableTop}`}>{e?.egresos[e.egresos.length-1]?.date.slice(0,10)} {e?.egresos[e.egresos.length-1]?.date.slice(11,19)} </p> :
                    <p className={`col-4 ${style.tableTop}`}>{e?.egresos[e.egresos.length-1]?.date.slice(0,10)} {e?.egresos[e.egresos.length-1]?.date.slice(11,19)} </p>
                } 
                </div> 
                : null
        )}
        </div>
        </>
    )
}

export default TablaEmpleados