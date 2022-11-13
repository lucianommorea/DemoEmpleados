import React, { useEffect, useState } from 'react';
import style from './IngresosEgresos.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteIngreso } from '../../redux/actions/index';


function IngresosEgresos({id, ingreso1, egreso1, horasTrans, masOchoHoras, setIsDeleted}) {

    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();

 
    useEffect(() => {
      window.addEventListener("resize", handleResize, false);
    }, []);
  
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    function deleteIngresos(e){
        dispatch(deleteIngreso(id, setIsDeleted));
    }

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
            <div className={style.delete}>
                <DeleteIcon className={style.deleteIcon} fontSize={width > 800 ? 'medium' : 'small'} onClick={deleteIngresos} />
            </div>
        </div>
    )
}

export default IngresosEgresos

