import {
    GET_STUDENTS,
    GET_PROFESORS,
    GET_MATERIAS,
    GET_MATERIAS_BY_ID,
    CLEAN_DETAIL,
    SET_USER_ROLE,
    CLEAR_USER_ROLE
} from "./actionsTypes"



const initialState = {
    students: [],
    profesors: [],
    materias: [],
    materiaById: [],
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
        case GET_MATERIAS_BY_ID:
            return{
                ...state,
                materiaById: payload
            }
        case CLEAN_DETAIL:
            return{
                ...state,
                materiaById: payload,
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
