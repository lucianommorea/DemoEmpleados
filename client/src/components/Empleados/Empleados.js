import React from 'react';
import style from './Empleados.module.css';


function Empleados() {

    
  return (
    <div className={style.all}>
      <div className={style.top}>
        <h1 className={style.title}> Empleados </h1>
      </div>
      <div className={style.down}>
        Empleados
      </div>
    </div>
  )
}

export default Empleados