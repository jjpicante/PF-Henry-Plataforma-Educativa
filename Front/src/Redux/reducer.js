import {
    GET_STUDENTS
  } from "./actionsTypes"


  
const initialState = {
    students: [],
  }
  
  
  export default function reducer(state = initialState, { type, payload }) {
    
    switch (type) {
      case GET_STUDENTS:
        return {
          ...state,
          students: payload,
        }
     default:
            return { ...state, }
    }
}
