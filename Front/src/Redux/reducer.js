import {
    GET_STUDENTS,
    GET_PROFESORS,
    GET_MATERIAS
} from "./actionsTypes"



const initialState = {
    students: [],
    profesors: [],
    materias: [],
}


export default function reducer(state = initialState, { type, payload }) {

    switch (type) {
        case GET_STUDENTS:
            return {
                ...state,
                students: payload,
            }
        case GET_PROFESORS:
            return {
                ...state,
                profesors: payload,
            }
        case GET_MATERIAS:
            return {
                ...state,
                materias: payload,
            }    
        default:
            return { ...state, }
    }
}
