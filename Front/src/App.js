import './App.css';
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login/login';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/login" element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
