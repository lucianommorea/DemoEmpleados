import React from 'react';
import { useDispatch } from 'react-redux';
import { getAllEmployees, getEmployeeIdSearch, getEmployeesName } from '../../redux/actions';
import style from './SearchBar.module.css';


function SearchBar({input, setInput}) {

    const dispatch = useDispatch();

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

export default SearchBar