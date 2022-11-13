import React, {useEffect, useState} from 'react';
import style from './PerfilEmpleado.module.css';
import FormPerfilEmpleado from './FormPerfilEmpleado';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeId, getIngresoByEmployee } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading2';
import NotFound from '../NotFound/NotFound';
import IngresosEgresos from '../EmpleadoIngreso/IngresosEgresos';


function PerfilEmpleado() {

  const employee = useSelector(state => state.employee);
  const ingresos = useSelector(state => state.ingresos);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  let [edit, setEdit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(true);

  useEffect(()=> {
    dispatch(getEmployeeId(id, setLoading));
    dispatch(getIngresoByEmployee(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getEmployeeId(id));
    dispatch(getIngresoByEmployee(id));
    // eslint-disable-next-line
  }, [isDeleted]);

  if(loading){
    return <Loading />
  }
  if(isLoading){
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return <Loading />
  }
  if(!employee.id) {
    return <NotFound />
  }
  return (
    <div className={style.all}>
      <div className={style.top}>
        <h1 className={style.title}> Perfil de {employee.nombre} {employee.apellido} </h1>
      </div>
      <div className={style.down}>
        <div>
          <FormPerfilEmpleado nombre={employee.nombre} apellido={employee.apellido} dni={employee.dni} email={employee.email}
                              fechaNacimiento={employee.fechaNacimiento} telefono={employee.telefono} domicilio={employee.domicilio}
                              ciudad={employee.ciudad} fechaAlta={employee.fechaAlta} fechaBaja={employee.fechaBaja} edit={edit} setEdit={setEdit} />
        </div>
        
      </div>

      { !edit ?
        <>
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
                                id={e.id}
                                ingreso1={e.date} 
                                egreso1={e.egreso ? e.egreso.date : null} 
                                horasTrans={e.horasMinTrabajadas}
                                masOchoHoras={e.masOchoHoras}
                                setIsDeleted={setIsDeleted}/> 

              )
            }
          </div>
        </>
        : null
      }

      
    </div>
  )
}

export default PerfilEmpleado