import {
  ANIMATION_STOPPED,
  ANIMATION_SUCCEEDED,
  ANIMATION_STARTING,
  ANIMATION_UPDATED,
} from "../../types/animation";

const initialState = {
  loading: false,
  shapesAmount: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ANIMATION_STOPPED:
      return {
        ...state,
        loading: false,
      };
    case ANIMATION_STARTING:
      return {
        ...state,
        loading: true,
      };
    case ANIMATION_SUCCEEDED:
      return {
        loading: false,
        shapesAmount: action.payload,
      };
    case ANIMATION_UPDATED:
      return {
        loading: false,
        shapesAmount: action.payload,
      };
    default:
      return state;
  }
}
