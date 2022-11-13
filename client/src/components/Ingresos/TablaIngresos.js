import React from 'react';
import { useSelector } from 'react-redux';
import style from './TablaIngresos.module.css';
import ReportIcon from '@mui/icons-material/Report';
import Tooltip from '@mui/material/Tooltip';
import {Link} from 'react-router-dom';

function TablaIngresos({width}) {

    let employees = useSelector(state => state.employees);


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
                <p className={`col-3 ${style.tableTop}`}>Legajo</p> :
                null
            }
            {
                width > 1100 ?
                <p className={`col-3 ${style.tableTop}`}>Registrar Ingreso</p> :
                <p className={`col-4 ${style.tableTop}`}>Registrar Ingreso</p> 
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
                    <p className={`col-3 ${style.tableDown}`}>{e.id}</p> :
                    null
                }
                {
                    e.estado === 'IN' ?
                    width > 1100 ?
                    <p className={`col-3 ${style.tableTop}`}> 
                        <Tooltip title="El empleado se encuentra trabajando" placement='right-end'>
                            <ReportIcon color="error" fontSize='large' /> 
                        </Tooltip>
                    </p> :
                    <p className={`col-4 ${style.tableTop}`}> 
                        <Tooltip title="El empleado se encuentra trabajando" placement='right-end'>
                            <ReportIcon color="error" /> 
                        </Tooltip> 
                    </p> :
                    width > 1100 ?
                    <p className={`col-3 ${style.tableTop}`}>
                        <Link to={`/empleados/${e.id}`} className={style.toUser}>
                            <button className={style.registrar} > Registrar Ingreso </button> 
                        </Link>
                    </p> :
                    <p className={`col-4 ${style.tableTop}`}> 
                        <Link to={`/empleados/${e.id}`} className={style.toUser}>
                            <button className={style.registrar} >Registrar </button> 
                        </Link>
                    </p>
                } 
                </div>
            : null
        )}
        
        </div>
        </>
    )
}

export default TablaIngresos