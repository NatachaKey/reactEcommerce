import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './styles.css';
import { useUserContext } from "../context/user_context";
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-with-circle.svg'
import { authApi } from '../api';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const { setCurrentUser } = useUserContext();

  const handleRegister = async (userCredentials) => {
    setRegisterLoading(true);
    try {
      const registeredUser = await authApi.register(userCredentials);

      console.log(registeredUser);
      setCurrentUser(registeredUser);
      setRegisterLoading(false);
      return true;
    } catch (_error) {
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
    return <Redirect to="/" />;
  }
  
  if (registerLoading) {
    return <span>Registering...</span>;
  }

  return (
    <div className='center'>
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name </label>
          <div>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          </div>
        </div>
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
          <label>Password</label>
          <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
        </div>
        {/* <button type="submit">Register</button> */}
        <button type="submit" className='crudbtn' >
    <span>Register</span>
    <ArrowIcon />
</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
    </div>
  );
};

export default Register;
