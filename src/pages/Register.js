import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const { handleRegister, authLoading, authError } = useUserContext();

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

  if (authLoading) {
    return <span>Registering...</span>;
  }

  if (authError) {
    return <span>Encountered error registering</span>;
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
