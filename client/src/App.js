import { Route, Routes } from "react-router-dom";
import Headerlogin from "./components/NavBar/HeaderLogin";
import Landing from "./components/Landing/Landing";
import Ingresos from "./components/Ingresos/Ingresos";
import NotFound from "./components/NotFound/NotFound";
import Empleados from "./components/Empleados/Empleados";
import Egresos from "./components/Egresos/Egresos";
import Empleado from "./components/Empleado/Empleado";
import CrearEmpleado from "./components/Empleado/CrearEmpleado";
import PerfilEmpleado from "./components/Empleado/PerfilEmpleado";


function App() {
  return (
    <>
      <Headerlogin />
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/empleados"} element={<Empleados />} />
        <Route path={"/empleados/perfil/:id"} element={<PerfilEmpleado />} />
        <Route path={"/empleados/crear"} element={<CrearEmpleado />} />
        <Route path={"/empleados/:id"} element={<Empleado />} />
        <Route path={"/ingresos"} element={<Ingresos />} />
        <Route path={"/egresos"} element={<Egresos />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
