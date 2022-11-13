import { Link, NavLink, useLocation } from "react-router-dom";
import React from "react";
import style from "./Header.module.css";


const HeaderLogin = () => {

  const location = useLocation();

  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={`row ${style.row1}`}>
          <div className={`col-lg-3 ${style.colPreg}`}>
            <Link to="/" className={ location.pathname === '/' ? style.linksIntActive : style.linksInt}>
              Inicio
            </Link>
          </div>
          <div className={`col-lg-3 ${style.colPreg}`}>
            <Link to="/empleados" className={ location.pathname === '/empleados' ? style.linksIntActive : style.linksInt}>
               Empleados
            </Link>
          </div>
          <div className={`col-lg-3 ${style.colPreg}`}>
            <NavLink to="/ingresos" className={({isActive}) => isActive ? style.linksIntActive : style.linksInt}>
              Registrar Ingresos
            </NavLink>
          </div>
          <div className={`col-lg-3 ${style.colPreg}`}>
            <NavLink to="/egresos" className={({isActive}) => isActive ? style.linksIntActive : style.linksInt}>
              Registrar Egresos
            </NavLink>
          </div>
      </div>
    </div>
  );
};

export default HeaderLogin;