import apiClient from "./client";

async function login(userCredentials) {
  return apiClient
    .post("/auth/login", userCredentials)
    .then((response) => response?.data?.user);
}

async function logout() {
  return apiClient.get("/auth/logout").then((response) => response?.data);
}

async function register(userCredentials) {
  return apiClient
    .post("/auth/register", userCredentials)
    .then((response) => response?.data?.user);
}

const authApi = {
  login,
  logout,
  register,
};

export default authApi;
