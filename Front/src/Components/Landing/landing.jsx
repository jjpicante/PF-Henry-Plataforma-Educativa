import React, { useState } from 'react';
//import { useDispatch } from 'react-redux';
import './landing.css';

function Login() {
  //const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const users= [
      {
          "id": 1,
          "nombre": "Diego",
          "apellido": "González",
          "nacionalidad": "Argentina",
          "fecha_nacimiento": "1985-12-14",
          "email": "diego.gonzalez@example.com",
          "username": "diego.gonzalez",
          "password": "password123",
          "role": "profesor"
      },
      {
        "id": 2,
        "Nombre": "André",
        "Apellido": "Garcia",
        "Nacionalidad": "Brasileño",
        "Fecha_nacimiento": "2007-07-30",
        "email": "andre.garcia@example.com",
        "username": "andregarcia",
        "password": "contraseña20",
        "role": "student"
    }
    ]
    const userData = users.find(
      (user) => user.username === username && user.password === password
    );
    //buscan en la base de datos si el usuario existe
    //const userData = EscuelaDB.find((user) => user.name === username)
    //si el usuario existe compara las contraseñas
    if (userData) {
      if (userData.password === password)
        // hacer update del estado con el rol del login
        //dispatch({ type: 'SET_USER_ROLE', payload: userData.role });
        localStorage.setItem("userRole",userData.role)
      //despues de hacer el update lo redirige al home
      window.location.href = "/home";
    } else {
      setErrorMessage("Usuario o contraseña invalido.");
    }
  }

  return (
    <div id="landing">
      <div id="login-box">
        <form className='form' onSubmit={handleLogin}>
          <h2>Iniciar Sesion</h2>
          <div className="user-box">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Usuario</label>
          </div>
          <div className="user-box">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>Contraseña</label>
          </div>
          <button type="submit">Iniciar Sesion</button>
        </form>
        <p style={{ color: "red" }}>{errorMessage}</p>
      </div>
    </div>
  );
}


export default Login;