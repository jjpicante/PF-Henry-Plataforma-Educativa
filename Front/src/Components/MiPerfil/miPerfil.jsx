import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import style from "./miPerfil.module.css";
import Navbar from "../NavBar/navBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
import validate from "./validate";
import { cleanResponse, editAlumno, editProfesor } from "../../Redux/actions";
import Swal from "sweetalert2";

export function MiPerfil() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const response = useSelector((state) => state.editResponse);
  const currentusername = userData?.username;
  useEffect(() => {
    setvaloresOriginales({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    });
  }, [userData]);

  const [valoresOriginales, setvaloresOriginales] = useState({});

  //Username
  const [userName, setUserName] = useState(userData?.username);
  const [editUserName, setEditUserName] = useState(true);
  const [chekClick, setcheckClick] = useState(true);

  const handleCheckClick = () => {
    setcheckClick(!chekClick)
  }

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
    inputHandler(e);
  };
  const handleEditUserName = () => {
    setEditUserName(!editUserName);
  };
  useEffect(() => {
    setError(
      validate({
        ...nuevosValores,
      })
    );
  }, []);

  //Email
  const [email, setEmail] = useState(userData?.email);
  const [editEmail, setEditEmail] = useState(true);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    inputHandler(e);
  };
  const handleEditEmail = () => {
    setEditEmail(!editEmail);
  };
  //Password
  const [password, setPassword] = useState(userData?.password);
  const [editPassword, setEditPassword] = useState(true);
  const [mostrarPass, setmostrarPass] = useState(true);

  const handleTogglePassword = () => {
    setmostrarPass(!mostrarPass);
  };
  
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    inputHandler(e);
  };
  const handleEditPassword = () => {
    setEditPassword(!editPassword);
  };
  //Editar

  const [nuevosValores, setnuevosValores] = useState({
    username: userName,
    email: email,
    password: password,
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setnuevosValores({
      ...nuevosValores,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...nuevosValores,
        [e.target.name]: e.target.value,
      })
    );
  };
  //Preparacion para Submit
  //Funcion que verifica que propiedades cambiaron
  const paraEditar = (valoresOriginales, nuevosValores) => {
    const propiedadesCambiadas = {};

    for (const prop in nuevosValores) {
      if (valoresOriginales[prop] !== nuevosValores[prop]) {
        propiedadesCambiadas[prop] = nuevosValores[prop];
      }
    }
    return propiedadesCambiadas;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if(userData.rol === "student"){
      dispatch(
        editAlumno(currentusername, paraEditar(valoresOriginales, nuevosValores))
      );
    }
    if(userData.rol === "profesor"){
      dispatch(
        editProfesor(currentusername, paraEditar(valoresOriginales, nuevosValores))
      );
    }

  };

  const hasErrors = () => {
    return Object.values(error).some((error) => error !== "");
  };

  const [editar, setEditar] = useState(true);

  const handleEdit = () => {
    setEditar(!editar);
  };
 
  useEffect(() => {
    if (response) {
      if (response === "Tus datos se modificaron con éxito") {
        Swal.fire({
          text: response,
          icon: "success",
        });
      } else
        Swal.fire({
          text: response,
          icon: "warning",
        });
    }
  }, [response, chekClick]);

  useEffect(() => {
    return () => {
      dispatch(cleanResponse());
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className={style.container}>
        <div className={style.formulario}>
          {editar ? (
            <div className={style.datosPrincipales}>
              <p className={style.nombre}>Nombre: {userData?.name}</p>
              <p className={style.nombre}>Apellido: {userData?.apellido}</p>
              <p>Usuario: {userName}</p>
              <p>Email: {email}</p>
              <p>Fecha de nacimiento: {userData?.datebirth.slice(0, 10)}</p>
              <p>Rol: {userData?.rol}</p>
              <button type="button" onClick={() => handleEdit()}>
                Editar datos
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => submitHandler(e)}>
              <div>
                <label htmlFor={userData?.name}>Nombre: </label>
                <input className={style.nombre} type="text" value={userData?.name} disabled={true} />
              </div>
              <div>
                <label htmlFor={userData?.apellido}>Apellido: </label>
                <input className={style.nombre} type="text" value={userData?.apellido} disabled={true} />
              </div>
              <div>
                <label htmlFor={userName}>Usuario: </label>
                <button type="button" onClick={() => handleEditUserName()}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <input
                  type="text"
                  name="username"
                  value={userName}
                  disabled={editUserName}
                  onChange={(e) => handleChangeUserName(e)}
                />
                <p className={style.error}>{error.username}</p>
              </div>
              <div>
                <label htmlFor={email}>Email: </label>
                <button type="button" onClick={() => handleEditEmail()}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <input
                  type="text"
                  name="email"
                  value={email}
                  disabled={editEmail}
                  onChange={(e) => handleChangeEmail(e)}
                />
                <p className={style.error}>{error.email}</p>
              </div>
              <div>
                <label htmlFor={password}>Contraseña: </label>
                <button type="button" onClick={() => handleTogglePassword()}>
                  <FontAwesomeIcon icon={mostrarPass ? faEyeSlash : faEye} />
                </button>
                <button type="button" onClick={() => handleEditPassword()}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <input
                  type={mostrarPass ? "password" : "text"}
                  name="password"
                  value={password}
                  disabled={editPassword}
                  onChange={(e) => handleChangePassword(e)}
                />
                <p className={style.error}>{error.password}</p>
              </div>
              <div>
                <label htmlFor={userData?.anio}>Año: </label>
                <input type="text" value={userData?.anio} disabled={true} />
              </div>
              <div>
                <label htmlFor={userData?.datebirth}>Fecha de nacimiento: </label>
                <input type="text" value={userData?.datebirth.slice(0, 10)} disabled={true} />
              </div>
              <div>
                <label htmlFor={userData?.rol}>Rol: </label>
                <input type="text" value={userData?.rol} disabled={true} />
              </div>
              <div className={style.conteinerbotones}>
                <button
                  className={style.botonVolver}
                  type="button"
                  onClick={() => handleEdit()}
                >
                  Volver
                </button>
                <button
                  className={style.botonChek}
                  type="submit"
                  disabled={hasErrors()}
                  onClick={() => handleCheckClick()}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
