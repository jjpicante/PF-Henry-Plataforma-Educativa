import SearchBar from "../SearchBar/searchBar";
import Navbar from "../NavBar/navBar";
import style from "./Classroom.module.css"


const Classroom = () => {

    return (
        <div className={style.fondo}>

            <div>
                <Navbar></Navbar>
            </div>

            <div>
                <SearchBar></SearchBar>
            </div>

        </div>
    )
}

export default Classroom;