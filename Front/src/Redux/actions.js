import {
    GET_STUDENTS,
    GET_PROFESORS
} from "./actionsTypes"
import { profesors, students } from "./Base de datos HC"


const getStudents = ()=>{
    return{
        type: GET_STUDENTS,
        payload: students
    }
}

const getProfesors = () =>{
    return{
        type: GET_PROFESORS,
        payload: profesors
    }
}