import {
  ANIMATION_STOPPED,
  ANIMATION_SUCCEEDED,
  ANIMATION_STARTING,
  ANIMATION_UPDATED,
} from "../types/animation";

export const animationStopped = () => (dispatch) => {
  dispatch({ type: ANIMATION_STOPPED });
};

export const animationStarted = (shapesAmount) => (dispatch) => {
  dispatch({ type: ANIMATION_STARTING });
  dispatch({ type: ANIMATION_SUCCEEDED, payload: shapesAmount });
};

export const animationUpdated = (shapesAmount) => (dispatch) => {
  dispatch({ type: ANIMATION_UPDATED, payload: shapesAmount });
};
