import { Link } from "react-router-dom";
import style from "./landing.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'

const Landing = () => {
  return (
    <div>

      <div className={style.container}>

        <div>
          <header className={style.header}>


            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={style.libro} viewBox="0 0 16 16">
              <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
            </svg>
            <h1 className={style.h1}>Instituto Académico P.R.I.D.J</h1>



            <Link to="/sobreNosotros">
              <button className={style.link2}>Sobre Nosotros</button>
            </Link>
            <Link to="/contacto">
              <button className={style.link3}>Contacto</button>
            </Link>

            <hr></hr>

          </header>
        </div>

        <div className={style.container2}>
          <h2 className={style.h2}>¡Bienvenido/a a nuestro aula virtual!</h2>
          <img className={style.img} src="https://i.pinimg.com/564x/ca/b6/5a/cab65ab1667901dcf6bd62236dfc36b7.jpg" alt="" />

          <div class="col-lg-6 mx-auto">
            <p className={style.p0}>Estamos emocionados de tenerte aquí y ser parte de tu viaje de aprendizaje. Nuestra plataforma está diseñada para brindarte una experiencia educativa enriquecedora y accesible desde cualquier lugar del mundo. Desde la comodidad de tu hogar o desde cualquier lugar que te encuentres, podrás conectarte con tus profesores y compañeros de clase en tiempo real.</p>

            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button type="button"> <Link to="/login">Acceder</Link></button>
            </div>
          </div>
        </div>


      </div>


      <div className={style.divFooter}>


        <footer className={style.footer}>


          <a className={style.a1} href="/sobreNosotros" >Nosotros</a>
          <a className={style.a2} href="/desarrolladores" >Desarrolladores</a>
          <a className={style.a3} href="/contacto" >Contacto</a>

          <p className={style.p4}>Gracias por elegir nuestra plataforma para tu aprendizaje en línea. Estamos ansiosos de comenzar este viaje juntos. ¡Bienvenido(a) a nuestra comunidad educativa en línea!</p>

          <p className={style.footer2}>&copy; 2023 Grupo 05, Henry</p>

        </footer>


      </div>

    </div>
  );
};

export default Landing;
