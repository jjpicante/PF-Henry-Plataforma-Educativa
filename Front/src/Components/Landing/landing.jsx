import { Link } from "react-router-dom";
import style from "./landing.module.css";

const Landing = () => {
  return (
    <div className={style.container}>
      <div className={style.div1}>
        <h1 className={style.title}>Instituto Académico P.R.I.D.J</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={style.libro} viewBox="0 0 16 16">
  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
</svg>
        <h3 className={style.title2}>"Aprender, crecer, ser..."</h3>
      </div>

      <nav className={style.links}>
        <div>
          <Link to="/sobreNosotros">
            <button className={style.link2}>Sobre Nosotros</button>
          </Link>
          <Link to="/contacto">
            <button className={style.link3}>Contacto</button>
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

      

      <div className={style.divFooter}>


        <footer className={style.footer}>


          <a href="" className={style.a1}><a href="/sobreNosotros" className="nav-link px-2 text-body-secondary">Nosotros</a></a>
          <a href="" className={style.a2}><a href="/desarrolladores" className="nav-link px-2 text-body-secondary">Desarrolladores</a></a>
          <a href="" className={style.a3}><a href="/contacto" className="nav-link px-2 text-body-secondary">Contacto</a></a>
          
          <p className={style.footer2}>&copy; 2023 Grupo 05, Henry</p>
          
        </footer>


      </div>

    </div>
  );
};

export default Landing;
