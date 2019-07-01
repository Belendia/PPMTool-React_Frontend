import axios from "../axios-ppm";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

export const createProject = (project, history) => {
  return dispatch => {
    axios
      .post("/api/project", project)
      .then(response => {
        history.push("/dashboard");
        dispatch({
          type: GET_ERRORS,
          payload: {} // if it is good data and saved, wipe out all the previously stored errors.
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        });
      });
  };
};

export const getProjects = () => {
  return dispatch => {
    axios.get("/api/project").then(response => {
      dispatch({
        type: GET_PROJECTS,
        payload: response.data
      });
    });
  };
};

export const getProject = (id, history) => {
  return dispatch => {
    axios
      .get(`/api/project/${id}`)
      .then(response => {
        dispatch({
          type: GET_PROJECT,
          payload: response.data
        });
      })
      .catch(error => {
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: error.response.data
        // });
        history.push("/dashboard");
      });
  };
};

export const deleteProject = id => {
  return dispatch => {
    axios
      .delete(`/api/project/${id}`)
      .then(response => {
        dispatch({
          type: DELETE_PROJECT,
          payload: id
        });
      })
      .catch(error => {
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: error.response.data
        // });
      });
  };
};
