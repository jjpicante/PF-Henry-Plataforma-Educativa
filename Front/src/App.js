import './App.css';
import { Route, Routes } from 'react-router-dom'
import Landing from './Components/Landing/landing';
import HomeStudent from './Components/Home/homeStudent';
import HomeTeacher from './Components/Home/homeTeacher';
import SearchBar from './Components/SearchBar/searchBar';


function App() {

  // const userType = "student";

  return (
    <div className="App">
      <Routes>

        {/* <Route exact path="/home">
          {userType === "student" ? <HomeStudent /> : <HomeTeacher />}
        </Route> */}

        <Route exact path='/home' element={<HomeStudent />} />

        <Route exact path="/Aulas" element={<SearchBar />} />

        <Route exact path="/" element={<Landing />} />

      </Routes>
    </div>
  );
}

export default App;

