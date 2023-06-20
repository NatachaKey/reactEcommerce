import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const rootUrl = 'https://ecommerce-6kwa.onrender.com';

const Logout = () => {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const { handleLogout } = useUserContext();

  // const handleLogout = async () => {
  //   try {
  //     const url = `${rootUrl}/api/v1/auth/logout`;
  //     const response = await fetch(url);
  //
  //     if (response.ok) {
  //       console.log("Logout successful");
  //       setRedirectToHome(true);
  //     } else {
  //       console.log("Logout failed");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (redirectToHome) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <h4>If you want to log out please press the button</h4>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
