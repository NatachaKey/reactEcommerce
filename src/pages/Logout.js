import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import './styles.css';
import UpdatePassword from './UpdatePassword.js';
import { useUserContext } from "../context/user_context";
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-with-circle.svg'
import { authApi, userApi } from '../api';


//LOGOUT
const Logout = () => {
  const { currentUser, setCurrentUser } = useUserContext();
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [message, setMessage] = useState('');

  //UPDATE USER DATA
  const handleUpdate = async () => {
    setUpdateLoading(true);
    try {
      const user = {...currentUser};
      
      if (name) {
        user.name = name;
      }

      if (email) {
        user.email = email;
      }

      const updatedUser = await userApi.updateUser(user)

      console.log(updatedUser);
      setUpdateLoading(false);
      setMessage('Update successful');
      setCurrentUser(updatedUser)
    } catch (error) {
      console.error(error);
      setUpdateLoading(false);
      setMessage('Update failed, please check both fields');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name && !email) {
      setMessage('Please enter at least one field to update');
      return;
    }
    handleUpdate();
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const response = await authApi.logout();
      console.log(response);
      setLogoutLoading(false);
      setCurrentUser(null);
      setRedirectToHome(true); //added
      return true;
    } catch (_error) {
      setLogoutLoading(false);
      return false;
    }
  };

  if (redirectToHome) {
    return <Redirect to="/" />;
  }
  if (logoutLoading) {
    return <span>Logging you out...</span>;
  }



  return (
    <Wrapper>
      <div className="left underline ">
        {currentUser && (
          <div >
            <h3>Update User</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label>Email</label>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              {/* <button type="submit">
                {updateLoading ? 'Updating...' : 'Update User'}
              </button> */}

              <button type="submit" className="crudbtn">
                <span>{updateLoading ? 'Updating...' : 'Update User'}</span>
                <ArrowIcon />
              </button>
            </form>
            <p>{message}</p>
          </div>
        )}
      </div>
<hr/>
<UpdatePassword />
<div className='logoutbox'>
      <h3>To log out  press the button </h3>

      <button className="btn" onClick={handleLogout}>
        {' '}
        Logout
      </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 30px;
  background: var(--clr-primary-8);
  width: 100%;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--clr-primary-1);

  h4 {
    margin: 20px;
  }
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-6);
  }
`;

export default Logout;
