import axios from "axios";
import { GET_ERRORS } from "./types";

export const createProject = (project, history) => {
  return dispatch => {
    axios
      .post("http://localhost:8080/api/project", project)
      .then(response => {
        history.push("/dashboard");
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        });
      });
  };
};
