import { combineReducers } from "redux";
import ciudadesReducer from "./ciudadesReducer";
import itineraryReducer from "./itineraryReducer";
import userReducer from "./userReducer";

const mainReducer = combineReducers({
  ciudadesReducer,
  itineraryReducer,
  userReducer,
});

export default mainReducer;
