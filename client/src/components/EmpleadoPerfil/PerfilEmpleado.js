import React, {useEffect, useState} from 'react';
import style from './PerfilEmpleado.module.css';
import FormPerfilEmpleado from './FormPerfilEmpleado';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeId } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading2';
import NotFound from '../NotFound/NotFound';


function PerfilEmpleado() {

  const employee = useSelector(state => state.employee);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    dispatch(getEmployeeId(id, setLoading));
    // dispatch(getAllEmployees());
  }, [dispatch, id])

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
                              ciudad={employee.ciudad} fechaAlta={employee.fechaAlta} fechaBaja={employee.fechaBaja} />
        </div>
        
      </div>
    </div>
  )
}

export default PerfilEmpleado