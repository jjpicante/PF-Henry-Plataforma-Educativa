import './App.css';
import { Route, Routes } from 'react-router-dom'
import Landing from './Components/Landing/landing';
import HomeStudent from './Components/Home/homeStudent';
import HomeTeacher from './Components/Home/homeTeacher';
<<<<<<< HEAD
import SearchBar from './Components/SearchBar/searchBar';
import Classroom from './Components/Classroom/Classroom';
=======
import Classroom from './Components/Aulas/Aulas';
>>>>>>> e1291b7520e087c41a093ef89fd41dc7d01b972f


function App() {

  // const userType = "student";

  return (
    <div className="App">
      <Routes>

        {/* <Route exact path="/home">
          {userType === "student" ? <HomeStudent /> : <HomeTeacher />}
        </Route> */}

        <Route exact path='/home' element={<HomeStudent />} />

<<<<<<< HEAD
        <Route exact path="/Cursos" element={<Classroom />} />
=======
        <Route exact path="/Aulas" element={<Classroom />} />
>>>>>>> e1291b7520e087c41a093ef89fd41dc7d01b972f

        <Route exact path="/" element={<Landing />} />

      </Routes>
    </div>
  );
}

export default App;

