import { Route, Routes } from "react-router-dom";
import Headerlogin from "./components/NavBar/HeaderLogin";
import Landing from "./components/Landing/Landing";
import Ingresos from "./components/Ingresos/Ingresos";
import NotFound from "./components/NotFound/NotFound";
import Empleados from "./components/Empleados/Empleados";
import Egresos from "./components/Egresos/Egresos";
import CrearEmpleado from "./components/CrearEmpleado/CrearEmpleado";
import PerfilEmpleado from "./components/EmpleadoPerfil/PerfilEmpleado";
import EmpleadoIngreso from "./components/EmpleadoIngreso/EmpleadoIngreso";


function App() {
  return (
    <>
      <Headerlogin />
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/empleados"} element={<Empleados />} />
        <Route path={"/empleados/perfil/:id"} element={<PerfilEmpleado />} />
        <Route path={"/empleados/crear"} element={<CrearEmpleado />} />
        <Route path={"/empleados/:id"} element={<EmpleadoIngreso />} />
        <Route path={"/ingresos"} element={<Ingresos />} />
        <Route path={"/egresos"} element={<Egresos />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
