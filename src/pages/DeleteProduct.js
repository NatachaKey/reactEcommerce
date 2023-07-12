import React, { useState } from 'react';
import './styles.css';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-with-circle.svg'
import { productApi } from '../api';

// should use the onDelete to do something on `SingleProductPage` when the delete is successful
// eg: redirect back to product list page, and maybe refetch the products so we no longer see the deleted product.
// or if you don't want to redirect them away, at least hiding the "add to cart" and "update product" inputs/buttons once a produc thas been deleted
const DeleteProduct = ({ productId, onDelete }) => {
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await productApi.deleteProduct(productId);
      console.log('Product deleted successfully:', response);
      setMessage('Product deleted successfully');
      onDelete(); // Callback to notify the parent component about the deletion
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  };

  return (
    <div className='center'>
      <div>
      <h3>Delete Product</h3>
      {/* <button onClick={handleDelete}>Delete Product</button> */}
      <button type="submit" className='crudbtn' onClick={handleDelete}>
    <span>Delete Product</span>
    <ArrowIcon />
</button>
      <p>
        <b>
          <em>{message}</em>
        </b>
      </p>
      </div>
    </div>
  );
};

export default DeleteProduct;
