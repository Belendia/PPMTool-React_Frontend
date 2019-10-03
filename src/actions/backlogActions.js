import axios from "../axios-ppm";
import {
  GET_ERRORS,
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK
} from "./types";

export const addProjectTask = (backlog_id, project_task, history) => {
  return dispatch => {
    axios
      .post(`/api/backlog/${backlog_id}`, project_task)
      .then(response => {
        history.push(`/projectBoard/${backlog_id}`);
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

export const getBacklog = backlog_id => {
  return dispatch => {
    axios
      .get(`/api/backlog/${backlog_id}`)
      .then(response => {
        dispatch({
          type: GET_BACKLOG,
          payload: response.data
        });
      })
      .catch(error => {
        const e = error.data ? error.data : error;
        dispatch({
          type: GET_ERRORS,
          payload: e
        });
      });
  };
};

export const getProjectTask = (backlog_id, pt_id, history) => {
  return dispatch => {
    axios
      .get(`/api/backlog/${backlog_id}/${pt_id}`)
      .then(response => {
        dispatch({
          type: GET_PROJECT_TASK,
          payload: response.data
        });
      })
      .catch(error => {
        history.push("/dashboard");
      });
  };
};

export const updateProjectTask = (backlog_id, pt_id, project_task, history) => {
  return dispatch => {
    axios
      .patch(`/api/backlog/${backlog_id}/${pt_id}`, project_task)
      .then(response => {
        history.push(`/projectBoard/${backlog_id}`);
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

export const deleteProjectTask = (backlog_id, pt_id) => {
  return dispatch => {
    axios.delete(`/api/backlog/${backlog_id}/${pt_id}`).then(response => {
      dispatch({
        type: DELETE_PROJECT_TASK,
        payload: pt_id
      });
    });
  };
};
