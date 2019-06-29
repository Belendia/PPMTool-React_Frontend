import { GET_PROJECT, GET_PROJECTS } from "../actions/types";

const initialState = {
  projects: [], //list of project
  project: {} // a single project
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload
      };
    default:
      return state;
  }
}