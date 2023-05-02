import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing/landing";
import HomeStudent from "./Components/Home/homeStudent";
import Form from "./Components/Forms/forms";
import FormProfesor from "./Components/Forms/formProfesor";
import Classroom from "./Components/Classroom/Classroom";
import FormSubject from "./Components/Forms/formSubject";
import Detail from "./Components/Detail/detail";
import Carrito from "./Components/Carrito/carrito";
import AppStripe from "./Components/MercadoPago/stripe/appStripe";
import Alumnos from "./Components/Alumnos/alumnos";
import Login from "./Components/Landing/Login/Login";
import Caracteristicas from "./Components/Landing/Caracteristicas/Caracteristicas";
import Contacto from "./Components/Landing/Contacto/Contacto";
import Desarrolladores from "./Components/Landing/Desarrolladores/desarrolladores";
import EditarLanding from "./Components/Editar/Landing/EditarLanding";
import Editar from "./Components/Editar/Alumno/Editar";
import EditarProfesor from "./Components/Editar/Profesor/EditarProf";
import ProtectedRoutes from "./Components/ProtectedRoute/protectedRoute";
import ResetPassword from "./Components/ResetPassword/resetPassword";
import axios from "axios";
import { MiPerfil } from "./Components/MiPerfil/miPerfil";
import Disqus from "./Components/Coments/disqus";
import Firestoragev2 from "./Components/almacenamiento/Firestoragev2";
import LandingAdmin from "./Components/Admin/Adminhome";
import ListaMaterias from "./Components/Admin/ListaMaterias/listaMaterias";
import ClassroomProf from "./Components/ClassroomProf/classroomProf";

/* axios.defaults.baseURL = "https://servidor-plataformae2.onrender.com"; */
axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          element={<ProtectedRoutes allowedRoles={["student", "profesor", "admin", "alumno"]} />}
        >
          <Route exact path="/home" element={<HomeStudent />} />
          <Route exact path="/Materias" element={<Classroom />} />
          <Route exact path="/alumnos" element={<Alumnos />} />
          <Route exact path="/Aulas/materia/:id" element={<Detail />} />
          <Route exact path="/miPerfil" element={<MiPerfil />} />
        </Route>
        <Route element={<ProtectedRoutes allowedRoles={["profesor"]} />}>
          <Route exact path="/Cursos" element={<ClassroomProf />} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route exact path="/Admin" element={<LandingAdmin />}></Route>
          <Route exact path="/editarUsuario" element={<EditarLanding />} />
          <Route exact path="/formAlumno" element={<Form />} />
          <Route exact path="/formProfesor" element={<FormProfesor />} />
          <Route exact path="/formsubject" element={<FormSubject />} />
          <Route exact path="/listamaterias" element={<ListaMaterias />}></Route>
          <Route exact path="/editarLanding" element={<EditarLanding />} />
          <Route exact path="/editarAlumno/:username" element={<Editar />} />
          <Route exact path="/editarProfesor/:username" element={<EditarProfesor />} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["student"]} />}>
          <Route exact path="/carrito" element={<Carrito />} />
          <Route exact path="/Stripe" element={<AppStripe />} />
          <Route exact path="/miPerfil" element={<MiPerfil />} />
        </Route>

        <Route exact path="/reset-password" element={<ResetPassword />} />

        <Route exact path="/" element={<Landing />} />
        {/* Esto es agregado para probar su funcionalidad, despues hay que borrarlo */}
        <Route exact path="/Disqus" element={<Disqus />} />
        <Route exact path="/firestorages" element={<Firestoragev2 />} />
        {/* Hasta aqui */}
        <Route exact path="/sobreNosotros" element={<Caracteristicas />} />
        <Route exact path="/contacto" element={<Contacto />} />
        <Route exact path="/desarrolladores" element={<Desarrolladores />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
