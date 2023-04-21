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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/home" element={<HomeStudent />} />
        <Route exact path="/Cursos" element={<Classroom />} />
        <Route exact path="/Materias" element={<Classroom />} />
        <Route exact path="/Aulas/materia/:id" element={<Detail />} />
        <Route exact path="/formAlumno" element={<Form />} />
        <Route exact path="/formProfesor" element={<FormProfesor />} />
        <Route exact path="/formsubject" element={<FormSubject />} />
        <Route exact path="/carrito" element={<Carrito />} />
        <Route exact path="/Stripe" element={<AppStripe></AppStripe>}></Route>
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
