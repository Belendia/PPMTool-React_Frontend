import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT } from "./types";

export const createProject = (project, history) => {
  return dispatch => {
    axios
      .post("http://localhost:8080/api/project", project)
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
    axios.get("http://localhost:8080/api/project").then(response => {
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
      .get(`http://localhost:8080/api/project/${id}`)
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
