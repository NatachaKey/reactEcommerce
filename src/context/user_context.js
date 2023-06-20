import React, { useContext, useReducer, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  CURRENT_USER_FETCHED,
  LOGIN_BEGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS, LOGOUT_BEGIN,
  LOGOUT_ERROR, LOGOUT_SUCCESS,
  REGISTER_BEGIN,
  REGISTER_ERROR,
  REGISTER_SUCCESS
} from "../actions";
import auth_reducer from "../reducers/user_reducer";

// Since this rootURL is used throughout the app, it might make sense to instead have a file for "Constants" that can be imported wherever needed
const rootUrl = "https://ecommerce-6kwa.onrender.com";

const initialState = {
  authLoading: false,
  authError: null,
  currentUser: null
};

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(auth_reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      const url = `${rootUrl}/api/v1/users/showMe`;
      axios.get(url)
        .then(response => {
          console.log(response);
          dispatch({type: CURRENT_USER_FETCHED, payload: response.data.user});
        }).catch(error => {
          const errorPayload = error instanceof AxiosError ? error.response.data : error;
          console.error(errorPayload)
        })
    }
    fetchData();
    // By using empty array [], for the "dependencies" argument of useEffect, it tells React to run this useEffect hook only *once*, the first time this component/context is rendered
  }, [])

  const handleLogin = async (userCredentials) => {
    dispatch({ type: LOGIN_BEGIN });
    try {
      const url = `${rootUrl}/api/v1/auth/login`;
      // We could use fetch or axios. Fetch is native to the browser (doesn't need extra libs), but since we already have axios in use in this repo, I'll stick to using that. It's a little bit cleaner too than raw fetch, but either one is fine.
      const response = await axios.post(url, userCredentials);
      console.log(response)
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
      return true;
    } catch (error) {
      console.error(error);
      const errorPayload = error instanceof AxiosError ? error.response.data : error;
      dispatch({ type: LOGIN_ERROR, payload: errorPayload });
      return false;
    }
  }

  const handleRegister = async (userCredentials) => {
    dispatch({ type: REGISTER_BEGIN });
    try {
      const url = `${rootUrl}/api/v1/auth/register`;
      const response = await axios.post(url, userCredentials);
      console.log(response)
      dispatch({ type: REGISTER_SUCCESS, payload: response.data.user });
      return true;
    } catch (error) {
      console.error(error);
      const errorPayload = error instanceof AxiosError ? error.response.data : error;
      dispatch({ type: REGISTER_ERROR, payload: errorPayload });
      return false;
    }
  }
  
  const handleLogout = async () => {
    dispatch({ type: LOGOUT_BEGIN });
    try {
      const url = `${rootUrl}/api/v1/auth/logout`;
      const response = await axios.get(url);
      console.log(response)
      dispatch({ type: LOGOUT_SUCCESS, payload: response.data });
      return true;
    } catch (error) {
      console.error(error);
      const errorPayload = error instanceof AxiosError ? error.response.data : error;
      dispatch({ type: LOGOUT_ERROR, payload: errorPayload });
      return false;
    }
  }
  
  return (
    <UserContext.Provider value={{ handleLogin, handleRegister, handleLogout, authState }}>{children}</UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
