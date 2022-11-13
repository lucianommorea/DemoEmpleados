import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeId, getIngresoByEmployee, postEgreso, postIngreso } from '../../redux/actions';
import style from './Empleado.module.css';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import IngresosEgresos from '../Empleados/IngresosEgresos';
const moment = require('moment');


function Empleado() {

  const dispatch = useDispatch();
  const employee = useSelector(state => state.employee);
  const ingresos = useSelector(state => state.ingresos);
  const { id } = useParams();
  const navigate = useNavigate();
  let [input, setInput] = useState('');
  let [error, setError] = useState('');
  let dateNow = new Date();

  useEffect(() => {
    dispatch(getEmployeeId(id));
    dispatch(getIngresoByEmployee(id));
  }, [dispatch, id]);

  function validate(input) {
    let inputFecha = moment(input, "YYYY-MM-DD HH:mm:ss");
    let error = '';
    if(employee.estado === 'IN' && employee.ingresos[employee.ingresos.length-1].date > input) error = "Egreso no puede ser anterior a Ingreso";
    else if(inputFecha > dateNow) error = "La fecha es mayor a la actual";
    return error;
  }

  function handlerInput(e){
    setInput(e.target.value);
    setError(validate(e.target.value));
  }

 
  async function toRegister(){
    if(employee.estado === 'OUT'){
      let ingreso = {
        idEmpleado: employee.id,
        date: input
      }
      await dispatch(postIngreso(ingreso))
    }
    else{
      let lastIngreso = employee.ingresos[employee.ingresos.length-1]
      let egreso = {
        idEmpleado: employee.id,
        date: input,
        idIngreso: lastIngreso.id
      }
      await dispatch(postEgreso(egreso));
      let fecha1 = moment(lastIngreso.date, "YYYY-MM-DD HH:mm:ss");
      let fecha2 = moment(input, "YYYY-MM-DD HH:mm:ss");
      let diff = fecha2.diff(fecha1, 'h'); 
      let diffM = fecha2.diff(fecha1, 'm');
      let minutes = diffM % 60;
      let horasMinTrabajadas = `${diff} hs. ${minutes} minutos`;
      let masOchoHoras = diffM > 480 ? true : false;
      if(masOchoHoras){
        Swal.fire(
          'Advertencia', `${employee.nombre} ${employee.apellido} trabajó ${horasMinTrabajadas}`, 'warning'
        )
      }
      else {
        Swal.fire(
          'Egreso confirmado', `${employee.nombre} ${employee.apellido} trabajó ${horasMinTrabajadas}`, 'success'
        )
      }

    }
    navigate('/')
  }


  return (
    <div className={style.all}>
      {
        employee.estado === 'IN' ?
          <div className={style.top}>
            <h1 className={style.title}> Registrar Egreso </h1>
          </div> :
          <div className={style.top}>
            <h1 className={style.title}> Registrar Ingreso </h1>
          </div>
      }

      <div className={style.down}>
        <div className={style.form}>
          <span className={style.name}> {employee.apellido} {employee.nombre} </span>
          <span className={style.legajo}> - Legajo Nº: {employee.id} </span>
          <label for="ingreso-input" className={style.label}  >
            {
              employee.estado === "IN" ?
              <span> - Elegí el horario de egreso:  </span> :
              <span> - Elegí el horario de ingreso:  </span>
            }

          </label>
          <input type="datetime-local" id='ingreso-input' onChange={handlerInput}
                  className={error ? style.errorInput : style.inputTime} min="2021-01-01T00:00" max={dateNow.toString()} 
          />
          {
            error && <span className={style.error}> {error} </span>
          }
          {
            employee.estado === 'OUT' ?
            <Button variant="contained" color="success" disabled={!input || error} onClick={toRegister}>
              Registrar Ingreso
            </Button> :
            <Button variant="contained" color="error" disabled={!input || error} onClick={toRegister}>
              Registrar Egreso
            </Button> 


          }
        </div>    
      </div>
      <div className={style.historial}>
        <h3> Historial </h3>
      </div>

      <div className={style.bottom}>

        <div className={style.up}>
            <div className={style.hora}>
                Ingreso
            </div>
            <div className={style.hora}>
                Egreso
            </div>
            <div className={style.horas}>
                Horas Trabajadas
            </div>
        </div>
        {
          ingresos && employee && ingresos.map( (e) => 
          employee.ingresos.length === 0 ?
          <div> No existen ingresos registrados </div> : 
          <IngresosEgresos  key={e.id}
                            ingreso1={e.date} 
                            egreso1={e.egreso ? e.egreso.date : null} 
                            horasTrans={e.horasMinTrabajadas}
                            masOchoHoras={e.masOchoHoras}/> 

          )
        }
      </div>

     
    </div>
  )
}

export default Empleado