import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { cleanEmployees, getAllActiveEmployees } from '../../redux/actions';
import SearchBarActive from '../GeneralComponents/SearchBarActive';
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
    dispatch(getAllActiveEmployees());
    return () => dispatch(cleanEmployees());
  }, [dispatch]);
    

  const handleResize = () => {
    setWidth(window.innerWidth);
  };


  return (
    <div className={style.all}>
      <div className={style.top}>
        <h1 className={style.title}> Registrar Ingresos </h1>
      </div>
      <div className={style.down}>
        <div className={style.search}>
          <SearchBarActive input={input} setInput={setInput} />
        </div>

        <div className={style.employees}>
          <TablaIngresos width={width} />
        </div>
        
      </div>
    </div>
  )
}

export default Ingresos