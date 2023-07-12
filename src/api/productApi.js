import apiClient from "./client";

async function getAllProducts() {
  return apiClient
    .get("/products")
    .then((response) => response?.data?.products);
}

async function getSingleProduct(productId) {
  return apiClient
    .get(`/products/${productId}`)
    .then((response) => response?.data?.product);
}

async function createProduct(product) {
  return apiClient
    .post("/products", product)
    .then((response) => response?.data?.product);
}

async function uploadProductImage(imageFile) {
  const formData = new FormData(); // instantiate a 'form-data' object in the browser to upload the image file
  formData.set("image", imageFile);
  return apiClient
    .post("/products/uploadImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response?.data?.image);
}

async function deleteProduct(productId) {
  return apiClient
    .delete(`/products/${productId}`)
    .then((response) => response?.data);
}

async function updateProduct(productId, product) {
  return apiClient
    .patch(`/products/${productId}`, product)
    .then((response) => response?.data?.product);
}

const productApi = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  uploadProductImage,
  deleteProduct,
  updateProduct,
};
export default productApi;
