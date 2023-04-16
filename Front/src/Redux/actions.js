import { errorMonitor } from "events";
import {
  GET_STUDENTS,
  GET_PROFESORS,
  GET_MATERIAS,
  GET_MATERIAS_BY_ID,
  GET_MATERIAS_BY_NAME,
  CLEAN_DETAIL,
  SET_USER_ROLE,
  CLEAR_USER_ROLE,
} from "./actionsTypes";
import { profesors, students, materias } from "./Base de datos HC";
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

export const getMaterias = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/Materias");
    const materias = response.data;
    dispatch({ type: GET_MATERIAS, payload: materias });
  };
};

export const getMateriasById = (id) => {
  return {
    type: GET_MATERIAS_BY_ID,
    payload: materias.filter((elem) => elem.id === Number(id)),
  };
};

export const getMateriasByName = (name) => {

  return async function (dispatch) {
    try{
    const result = await axios.get(`http://localhost:3001/Materias?name=${name}`);
    console.log(result);
    if(result.data.materias.length > 0){
      console.log(result);
      dispatch({type: GET_MATERIAS_BY_NAME, payload: result.data.materias})
      
    }
    else {
      window.alert('No hay materias con ese nombre')
    }  
  }
  catch (error) {
    console.log(error)
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
