import React, { useEffect, useState } from 'react';
import style from './IngresosEgresos.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteIngreso } from '../../redux/actions/index';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


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

    const confirmChange = (e) => {
        confirmAlert({
          title: "¿Está seguro?",
          message:  egreso1 ? 
                    "Eliminará tanto el Ingreso como el Egreso asociado en caso de confirmar" :
                    "Eliminará el Ingreso en caso de confirmar",
          buttons: [
            {
              label: "Sí",
              onClick: () => deleteIngresos(e),
            },
            {
              label: "No",
            },
          ],
        });
      };

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
                <DeleteIcon className={style.deleteIcon} fontSize={width > 800 ? 'medium' : 'small'} onClick={confirmChange} />
            </div>
        </div>
    )
}

export default IngresosEgresos

