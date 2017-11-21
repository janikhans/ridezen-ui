import * as types from './actionTypes';

const initialState = {
  open: false,
  type: null,
  props: {}
};

function modalReducer (state = initialState, action) {
  switch (action.type) {
    case types.SHOW_MODAL:
      return {
        ...state,
        open: true,
        type: action.payload.type,
        props: action.payload.props
      };
    case types.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}

export default modalReducer;