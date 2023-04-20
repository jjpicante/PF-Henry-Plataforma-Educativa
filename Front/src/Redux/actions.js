import {
  GET_STUDENTS,
  GET_PROFESORS,
  GET_MATERIAS,
  GET_MATERIAS_BY_ID,
  GET_MATERIAS_BY_NAME,
  CLEAN_DETAIL,
  SET_USER_ROLE,
  CLEAR_USER_ROLE,
  LOGIN_FAILED,
  POST_ALUMNO,
  POST_PROFESOR,
} from "./actionsTypes";
import { profesors, students } from "./Base de datos HC";
import axios from "axios";

export const getStudents = () => {
  return {
    type: GET_STUDENTS,
    payload: students,
  };
};

export const getProfesors = () => {
  return {
    type: GET_PROFESORS,
    payload: profesors,
  };
};

export const postAlumno = (form) => {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/Alumnos/", form);
    dispatch({
      type: POST_ALUMNO,
    });
  };
};

export const postProfesor = (form) => {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/Profesores/", form);
    dispatch({
      type: POST_PROFESOR,
    });
  };
};

export const getMaterias = (page) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/Materias?page=` + page);
    const materias = response.data;
    dispatch({ type: GET_MATERIAS, payload: materias });
  };
};

export const getMateriasById = (id) => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/Materias/getmateria/" + id);
    const materiaById = response.data;
    dispatch({ type: GET_MATERIAS_BY_ID, payload: materiaById });
  };
};

export const getMateriasByName = (name) => {
  return async function (dispatch) {
    try {
      const result = await axios.get(`http://localhost:3001/Materias?name=${name}`);
      if (result.data.materias.length > 0) {
        dispatch({ type: GET_MATERIAS_BY_NAME, payload: result.data.materias });
      } else {
        window.alert("No hay materias con ese nombre");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
    payload: [],
  };
};

export function clearUserRole() {
  return { type: CLEAR_USER_ROLE };
}

export const setUserRole = (role) => ({
  type: SET_USER_ROLE,
  payload: role,
});

export const loginFailed = (message) => {
  return {
    type: LOGIN_FAILED,
    payload: message,
  };
};

export const postlogin = (username, password) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      const userData = response.data;
      dispatch(setUserRole(userData.rol));
      return userData;
    } catch (error) {
      console.log(error);
      dispatch(loginFailed("Invalid credentials"));
    }
  };
};
