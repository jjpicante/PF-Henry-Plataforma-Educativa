import {
  GET_STUDENTS,
  GET_PROFESORS,
  GET_MATERIAS,
  GET_MATERIAS_BY_ID,
  GET_MATERIAS_BY_NAME,
  GET_MATERIAS_BY_ANIO,
  CLEAN_DETAIL,
  POST_ALUMNO,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_ERROR,
  GET_USER_DATA_GOOGLE,
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
    const response = await axios.get(
      `http://localhost:3001/Materias?page=` + page
    );
    const materias = response.data;
    dispatch({ type: GET_MATERIAS, payload: materias });
  };
};

export const getMateriasById = (id) => {
  return async function (dispatch) {
    const response = await axios.get(
      "http://localhost:3001/Materias/getmateria/" + id
    );
    const materiaById = response.data;
    dispatch({ type: GET_MATERIAS_BY_ID, payload: materiaById });
  };
};

export const getMateriasByName = (name) => {
  return async function (dispatch) {
    try {
      const result = await axios.get(
        `http://localhost:3001/Materias?name=${name}`
      );
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


export const getMateriasByAnio = (anio) => {
  return async function (dispatch) {
    // try {
      const result = await axios.get(`http://localhost:3001/Materias/filtermateria?anio=${anio}`);
      const materiaByAnio = result.data;
    dispatch({ type: GET_MATERIAS_BY_ANIO, payload: materiaByAnio });
console.log(materiaByAnio);

  //     if (result) {
  //       dispatch({ type: GET_MATERIAS_BY_ANIO, payload: result.data.materias });
  //        console.log(result)
  //     } else {
  //       window.alert("No hay materias de este año");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
}



export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
    payload: [],
  };
};

export const loginFailed = (message) => {
  return {
    type: LOGIN_FAILED,
    payload: message,
  };
};

export const loginSuccess = (userData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
};

export const verifyUserSuccess = (userData) => {
  return {
    type: VERIFY_USER_SUCCESS,
    payload: userData,
  };
};

export const verifyUserError = (message) => {
  return {
    type: VERIFY_USER_ERROR,
    payload: message,
  };
};

export const postlogin = (email, password) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/Login", {
        email,
        password,
      });

      const userData = response.data;
      dispatch(loginSuccess(userData));
      console.log(userData)
      return userData;
    } catch (error) {
      console.log(error);
      dispatch(loginFailed("Invalid credentials"));
    }
  };
};

export const logout = () => {
  return async function (dispatch) {
    try {
      await axios.post("http://localhost:3001/Logout");
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGOUT_ERROR });
    }
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error,
  };
};

export const verifiedGoogleLogIn = (email) => async (dispatch) => {
  try {
    const userInfo = await axios.post("http://localhost:3001/login/google", {
      email,
    });
    dispatch({ type: GET_USER_DATA_GOOGLE, payload: userInfo });
  } catch (error) {
    dispatch({ type: GET_USER_DATA_GOOGLE, payload: null });
  }
};
