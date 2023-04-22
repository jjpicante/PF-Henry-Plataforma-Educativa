// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import './landing.css';
// import { postlogin } from '../../Redux/actions';

// function Login() {
//   const dispatch = useDispatch();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     //buscan en la base de datos si el usuario existe
//     try {
//       // busca en la base de datos si el usuario existe
//       const userData = await dispatch(postlogin(username, password));

//       if (userData && userData.message) {
//         setErrorMessage(userData.message);
//       } else {
//         // hacer update del estado con el rol del login
//         localStorage.setItem("userRole", userData.role);
//         // después de hacer el update lo redirige al home
//         window.location.href = "/home";
//       }
//     } catch (error) {
//       setErrorMessage("Error al iniciar sesión");
//     }
//   }

//   return (
//     <div id="landing">
//       <div id="login-box">
//         <form className='form' onSubmit={handleLogin}>
//           <h2>Iniciar Sesion</h2>
//           <div className="user-box">
//             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//             <label>Usuario</label>
//           </div>
//           <div className="user-box">
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <label>Contraseña</label>
//           </div>
//           <button type="submit">Iniciar Sesion</button>
//         </form>
//         <p style={{ color: "red" }}>{errorMessage}</p>
//       </div>
//     </div>
//   );
// }


// export default Login;

import { Link, NavLink } from "react-router-dom";
import Login from "./Login/Login"
import style from "./landing.module.css";

const Landing = () => {

  return (
    <div className={style.container}>

      <div className={style.div1}>
        <h1 className={style.title}>Instituto Académico P.R.I.D.J</h1>
        <h3 className={style.title2}>""Aprender, crecer, ser""</h3>
      </div>

      <nav className={style.links}>

        <div>
          <Link to="/sobreNosotros"><button className={style.link2}>Sobre Nosotros</button></Link>
          <Link to="/contacto"><button className={style.link3}>Contacto</button></Link>
        </div>


      </nav>


      <div className={style.div2}>
        <h3>Aula Virtual</h3>
        <img className={style.img} src="https://i.pinimg.com/564x/ca/b6/5a/cab65ab1667901dcf6bd62236dfc36b7.jpg" alt=""></img>

        <button className={style.acceder}><Link to="/login">Acceder</Link></button>
      </div>

      <div>


      </div>

    </div>
  )
}

export default Landing;