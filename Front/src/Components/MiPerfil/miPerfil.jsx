import { useSelector } from "react-redux";
import style from "./miPerfil.module.css"
import Navbar from "../NavBar/navBar";

export function MiPerfil(){
    const userData = useSelector((state) => state.userData);

console.log(userData)

return (
    <div className={style.container}>
        <Navbar/>
        <div className={style.containerDatos}>
        <p>Nombre: {userData?.name}</p>
        <p>Apellido: {userData?.apellido}</p>
        <p>Usuario: {userData?.username}</p>
        <p>Email: {userData?.email}</p>
        <p>Año: {userData?.anio}</p>
        <p>Fecha de nacimiento: {userData?.datebirth}</p>
        <p>Rol: {userData?.rol}</p>
        </div>
    </div>
)
}

