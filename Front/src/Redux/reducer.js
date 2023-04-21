import {
  GET_STUDENTS,
  GET_PROFESORS,
  GET_MATERIAS,
  GET_MATERIAS_BY_ID,
  GET_MATERIAS_BY_NAME,
  GET_MATERIAS_BY_ANIO,
  CLEAN_DETAIL,
  SET_USER_ROLE,
  CLEAR_USER_ROLE,
  LOGIN_FAILED,
  POST_ALUMNO,
  POST_PROFESOR,
  GET_USER_DATA_GOOGLE,
} from "./actionsTypes";

const initialState = {
  students: [],
  profesors: [],
  materias: {},
  pageCount: "",
  materiaById: [],
  userData: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: payload,
      };
    case POST_ALUMNO:
      return {
        ...state,
      };
    case POST_PROFESOR:
      return {
        ...state,
      };
    case GET_PROFESORS:
      return {
        ...state,
        profesors: payload,
      };
    case GET_MATERIAS:
      return {
        ...state,
        materias: payload.materias,
        pageCount: payload.pageCount,
      };
    case GET_MATERIAS_BY_ID:
      return {
        ...state,
        materiaById: payload,
      };
    case GET_MATERIAS_BY_NAME:
      return {
        ...state,
        materias: payload,
      };
    case GET_MATERIAS_BY_ANIO:
      return {
        ...state,
        materias: payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        materiaById: payload,
      };
    case SET_USER_ROLE:
      return {
        ...state,
        userRole: payload,
      };
    case CLEAR_USER_ROLE:
      return {
        ...state,
        userRole: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        userRole: "",
      };
    case GET_USER_DATA_GOOGLE:
      return {
        ...state,
        userData: payload,
      };
    default:
      return { ...state };
  }
}
