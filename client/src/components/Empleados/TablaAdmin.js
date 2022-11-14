import React from 'react';
import { useSelector } from 'react-redux';
import style from './TablaAdmin.module.css';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useNavigate } from 'react-router-dom';

function TablaAdmin({width}) {

    let employees = useSelector(state => state.employees);
    const navigate = useNavigate()
    

    return (
        <>
        <div className={`row align-items-start ${style.topT}`}>

                <p className={`col-3 ${style.tableTop}`}>Apellido</p>
                <p className={`col-3 ${style.tableTop}`}>Nombre</p>
                <p className={`col-1 ${style.tableTop}`}>Legajo</p> 
                {
                    width > 700 ?
                    <p className={`col-2 ${style.tableTop}`}>En Empresa</p> :
                    <p className={`col-2 ${style.tableTop}`}>Trabaja</p> 
                }
                <p className={`col-1 ${style.tableTop}`}>Activo</p> 
                <p className={`col-2 ${style.tableTop}`}>Editar</p> 

        </div>
        
        <div className={style.totalTable}>

        {   employees.map((e) => 
                employees.length > 0 ?
                    <div className={`row align-items-start ${style.info}`} key={e.id}>
 
                        <p className={`col-3 ${style.tableDown}`}>{e.apellido}</p>
                        <p className={`col-3 ${style.tableDown}`}>{e.nombre}</p>
                        <p className={`col-1 ${style.tableDown}`}>{e.id}</p> 
                        {
                            e.estado === 'IN' ?
                            <p className={`col-2 ${style.tableDown}`}> <CheckCircleRoundedIcon color='success' /> </p> :
                            <p className={`col-2 ${style.tableDown}`}> <RemoveCircleRoundedIcon color='error' /> </p>
                        } 

                        <p className={`col-1 ${style.tableDown}`}> 
                            {
                                e.situacionLaboral === 'ACTIVO' ?
                                <span> SI </span> :
                                <span> NO </span> 
                            }
                        </p> 

                        <p className={`col-2 ${style.tableDown}`}> 
                            <AddCircleOutlineRoundedIcon className={style.edit} onClick={() => navigate(`/empleados/perfil/${e.id}`)} /> 
                        </p> 

                    </div> 
                : null
        )}
        </div>
        </>
    )
}

export default TablaAdmin