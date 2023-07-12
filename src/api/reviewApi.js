import apiClient from "./client";

async function createReview(review) {
    return apiClient.post("/reviews", review).then(response => response?.data?.review)
}

async function updateReview(reviewId, review) {
    return apiClient.patch(`/reviews/${reviewId}`, review).then(response => response?.data?.review);
}

async function deleteReview(reviewId) {
    return apiClient.delete(`/reviews/${reviewId}`).then(response => response?.data);
}

const reviewApi = {
    createReview,
    updateReview,
    deleteReview
};

export default reviewApi;