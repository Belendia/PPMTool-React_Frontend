import axios from "../axios-ppm";
import { GET_ERRORS } from "./types";

export const createNewUser = (newUser, history) => {
  return dispatch => {
    axios
      .post("/api/users/register", newUser)
      .then(response => {
        history.push("/login");
        dispatch({
          type: GET_ERRORS,
          payload: {} // if it is good data and saved, wipe out all the previously stored errors.
        });
      })
      .catch(error => {
        if (error.response === undefined) {
          dispatch({
            type: GET_ERRORS,
            payload: error
          });
        } else {
          dispatch({
            type: GET_ERRORS,
            payload: error.response.data
          });
        }
      });
  };
};
