import {
    GET_STUDENTS,
    GET_PROFESORS
} from "./actionsTypes"



const initialState = {
    students: [],
    profesors: []
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
        default:
            return { ...state, }
    }
}
