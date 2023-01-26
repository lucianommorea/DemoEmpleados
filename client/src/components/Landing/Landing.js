import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getActiveEmployeeStatus } from '../../redux/actions';
import style from './Landing.module.css';
import TablaEmpleados from './TablaEmpleados';


function Landing() {

  const employees = useSelector(state=> state.employees);
  const dispatch = useDispatch();
  let [status, setStatus] = useState('IN');
  const [width, setWidth] = useState(window.innerWidth);

 
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };


  useEffect(() => {
    dispatch(getActiveEmployeeStatus(status));
    // return () => dispatch(cleanEmployees())
  }, [dispatch, status]);

  function handleCheck(e){
    setStatus(e.target.value)
  }

  return (
    <div className={style.all}>

      <div className={style.top}>
        <h1 className={style.title}> Registro Empleados </h1>
      </div>

      <div className={style.down}>
        <div className={style.employees}>
          <div className={style.check}>

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="IN" onChange={handleCheck} defaultChecked />
              <label className={`form-check-label ${style.label}`} htmlFor="inlineRadio1">Empleados en la Empresa</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="OUT" onChange={handleCheck} />
              <label className={`form-check-label ${style.label}`} htmlFor="inlineRadio2">Empleados fuera de la Empresa</label>
            </div>
            
          </div>


          <div className={style.tableEmployees}>
            <TablaEmpleados width={width} status={status}/>  
          </div>

          <div className={style.total}>
            {
              status === 'IN' ?
              <div> Total de Empleados en la empresa: {employees.length} </div> :
              <div> Total de Empleados fuera de la empresa: {employees.length} </div>
            }
          </div>

        </div>
      </div>
    </div>         
  )
}

export default Landing