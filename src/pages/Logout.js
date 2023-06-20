import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const Logout = () => {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const { handleLogout, authLoading, authError } = useUserContext();

  if (redirectToHome) {
    return <Redirect to='/' />;
  }

  if (authLoading) {
    return <span>Logging out...</span>;
  }

  if (authError) {
    return <span>Encountered error logging out</span>;
  }

  return (
    <div>
      <h4>If you want to log out please press the button</h4>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
