import { combineReducers } from "redux";
import animationReducer from "./animation/animationReducer";

export default combineReducers({
  animation: animationReducer,
});
