import {
    GET_STUDENTS,
    GET_PROFESORS
} from "./actionsTypes"
import { profesors, students } from "./Base de datos HC"


export const getStudents = ()=>{
    return{
        type: GET_STUDENTS,
        payload: students
    }
}

export const getProfesors = () =>{
    return{
        type: GET_PROFESORS,
        payload: profesors
    }
}