import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

const rootUrl = 'https://ecommerce-6kwa.onrender.com';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleRegister = async (userCredentials) => {
    setRegisterLoading(true);
    try {
      const url = `${rootUrl}/api/v1/auth/register`;
      const response = await axios.post(url, userCredentials, {
        withCredentials: true,
      });
      console.log(response);
      setRegisterLoading(false);
      return true;
    } catch (error) {
      const errorPayload =
        error instanceof AxiosError ? error.response.data : error;
      console.error(errorPayload);
      setRegisterLoading(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const user = { name, email, password };
    const success = await handleRegister(user);
    if (success) {
      setName('');
      setEmail('');
      setPassword('');
      setRedirectToHome(true);
    }
  };

  if (redirectToHome) {
    return <Redirect to='/' />;
  }

  if (registerLoading) {
    return <span>Registering...</span>;
  }

  return (
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <button type='submit'>Register</button>
      </form>
      <p>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};

export default Register;
