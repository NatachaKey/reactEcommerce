import apiClient from "./client";

async function createOrder(order) {
  return apiClient
    .post("/orders", order)
    .then((response) => response?.data?.order);
}

const orderApi = {
  createOrder,
};

export default orderApi;
