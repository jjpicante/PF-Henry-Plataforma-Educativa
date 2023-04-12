import React, { useState } from 'react';
import Navbar from '../NavBar/navBar';
import './landing.css'



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    // funcion que valide el login del usuario y de ahi lo redirija dependiendo de su token
    if (username === "juan" && password === "carlos") {
      // Redirije a /home encaso de pasar el login
      console.log("te logeaste rey")
    } else {
      setErrorMessage("Usuario o contraseña invalido.");
    }
  }

  return (
    <div id="landing">
      <Navbar />
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