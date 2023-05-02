import { Link, NavLink } from "react-router-dom";
import Login from "./Login/Login";
import style from "./landing.module.css";

const Landing = () => {
  return (
    <div className={style.container}>
      <div className={style.div1}>
        <h1 className={style.title}>Instituto Académico P.R.I.D.J</h1>
        <h3 className={style.title2}>Aprender, crecer, ser</h3>
      </div>

      <nav className={style.links}>
        <div>
          <Link to="/sobreNosotros">
            <button className={style.link2}>Sobre Nosotros</button>
          </Link>
          <Link to="/contacto">
            <button className={style.link3}>Contacto</button>
          </Link>
          <Link to="/desarrolladores">
            <button /* className={style.link2} */>Desarrolladores</button>
          </Link>
        </div>
      </nav>

      <div className={style.div2}>
        <h3>Aula Virtual</h3>
        <img
          className={style.img}
          src="https://i.pinimg.com/564x/ca/b6/5a/cab65ab1667901dcf6bd62236dfc36b7.jpg"
          alt=""
        ></img>

        <button className={style.acceder}>
          <Link to="/login">Acceder</Link>
        </button>
      </div>

      <div></div>
    </div>
  );
};

export default Landing;
