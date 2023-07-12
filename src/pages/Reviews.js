import React, { useState } from 'react';
import { useUserContext } from "../context/user_context";
import { reviewApi } from '../api';

const Reviews = ({ productId, reviews, onReviewChange }) => {
  // Fetch current user from context provider, and store it in the `user` variable
  const { currentUser: user } = useUserContext();
  //console.log(user.userId); //user id

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    rating: '',
    title: '',
    comment: '',
    product: productId
  });

  const createReview = async (productId) => {
    try {
      await reviewApi.createReview(formData);
      setFormData({
        rating: '',
        title: '',
        comment: '',
        product: productId,
      });

      setMessage('Review created successfully');
      onReviewChange();
    } catch (error) {
      console.error(error);
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        setMessage(error.response.data.msg)
      } else {
        setMessage('Check all the fields');
      }
    }
  };

  const updateReview = async (reviewId, productId) => {
    try {
      await reviewApi.updateReview(reviewId, formData)
      setFormData({
        rating: Number,
        title: '',
        comment: '',
        product: productId,
      });
      setMessage('Review updated successfully');
      onReviewChange();
    } catch (error) {
      console.error(error);
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        setMessage(error.response.data.msg)
      } else {
        setMessage('Could not update review - Check all the fields');
      }
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await reviewApi.deleteReview(reviewId);
      setMessage('Review deleted successfully');
      onReviewChange();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div>
        <p style={{ color: 'red', textAlign: 'center' }}>
          <b>
            <em>{message}</em>
          </b>
        </p>
        <h3>Create Review</h3>
        <p>
          <em>Max. one review per product</em>
        </p>
        <label htmlFor="rating">Rating:</label>
        <div>
        <input
          type="number"
          name="rating"
          min={1}
          max={5}
          value={formData.rating}
          onChange={handleInputChange}
        /></div>
        <label htmlFor="title">Title:</label>
        <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        /></div>
        <label htmlFor="comment">Comment:</label>
        <div>
        <input
          type="text"
          name="comment"
          value={formData.comment}
          onChange={handleInputChange}
        /></div>

        <button className='create' onClick={() => createReview(productId)}>Create review</button>
      </div>
      <div>
        <h5> Read all the reviews about this product:</h5>
        {reviews.map((review) => (
          <div key={review._id}>
            <h6>{review.title}</h6>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
<hr />
            {user && (review.user === user.userId) && (
              <>
                <button className='change' onClick={() => updateReview(review._id, productId)}>
                  Update my review
                </button>
                <div>
                 <button className='delete' onClick={() => deleteReview(review._id)}>Delete my review</button> 
                </div>
                
                
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
