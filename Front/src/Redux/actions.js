import {
    GET_STUDENTS,
    GET_PROFESORS,
    GET_MATERIAS,
    SET_USER_ROLE,
    CLEAR_USER_ROLE
} from "./actionsTypes"
import { profesors, students, materias } from "./Base de datos HC"


export const getStudents = () => {
    return {
        type: GET_STUDENTS,
        payload: students
    }
}

export const getProfesors = () => {
    return {
        type: GET_PROFESORS,
        payload: profesors
    }
}

export const getMaterias = () => {
    return {
        type: GET_MATERIAS,
        payload: materias
    }
}

export function clearUserRole() {
    return { type: CLEAR_USER_ROLE };
}

export const setUserRole = (role) => ({
    type: SET_USER_ROLE,
    payload: role,
});