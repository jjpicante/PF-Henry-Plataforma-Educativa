import {
  GET_STUDENTS,
  GET_PROFESORS,
  GET_MATERIAS,
  GET_MATERIAS_BY_ID,
  GET_MATERIAS_BY_NAME,
  GET_MATERIAS_BY_ANIO,
  CLEAN_DETAIL,
  CLEAN_RESPONSE,
  POST_ALUMNO,
  EDIT_ALUMNO,
  EDIT_ALUMNO2,
  EDIT_PROFESOR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_ERROR,
  GET_USER_DATA_GOOGLE,
  POST_PROFESOR,
  GET_AULAS,
  RESET_PASSWORD,
  POST_PROFESOR_DE_BAJA,
  POST_ALUMNO_DE_BAJA,
  DELETE_ALUMNO,
  DELETE_PROFESOR,
  DELETE_MATERIAS,
  GET_MATERIAS_ADMIN,
} from "./actionsTypes";
import axios from "axios";
import Swal from "sweetalert2";

export const getStudents = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/Alumnos");
      const cantPaginas = response.data.pageCount;
      let alumnos = [];
      for (let i = 0; i < cantPaginas; i++) {
        let respuesta = await axios.get(`/Alumnos?page=` + i);
        alumnos.push(respuesta.data.alumnos);
      }
      //console.log(alumnos);
      return dispatch({
        type: GET_STUDENTS,
        payload: alumnos,
      });
    } catch (error) {
      return dispatch({ type: "ERROR", payload: error });
    }
  };
};

export const getStudent = (username) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/alumnos/getAlumno?username=${username}`);
      const alumno = response.data;
      return alumno;
    } catch (error) {
      return dispatch({ type: "ERROR", payload: error });
    }
  };
};

export const getProfesors = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/Profesores");
      const cantPaginas = response.data.pageCount;
      let profesores = response.data.profesor;
      return dispatch({
        type: GET_PROFESORS,
        payload: profesores,
      });
    } catch (error) {
      return dispatch({ type: "ERROR", payload: error });
    }
  };
};

export const getProfesor = (username) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/Profesores/getProfesor?username=${username}`);
      const profesor = response.data;
      //console.log(profesor);
      return profesor;
    } catch (error) {
      return dispatch({ type: "ERROR", payload: error });
    }
  };
};

export const postAlumno = (form) => {
  return async function (dispatch) {
    await axios.post("/Alumnos/", form);
    dispatch({
      type: POST_ALUMNO,
    });
  };
};

export const postAlumnoDeBaja = (payload) => {
  return async function (dispatch) {
    console.log("ACTIONNN", payload);
    await axios.post("/Alumnos/AlumnoDeBaja", payload);

    dispatch({
      type: POST_ALUMNO_DE_BAJA,
    });
  };
};

export const deleteAlumno = (username) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/Alumnos/${username}`, username);
      console.log(username);
      dispatch({
        type: DELETE_ALUMNO,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postProfesor = (form) => {
  return async function (dispatch) {
    try {
      await axios.post("/Profesores/", form);
      return dispatch({
        type: POST_PROFESOR,
      });
    } catch (error) {
      console.log("entro al catch");
    }
  };
};

export const postProfesorDeBaja = (payload) => {
  return async function (dispatch) {
    console.log("ACTIOn", payload);
    try {
      await axios.post("/Profesores/ProfesordeBaja", payload);
      return dispatch({
        type: POST_PROFESOR_DE_BAJA,
      });
    } catch (error) {
      console.log("entro al catch");
    }
  };
};

export const deleteProfesor = (username) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/Profesores/${username}`, username);
      console.log(username);
      dispatch({
        type: DELETE_PROFESOR,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//Para modificar datos de Mi Perfil
export const editAlumno = (currentusername, changes) => {
  return (dispatch) => {
    axios
      .put(`/alumnos/${currentusername}`, changes)
      .then((response) => {
        dispatch({ type: EDIT_ALUMNO, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: EDIT_ALUMNO, payload: error.response.data.error });
      });
  };
};

//Para modificar datos desde el panel de Admin
export const editAlumno2 = (currentusername, changes) => {
  return (dispatch) => {
    axios
      .put(`/alumnos/${currentusername}`, changes)
      .then((response) => {
        dispatch({ type: EDIT_ALUMNO2, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: EDIT_ALUMNO2, payload: error.response.data.error });
      });
  };
};

//Para modificar datos de Mi Perfil
export const editProfesor = (currentusername, changes) => {
  return (dispatch) => {
    axios
      .put(`/profesores/${currentusername}`, changes)
      .then((response) => {
        dispatch({ type: EDIT_PROFESOR, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: EDIT_PROFESOR, payload: error.response.data.error });
      });
  };
};

//Para modificar datos desde el panel de Admin
export const editProfesor2 = (currentusername, changes) => {
  return (dispatch) => {
    axios
      .put(`/Profesores/${currentusername}`, changes)
      .then((response) => {
        dispatch({ type: EDIT_ALUMNO2, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: EDIT_ALUMNO2, payload: error.response.data.error });
      });
  };
};

export const editMateria = (id, changes) => {
  return async function (dispatch) {
    try {
      console.log(changes);
      const response = axios.put("/materias/" + id, changes);
      const cambios = response.data;
      dispatch({ type: "EDIT_MATERIAS", payload: cambios });
    } catch (err) {
      console.log(err);
      return dispatch({ type: "EDIT_MATERIAS", payload: err });
    }
  };
};

export const deleteMateria = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.delete("/Materias/" + id);
      const deleteMateria = response.data;
      console.log(deleteMateria);
      return dispatch({
        type: DELETE_MATERIAS,
        payload: deleteMateria,
      });
    } catch (err) {
      console.log(err);
      return dispatch({ type: "ERROR", payload: err });
    }
  };
};

