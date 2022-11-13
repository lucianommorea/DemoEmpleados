import React from 'react';
import style from './CrearEmpleado.module.css';
import FormEmpleado from './FormEmpleado';


function CrearEmpleado() {


  return (
    <div className={style.all}>
      <div className={style.top}>
        <h1 className={style.title}> Alta Empleado </h1>
      </div>
      <div className={style.down}>
        <div>
          <FormEmpleado />
        </div>
        
      </div>
    </div>
  )
}

export default CrearEmpleado