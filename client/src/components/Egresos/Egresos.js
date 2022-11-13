import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getAllEmployees } from '../../redux/actions';
import SearchBarActive from '../GeneralComponents/SearchBarActive';
import style from '../Ingresos/Ingresos.module.css';
import TablaEgresos from './TablaEgresos';


function Egresos() {

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


  return (
    <div className={style.all}>
      <div className={style.top}>
        <h1 className={style.title}> Registrar Egresos </h1>
      </div>
      <div className={style.down}>
        <div className={style.search}>
          <SearchBarActive input={input} setInput={setInput} />
        </div>

        <div className={style.employees}>
          <TablaEgresos width={width} />
        </div>
        
      </div>
    </div>
  )
}

export default Egresos