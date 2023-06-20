import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

const rootUrl = 'https://ecommerce-6kwa.onrender.com';

const Logout = () => {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const url = `${rootUrl}/api/v1/auth/logout`;
      const response = await axios.get(url);
      console.log(response);
      setLogoutLoading(false);
      return true;
    } catch (error) {
      const errorPayload =
        error instanceof AxiosError ? error.response.data : error;
      console.error(errorPayload);
      setLogoutLoading(false);
      return false;
    }
  };

  if (redirectToHome) {
    return <Redirect to='/' />;
  }

  if (logoutLoading) {
    return <span>Logging you out...</span>;
  }

  return (
    <div>
      <h4>If you want to log out please press the button</h4>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
