import {
    GET_STUDENTS
} from "./actionsTypes"
import { students } from "./JsonAlumnos"


const getStudents = ()=>{
    return{
        type: GET_STUDENTS,
        payload: students
    }
}