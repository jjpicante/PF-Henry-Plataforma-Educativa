import {
    GET_STUDENTS,
    GET_PROFESORS,
    GET_MATERIAS,
    SET_USER_ROLE,
    CLEAR_USER_ROLE
} from "./actionsTypes"



const initialState = {
    students: [],
    profesors: [],
    materias: [],
    userRole: null,
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
        case SET_USER_ROLE:
            return {
                ...state,
                userRole: payload,
            }
        case CLEAR_USER_ROLE:
            return {
                ...state,
                userRole: null,
            }
        default:
            return { ...state, }
    }
}
