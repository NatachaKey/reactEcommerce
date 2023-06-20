import React, { useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

// Since this rootURL is used throughout the app, it might make sense to instead have a file for "Constants" that can be imported wherever needed
const rootUrl = 'https://ecommerce-6kwa.onrender.com';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const url = `${rootUrl}/api/v1/users/showMe`;
      axios
        .get(url, { withCredentials: true })
        .then((response) => {
          console.log(response);
          setCurrentUser(response.data.user);
        })
        .catch((error) => {
          const errorPayload =
            error instanceof AxiosError ? error.response.data : error;
          console.error(errorPayload);
          setAuthError(errorPayload);
        });
    }
    fetchData();
    // By using empty array [], for the "dependencies" argument of useEffect, it tells React to run this useEffect hook only *once*, the first time this component/context is rendered
  }, []);

  const handleLogin = async (userCredentials) => {
    setAuthLoading(true);
    try {
      const url = `${rootUrl}/api/v1/auth/login`;
      // We could use fetch or axios. Fetch is native to the browser (doesn't need extra libs), but since we already have axios in use in this repo, I'll stick to using that. It's a little bit cleaner too than raw fetch, but either one is fine.
      const response = await axios.post(url, userCredentials, {
        withCredentials: true,
      });
      console.log(response);
      setAuthLoading(false);
      setCurrentUser(response.data.user);
      return true;
    } catch (error) {
      console.error(error);
      const errorPayload =
        error instanceof AxiosError ? error.response.data : error;
      setAuthLoading(false);
      setAuthError(errorPayload);
      return false;
    }
  };

  const handleRegister = async (userCredentials) => {
    setAuthLoading(true);
    try {
      const url = `${rootUrl}/api/v1/auth/register`;
      const response = await axios.post(url, userCredentials, {
        withCredentials: true,
      });
      console.log(response);
      setCurrentUser(response.data.user);
      setAuthLoading(false);
      return true;
    } catch (error) {
      console.error(error);
      const errorPayload =
        error instanceof AxiosError ? error.response.data : error;
      setAuthError(errorPayload);
      setAuthLoading(false);
      return false;
    }
  };

  const handleLogout = async () => {
    setAuthLoading(true);
    try {
      const url = `${rootUrl}/api/v1/auth/logout`;
      const response = await axios.get(url);
      console.log(response);
      setCurrentUser(null);
      setAuthLoading(false);
      return true;
    } catch (error) {
      console.error(error);
      const errorPayload =
        error instanceof AxiosError ? error.response.data : error;
      setAuthError(errorPayload);
      setAuthLoading(false);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        handleLogin,
        handleRegister,
        handleLogout,
        currentUser,
        authLoading,
        authError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
