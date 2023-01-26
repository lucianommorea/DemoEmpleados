import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { cleanEmployees, getAllEmployees } from '../../redux/actions';
import style from './Empleados.module.css';
import SearchBar from '../GeneralComponents/SearchBar';
import TablaAdmin from './TablaAdmin';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useNavigate } from 'react-router-dom';


function Empleados() {

  let [input, setInput] = useState('');
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
 
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    dispatch(getAllEmployees());
    // return ()=> dispatch(cleanEmployees());
  }, [dispatch]);
    

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  function toCreate() {
    navigate('/empleados/crear')
  }

  return (
    <div className={style.all}>
      <div className={style.top}>
        <h1 className={style.title} data-testid="empleados"> Empleados </h1>
      </div>
      <div className={style.down}>

        <div className={style.divBtnAdd}>
          <button className={style.btnAdd} onClick={toCreate}>
            <AddCircleOutlineRoundedIcon fontSize={width > 800 ? 'medium' : 'small' } /> Alta Empleado
          </button>
        </div>

        <div className={style.search}>
            <SearchBar input={input} setInput={setInput} /> 
        </div>


        <div className={style.employees}>
          <TablaAdmin width={width} />
        </div>
        
      </div>
    </div>
  )
}

export default Empleados