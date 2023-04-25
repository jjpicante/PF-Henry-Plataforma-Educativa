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
import axios from "axios";
import { MiPerfil } from "./Components/MiPerfil/miPerfil";
import Disqus from "./Components/Coments/disqus";
import FireStorage from "./Components/almacenamiento/FireStorage";

/* axios.defaults.baseURL = "https://servidor-plataformae2.onrender.com"; */
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/home" element={<HomeStudent />} />
        <Route exact path="/Cursos" element={<Classroom />} />
        <Route exact path="/Materias" element={<Classroom />} />
        <Route exact path="/alumnos" element={<Alumnos />} />
        <Route exact path="/Aulas/materia/:id" element={<Detail />} />
        <Route exact path="/formAlumno" element={<Form />} />
        <Route exact path="/formProfesor" element={<FormProfesor />} />
        <Route exact path="/formsubject" element={<FormSubject />} />
        <Route exact path="/carrito" element={<Carrito />} />
        <Route exact path="/Stripe" element={<AppStripe></AppStripe>}></Route>
        <Route exact path="/" element={<Landing />} />
        {/* Esto es agregado, despues hay que borrarlo */}
        <Route exact path="/Disqus" element={<Disqus />} />
        <Route exact path="/firestorages" element={<FireStorage />} />
        {/* Hasta aqui */}
        <Route exact path="/login" element={<Login></Login>}></Route>
        <Route exact path="/sobreNosotros" element={<Caracteristicas></Caracteristicas>}></Route>
        <Route exact path="/contacto" element={<Contacto></Contacto>}></Route>
        <Route exact path="/miPerfil" element={<MiPerfil />} />
      </Routes>
    </div>
  );
}

export default App;
