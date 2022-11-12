import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getAllEmployees, getEmployeeIdSearch, getEmployeesName } from '../../redux/actions';
import style from './Ingresos.module.css';
import TablaIngresos from './TablaIngresos';


function Ingresos() {

  let [input, setInput] = useState('');
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
 
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    dispatch(getAllEmployees())
  }, [dispatch]);
    

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  function onChangeSearch(e) {
    setInput(e.target.value);
    if(!parseInt(e.target.value[0])){
      dispatch(getEmployeesName(e.target.value));
    }
    else{      
      dispatch(getEmployeeIdSearch(parseInt(e.target.value)))
    }
  }

  function handlerReset(e){
    setInput('');
    dispatch(getAllEmployees())
  }


  return (
    <div className={style.all}>
      <div className={style.top}>
        <h1 className={style.title}> Registrar Ingresos </h1>
      </div>
      <div className={style.down}>
        <div className={style.search}>
          <form className="d-flex">
            <input
              onChange={(e) => onChangeSearch(e)}
              className={`form-control me-2 ${style.input}`}
              type="search"
              placeholder="Buscar por Apellido o Legajo/ID..."
              aria-label="Search"
              value={input}
            />
            <button
              onClick={() => handlerReset()}
              className={`btn btn-outline-dark ${style.button}`}
              type="reset"
            >
              Reset
            </button>
          </form>
        </div>

        <div className={style.employees}>
          <TablaIngresos width={width} />
        </div>
        
      </div>
    </div>
  )
}

export default Ingresos