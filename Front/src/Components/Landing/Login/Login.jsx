import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Login.css";
import { auth, googleprovider } from "../../../config/firebase";
import { signInWithPopup /* , signOut  */ } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { postlogin, verifiedGoogleLogIn } from "../../../Redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mostrarPass, setmostrarPass] = useState(true);

  const handleTogglePassword = () => {
    setmostrarPass(!mostrarPass);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    //buscan en la base de datos si el usuario existe
    try {
      if (!email || !password) {
        setErrorMessage("Please enter both email and password");
        return;
      }
      const response = await dispatch(postlogin(email, password));
      if (response.error) {
        setErrorMessage("Invalid email or password");
      }
      if (response.rol === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
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
    navigate("/home", { replace: true });
  };

  return (
    <div id="landing">
      <div id="login-box">
        <form className="form" onSubmit={handleLogin}>
          <h2>Iniciar Sesion</h2>
          <label className="email">Email</label>
          <div className="user-box">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="email">Contraseña</label>
            <button
              className="botonOjo"
              type="button"
              onClick={() => handleTogglePassword()}
            >
              <FontAwesomeIcon icon={mostrarPass ? faEyeSlash : faEye} />
            </button>
          </div>
          <div className="user-box">
            <input
              type={mostrarPass ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Iniciar Sesion
          </button>
          <br></br>
          <button className="button" onClick={googleHandler}>
            Iniciar Sesion con Google
          </button>
          
          <p style={{ color: "red" }}>{errorMessage}</p>
          <div className="forgot-password">
            <Link to="/reset-password">¿Olvidaste tu contraseña?</Link>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Login;
