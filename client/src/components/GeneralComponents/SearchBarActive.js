import React from 'react';
import { useDispatch } from 'react-redux';
import { getActiveEmployeeIdSearch, getActiveEmployeesName, getAllActiveEmployees } from '../../redux/actions';
import style from './SearchBar.module.css';


function SearchBarActive({input, setInput}) {

    const dispatch = useDispatch();

    function onChangeSearch(e) {
        setInput(e.target.value);
        if(!parseInt(e.target.value[0])){
          dispatch(getActiveEmployeesName(e.target.value));
        }
        else{      
          dispatch(getActiveEmployeeIdSearch(parseInt(e.target.value)))
        }
    }
    
    function handlerReset(e){
        setInput('');
        dispatch(getAllActiveEmployees())
    }
    
    return (
        <form className="d-flex">
            <input  onChange={(e) => onChangeSearch(e)}
                    className={`form-control me-2 ${style.input}`}
                    type="search"
                    placeholder="Buscar por Apellido o Legajo/ID..."
                    aria-label="Search"
                    value={input}
            />
            <button onClick={() => handlerReset()}
                    className={`btn btn-outline-dark ${style.button}`}
                    type="reset"
            >
                Reset
            </button>
    </form>
  )
}

export default SearchBarActive