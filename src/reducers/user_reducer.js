import {
  LOGIN_BEGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_BEGIN,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  REGISTER_BEGIN,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from '../actions';

const user_reducer = (state, action) => {
  if (
    action.type === LOGIN_BEGIN ||
    action.type === REGISTER_BEGIN ||
    action.type === LOGOUT_BEGIN
  ) {
    return { ...state, authLoading: true };
  }

  if (
    action.type === LOGIN_ERROR ||
    action.type === REGISTER_ERROR ||
    action.type === LOGOUT_ERROR
  ) {
    return { ...state, authLoading: false, authError: action.payload };
  }

  if (action.type === LOGIN_SUCCESS || action.type === REGISTER_SUCCESS) {
    return { ...state, authLoading: false, currentUser: action.payload };
  }

  if (action.type === LOGOUT_SUCCESS) {
    return { ...state, authLoading: false, currentUser: null };
  }
};

export default user_reducer;
