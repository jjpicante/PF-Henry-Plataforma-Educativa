import { useSelector } from "react-redux";
import { useState } from "react";
import style from "./miPerfil.module.css";
import Navbar from "../NavBar/navBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash,faPenToSquare,faCheck  } from "@fortawesome/free-solid-svg-icons";
import validate from "./validate";

export function MiPerfil() {
  const userData = useSelector((state) => state.userData);

  //Username
  const [userName, setUserName] = useState(userData?.username);
  const [editUserName, setEditUserName] = useState(true)
  
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
    inputHandler(e)
  };
  const handleEditUserName = () => {
    setEditUserName(!editUserName)
  }
  //Email
  const [email, setEmail] = useState(userData?.email);
  const [editEmail, setEditEmail] = useState(true);
  
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    inputHandler(e)
  };
  const handleEditEmail = () => {
    setEditEmail(!editEmail)
  }
 //Password
  const [password, setPassword] = useState(userData?.password);
  const [editPassword, setEditPassword] = useState(true);
  const [mostrarPass, setmostrarPass] = useState(true);

  const handleTogglePassword = () => {
    setmostrarPass(!mostrarPass);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    inputHandler(e)
  };
  const handleEditPassword = () => {
    setEditPassword(!editPassword)
  }
 //Editar

 const [paraEditar, setParaEditar] = useState({
    username: "",
    email: "",
    password: "",
  })
  
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setParaEditar({
        username: userName,
        email: email,
        password: password,
        [e.target.name]: e.target.value
    });
    setError(
        validate({
        ...paraEditar,
        [e.target.name]: e.target.value
    })
    );
  }; 

  const submitHandler = (e) => {
    e.preventDefault();
  }


  const hasErrors = () => {
    return Object.values(error).some((error) => error !== "");
  };

  console.log(error);
 const [editar, setEditar] = useState(true);
 
 const handleEdit = () => {
    setEditar(!editar);
 }
    return(
    <div>
    <Navbar />
    <div className={style.container}>
    <div className={style.containerDatos}>
        {editar?
        <div>
            <p>Nombre: {userData?.name}</p>
            <p>Apellido: {userData?.apellido}</p>
            <p>Usuario: {userName}</p>
            <p>Email: {email}</p>
            <p>Fecha de nacimiento: {userData?.datebirth.slice(0, 10)}</p>
            <p>Rol: {userData?.rol}</p>
        </div>
        :
        <form onSubmit={(e) => submitHandler(e)}> 
            <div>
            <label htmlFor={userData?.name}>Nombre: </label>
        <input 
            type="text" 
            value={userData?.name} 
            disabled = {true} />
            </div>
            <div>
        <label htmlFor={userData?.apellido}>Apellido: </label>
        <input 
            type="text" 
            value={userData?.apellido} 
            disabled = {true} />
            </div>
            <div>
        <label htmlFor={userName}>Usuario: </label>
        <input
            type="text"
            name="username"
            value={userName}
            disabled = {editUserName}
            onChange={(e) => handleChangeUserName(e)} 
        />
        <button type="button" onClick={()=> handleEditUserName()}><FontAwesomeIcon icon={faPenToSquare} /></button>
        <p className={style.error}>{error.username}</p>
            </div>
            <div>
        <label htmlFor={email}>Email: </label>
        <input
            type="text"
            name="email"
            value={email}
            disabled = {editEmail}
            onChange={(e) => handleChangeEmail(e)}
        />
        <button type="button" onClick={()=> handleEditEmail()}><FontAwesomeIcon icon={faPenToSquare} /></button>
        <p className={style.error}>{error.email}</p>
            </div>
            <div>
        <label htmlFor={password}>Contraseña: </label>
        <input
            type={mostrarPass ? "password" : "text"}
            name="password"
            value={password}
            disabled = {editPassword}
            onChange={(e) => handleChangePassword(e)}
        />
        <button type="button" onClick={() => handleTogglePassword()}>
            <FontAwesomeIcon icon={mostrarPass ? faEyeSlash : faEye} />
        </button>
        <button type="button" onClick={()=> handleEditPassword()}><FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <p className={style.error}>{error.password}</p>
            </div>
            <div>
        <label htmlFor={userData?.anio}>Año: </label>
        <input 
            type="text" 
            value={userData?.anio} 
            disabled = {true} />
            </div>
            <div>
        <label htmlFor={userData?.datebirth}>Fecha de nacimiento: </label>
        <input 
            type="text" 
            value={userData?.datebirth.slice(0, 10)} 
            disabled = {true} />
            </div>
            <div>
        <label htmlFor={userData?.rol}>Rol: </label>
        <input 
            type="text" 
            value={userData?.rol} 
            disabled = {true} />
            </div>
            <button type="submit" disabled={hasErrors()}><FontAwesomeIcon icon={faCheck} /></button>
        </form>}
        <button type="button" onClick={()=>handleEdit()}>Editar datos</button>
    </div>
    </div> 
    </div>
    
    );
}

