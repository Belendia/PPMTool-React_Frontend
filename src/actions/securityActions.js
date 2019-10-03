import axios from "../axios-ppm";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../utils/setJWTToken";
import jwt_decode from "jwt-decode";

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

/*
 * Steps
 * ----------------------
 * post => Login Request
 * Extract token from response.data
 * store the token in the localStorage
 * set our token in header
 * decode token on React
 * dispatch to our securityReducer
 */

export const login = loginRequest => {
  return dispatch => {
    axios
      //post => Login Request
      .post("/api/users/login", loginRequest)
      .then(response => {
        //Extract token from response.data
        const { token } = response.data;

        //store the token in the localStorage
        localStorage.setItem("jwtToken", token);

        //set our token in header
        setJWTToken(token);

        //decode token on React
        const decoded_token = jwt_decode(token);

        //dispatch to our securityReducer
        dispatch({
          type: SET_CURRENT_USER,
          payload: decoded_token
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

export const logout = () => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false); // delete the Authorization from axios header

  return dispatch => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
  };
};
