import React, { useContext, useEffect, useState } from 'react'
import { userApi } from '../api';

async function fetchCurrentUser() {
  try {
    const currentUser = await userApi.getCurrentUser();
    return currentUser;
  } catch (error) {
    console.error('getCurrentUser failed')
  }
}

// Create the context object, and pass the initial/default value.
// In this case an object with the field `currentUser` and a value of `null`
const UserContext = React.createContext({ currentUser: null });

// Define the context "provider" (ie: the component <UserProvider>)
// The only prop we care about in this case is the React nested children (so that we can ensure that they are rendered by this component)
export const UserProvider = ({ children }) => {
  // lines 28-36: Using useEffect to request the current user from the backend when the context is first loaded/rendered
  // If a user is returned, then update the context state using `setCurrentState`
  // This value will now be available with `useUserContext` to any components nested within this `<UserProvider>` component
  // That means other components don't need to make extra requests to the `/showMe` endpoint since this context has already handled it
  const [currentUser, setCurrentUser] = useState(null);
  const fetchAndSetUser = async () => {
    const currentUser = await fetchCurrentUser();
    setCurrentUser(currentUser);
  }

  useEffect(() => {
    fetchAndSetUser();
    // By using empty array [], for the "dependencies" argument of useEffect, it tells React to run this useEffect hook only *once*, the first time this context is rendered
  }, []);

  const providerValue = { currentUser: currentUser, refetchUser: fetchAndSetUser, setCurrentUser: setCurrentUser};
  // value={providerValue} means that anything that is nested inside this context, will have access to the values in the `providerValue` object
  // {children} tells React to render, anything that was nested inside <UserProvider> component in the DOM
  return (
    <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>
  )
}
// also export a `useContext` helper so that components can easily access the data provided by the `UserContext` provider
export const useUserContext = () => {
  return useContext(UserContext)
}
