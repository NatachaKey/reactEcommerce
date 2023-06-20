import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

const rootUrl = 'https://ecommerce-6kwa.onrender.com';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [userName, setUserName] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (userCredentials) => {
    setLoginLoading(true);
    try {
      const url = `${rootUrl}/api/v1/auth/login`;
      const response = await axios.post(url, userCredentials, {
        withCredentials: true,
      });
      console.log(response);
      setLoginLoading(false);
      return true;
    } catch (error) {
      const errorPayload =
        error instanceof AxiosError ? error.response.data : error;
      console.error(errorPayload);
      setLoginLoading(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const user = { email, password };
    const success = await handleLogin(user);
    if (success) {
      setEmail('');
      setPassword('');
      setRedirectToHome(true);
    }
  };

  if (redirectToHome) {
    return <Redirect to='/' />;
  }

  if (loginLoading) {
    return <span>Logging in...</span>;
  }

  return (
    <div>
      {userName && <p>Welcome {userName}!</p>}
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
};

export default Login;
