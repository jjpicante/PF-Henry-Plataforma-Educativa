import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Login.css";
import { auth, googleprovider } from "../../../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { postlogin, verifiedGoogleLogIn } from "../../../Redux/actions";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(auth.currentUser);
    //buscan en la base de datos si el usuario existe
    try {
      if (!email || !password) {
        setErrorMessage("Please enter both email and password");
        return;
      }
      dispatch(postlogin(email,password))
      navigate("/home", {replace: true})
    } catch (error) {
      setErrorMessage("Error al iniciar sesión");
    }
  };

  const googleHandler = async () => {
    try {
      await signInWithPopup(auth, googleprovider);
    } catch (error) {
      console.log(error.message);
    }
    dispatch(verifiedGoogleLogIn(auth.currentUser.email));
    navigate("/Home", { replace: true });
  };

  return (
    <div id="landing">
      <div id="login-box">
        <form className="form" onSubmit={handleLogin}>
          <h2>Iniciar Sesion</h2>
          <div className="user-box">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Contraseña</label>
          </div>
          <button type="submit">Iniciar Sesion</button>
          <button onClick={googleHandler}>Iniciar Sesion con Google</button>
          <br></br>
        </form>
        <p style={{ color: "red" }}>{errorMessage}</p>
      </div>
    </div>
  );
}

export default Login;
