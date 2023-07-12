import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useUserContext } from "../context/user_context";
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-with-circle.svg'
import './styles.css';
import { authApi } from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const { setCurrentUser } = useUserContext();

  const handleLogin = async (userCredentials) => {
    setLoginLoading(true);
    try {
      const loggedInUser = await authApi.login(userCredentials);

      console.log(loggedInUser);
      setLoginLoading(false);
      return loggedInUser;
    } catch (_error) {
      setLoginLoading(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const user = { email, password };
    const loggedInUser = await handleLogin(user);
    if (loggedInUser) {
      setEmail('');
      setPassword('');
      setCurrentUser(loggedInUser);
      setRedirectToHome(true);
    }
  };

  if (redirectToHome) {
    return <Redirect to="/" />;
  }
  if (loginLoading) {
    return <span>Logging in...</span>;
  }

  return (
    <div className='center'>
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email </label>
          <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
        </div>
        <div>
          <label>Password </label>
          <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
        </div>
        {/* <button type="submit">Login</button> */}
        <button type="submit" className='crudbtn' >
    <span>Login</span>
    <ArrowIcon />
</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
    </div>
  );
};

export default Login;
