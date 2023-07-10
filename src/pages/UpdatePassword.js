import React, { useState } from 'react';
import axios  from 'axios';
import './styles.css';
import { useUserContext } from "../context/user_context";
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-with-circle.svg'

const rootUrl = 'https://ecommerce-6kwa.onrender.com';

const UpdatePassword = () => {
  const { currentUser } = useUserContext();
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const url = `${rootUrl}/api/v1/users/updateUserPassword`;

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      setMessage('Please provide both values');
      return;
    }
    handleUpdate();
  };


  const handleUpdate = async () => {
    setUpdateLoading(true);

    try {
      const response = await axios.patch(
        url,
        {
          oldPassword,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );

      setUpdateLoading(false);
      setMessage('Success! Password updated!');
    } catch (error) {
      setUpdateLoading(false);
      setMessage('Update failed');
    }
  };

  return (
    <div className="left underline ">
      {currentUser && (
        <div className='align'>
          <h3>Update Password</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Old Password</label>
              <div>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              </div>
            </div>
            <div>
              <label>New Password</label>
              <div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              </div>
            </div>


            <button type="submit" className="crudbtn right  ">
                <span>{updateLoading ? 'Updating...' : 'Update Password'}</span>
                <ArrowIcon />
              </button>
          </form>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
