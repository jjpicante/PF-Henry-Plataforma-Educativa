import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../NavBar/navBar';



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    // funcion que valide el login del usuario y de ahi lo redirija dependiendo de su token
    if (username === "juan" && password === "carlos") {
      // Redirije a /home encaso de pasar el login
      Navigate("/home")
    } else {
      setErrorMessage("Usuario o contraseña invalido.");
    }
  }

  return (
    <div>
        <Navbar/>
      <h1>Iniciar Sesion</h1>
      <form onSubmit={handleLogin}>
        <label>
          Usuario:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Iniciar Sesion</button>
      </form>
      <p style={{color: "red"}}>{errorMessage}</p>
    </div>
  );
}

export default Login;