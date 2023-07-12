import apiClient from "./client";

async function updateUser(user) {
  return apiClient
    .patch("/users/updateUser", user)
    .then((response) => response?.data?.user);
}

async function updatePassword(oldPassword, newPassword) {
  return apiClient
    .patch("/users/updateUserPassword", { oldPassword, newPassword })
    .then((response) => response?.data);
}
async function getCurrentUser() {
  return apiClient
    .get("/users/showMe")
    .then((response) => response?.data?.user);
}

const userApi = {
  updateUser,
  updatePassword,
  getCurrentUser,
};

export default userApi;
