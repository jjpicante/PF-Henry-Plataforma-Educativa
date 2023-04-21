import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./landing.css";
import { auth, googleprovider } from "../../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { postlogin, verifiedGoogleLogIn } from "../../Redux/actions";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(auth.currentUser);
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

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  return (
    <div id="landing">
      <div id="login-box">
        <form className="form" onSubmit={handleLogin}>
          <h2>Iniciar Sesion</h2>
          <div className="user-box">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Usuario</label>
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
          <button type="submit" onClick={googleHandler}>
            Iniciar Sesion con Google
          </button>
          <button onClick={logout}>Logout</button>
        </form>
        <p style={{ color: "red" }}>{errorMessage}</p>
      </div>
    </div>
  );
}

export default Login;
