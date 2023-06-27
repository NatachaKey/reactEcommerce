import React, { useState , useEffect } from 'react';
import axios , { AxiosError } from 'axios';
import styled from 'styled-components';
import './styles.css';

const rootUrl = 'https://ecommerce-6kwa.onrender.com';

const UpdatePassword = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  //fetch user id
  useEffect(() => {
    async function fetchData() {
      const url = `${rootUrl}/api/v1/users/showMe`;
      axios
        .get(url, { withCredentials: true })
        .then((response) => {
          console.log(response);
          setCurrentUser(response?.data?.user);
        })
        .catch((error) => {
          const errorPayload =
            error instanceof AxiosError ? error?.response?.data : error;
          console.error(errorPayload);
        });
    }
    fetchData();
  }, []);

  const user = currentUser;

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
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 74 74"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="37"
                    cy="37"
                    r="35.5"
                    stroke="black"
                    stroke-width="3"
                  ></circle>
                  <path
                    d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                    fill="black"
                  ></path>
                </svg>
              </button>
          </form>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;