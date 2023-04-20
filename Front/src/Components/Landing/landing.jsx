import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './landing.css';
import { postlogin } from '../../Redux/actions';


function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    //buscan en la base de datos si el usuario existe

    try {
      // busca en la base de datos si el usuario existe
      const userData = await dispatch(postlogin(email, password));
  
      if (userData && userData.message) {
        setErrorMessage(userData.message);
      } else {
        // hacer update del estado con el rol del login
        localStorage.setItem("userRole", userData.role);
        // después de hacer el update lo redirige al home
        window.location.href = "/home";
      }
    } catch (error) {
      setErrorMessage("Error al iniciar sesión");
    }
  }


  return (
    <div id="landing">
      <div id="login-box">
        <form className='form' onSubmit={handleLogin}>
          <h2>Iniciar Sesion</h2>
          <div className="user-box">
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>Contraseña</label>
          </div>
          <button type="submit">Iniciar Sesion</button>
          <br></br>
        </form>
        <p style={{ color: "red" }}>{errorMessage}</p>
      </div>
    </div>
  );
}


export default Login;