export const getMateriasAdmin = (page) => {
  return async function (dispatch) {
    const response = await axios.get("/Materias/Admin?page=" + page);
    const materias = response.data;
    console.log(materias);
    dispatch({ type: GET_MATERIAS_ADMIN, payload: materias });
  };
};

export const getMaterias = (page) => {
  return async function (dispatch) {
    const response = await axios.get(`/Materias?page=` + page);
    const materias = response.data;
    console.log(materias);
    dispatch({ type: GET_MATERIAS, payload: materias });
  };
};

export const getMateriasById = (id) => {
  return async function (dispatch) {
    const response = await axios.get("/Materias/getmateria/" + id);
    const materiaById = response.data;
    dispatch({ type: GET_MATERIAS_BY_ID, payload: materiaById });
  };
};

export const getMateriasByName = (name) => {
  return async function (dispatch) {
    try {
      const result = await axios.get(`/Materias?name=${name}`);
      if (result.data.materias.length > 0) {
        dispatch({ type: GET_MATERIAS_BY_NAME, payload: result.data.materias });
      } else {
        Swal.fire({
          text: "No hay materias con ese nombre",
          icon: "warning",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMateriasByAnio = (anio) => {
  return async function (dispatch) {
    // try {
    const result = await axios.get(`/Materias/filtermateria?anio=${anio}`);
    const materiaByAnio = result.data;
    /* console.log(materiaByAnio); */
    dispatch({ type: GET_MATERIAS_BY_ANIO, payload: materiaByAnio });
    //console.log(materiaByAnio);

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
  };
};

export const getAulas = () => {
  return async function (dispatch) {
    const response = await axios.get("/Aulas");
    const anio = response.data;
    dispatch({ type: GET_AULAS, payload: anio.aulas });
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
    payload: [],
  };
};

export const cleanResponse = () => {
  return {
    type: CLEAN_RESPONSE,
    payload: null,
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
      const response = await axios.post("/Login", {
        email,
        password,
      });
      const userData = response.data;
      console.log(userData);
      dispatch({ type: LOGIN_SUCCESS, payload: userData });
      return userData;
    } catch (error) {
      console.log(error);
      dispatch(loginFailed("invalidUser"));
    }
  };
};

export const logout = () => {
  return async function (dispatch) {
    try {
      await axios.post("/Logout");
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
    const response = await axios.post("/login/google", {
      email,
    });
    const userInfo = response.data;
    dispatch({ type: GET_USER_DATA_GOOGLE, payload: userInfo });
  } catch (error) {
    dispatch({ type: GET_USER_DATA_GOOGLE, payload: false });
  }
};

export const resetPassword = (email) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/reset", {
        email,
      });
      console.log(response);
      dispatch({ type: RESET_PASSWORD });
      Swal.fire({
        text: "Se ha enviado un correo para recuperar la contraseña",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "No se pudo enviar el correo para recuperar la contraseña",
        icon: "warning",
      });
    }
  };
};
