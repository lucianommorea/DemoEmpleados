import React from 'react';
import style from './IngresosEgresos.module.css';


function IngresosEgresos({ingreso1, egreso1, horasTrans, masOchoHoras}) {

    return (
        <div className={style.all}>
            <div className={style.hora}>
                {ingreso1.slice(0,10)} {ingreso1.slice(11,16)}
            </div>
            <div className={style.hora}>
                {egreso1?.slice(0,10)} {egreso1?.slice(11,16)}
            </div>
            <div className={masOchoHoras ? style.horasR : style.horasV}>
                {horasTrans}
            </div>
        </div>
    )
}

export default IngresosEgresos