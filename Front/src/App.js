import './App.css';
import { Route, Routes } from 'react-router-dom'
import Landing from './Components/Login/login';
import HomeStudent from './Components/Home/homeStudent';
import HomeTeacher from './Components/Home/homeTeacher';
import SearchBar from './Components/SearchBar/searchBar';
import Classroom from './Components/Classroom/Classroom';


function App() {

  // const userType = "student";

  return (
    <div className="App">
      <Routes>

        {/* <Route exact path="/home">
          {userType === "student" ? <HomeStudent /> : <HomeTeacher />}
        </Route> */}

        <Route exact path='/home' element={<HomeStudent />} />

        <Route exact path="/Cursos" element={<Classroom />} />

        <Route exact path="/login" element={<Landing />} />

      </Routes>
    </div>
  );
}

export default App;

