import axios from "../axios-ppm";
import { GET_ERRORS, GET_BACKLOG } from "./types";

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
    axios.get(`/api/backlog/${backlog_id}`).then(response => {
      dispatch({
        type: GET_BACKLOG,
        payload: response.data
      });
    });
    //   .catch(error => {
    //     dispatch({
    //       type: GET_ERRORS,
    //       payload: error.response.data
    //     });
    //   });
  };
};
