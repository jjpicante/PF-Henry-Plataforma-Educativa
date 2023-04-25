import { useSelector } from "react-redux";
import { useState } from "react";
import style from "./miPerfil.module.css";
import Navbar from "../NavBar/navBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash,faPenToSquare,faCheck  } from "@fortawesome/free-solid-svg-icons";

export function MiPerfil() {
  const userData = useSelector((state) => state.userData);
 
  //Username
  const [userName, setUserName] = useState(userData?.username);
  const [editUserName, setEditUserName] = useState(true)
  
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleEditUserName = () => {
    setEditUserName(!editUserName)
  }
  //Email
  const [email, setEmail] = useState(userData?.email);
  const [editEmail, setEditEmail] = useState(true);
  
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
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
  };
  const handleEditPassword = () => {
    setEditPassword(!editPassword)
  }

return (
    <div>
    <Navbar />
    <div className={style.container}>
    <div className={style.containerDatos}>
        <form>
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
            value={userName}
            disabled = {editUserName}
            onChange={(e) => handleChangeUserName(e)}
        />
        <button type="button" onClick={()=> handleEditUserName()}><FontAwesomeIcon icon={faPenToSquare} /></button>
        <button type="button"><FontAwesomeIcon icon={faCheck} /></button>
            </div>
            <div>
        <label htmlFor={email}>Email: </label>
        <input
            type="text"
            value={email}
            disabled = {editEmail}
            onChange={(e) => handleChangeEmail(e)}
        />
        <button type="button" onClick={()=> handleEditEmail()}><FontAwesomeIcon icon={faPenToSquare} /></button>
        <button type="button"><FontAwesomeIcon icon={faCheck} /></button>
            </div>
            <div>
        <label htmlFor={password}>Contraseña: </label>
        <input
            type={mostrarPass ? "password" : "text"}
            value={password}
            disabled = {editPassword}
            onChange={(e) => handleChangePassword(e)}
        />
        <button type="button" onClick={() => handleTogglePassword()}>
            <FontAwesomeIcon icon={mostrarPass ? faEyeSlash : faEye} />
        </button>
        <button type="button" onClick={()=> handleEditPassword()}><FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button type="button"><FontAwesomeIcon icon={faCheck} /></button>
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
            value={userData?.datebirth} 
            disabled = {true} />
            </div>
            <div>
        <label htmlFor={userData?.rol}>Rol: </label>
        <input 
            type="text" 
            value={userData?.rol} 
            disabled = {true} />
            </div>
        </form>
    </div>
    </div> 
    </div>
    
    );
}

