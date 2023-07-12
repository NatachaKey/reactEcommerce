import React, { useState } from 'react';
import './styles.css';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-with-circle.svg'
import { productApi } from '../api';

const UpdateProduct = ({ product, onUpdate }) => {
  const [updatedProductData, setUpdatedProductData] = useState({...product});
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productResponse = await productApi.updateProduct(product.id, updatedProductData);
      console.log('Product updated successfully:', productResponse);
      setMessage('Product updated successfully');
      setUpdatedProductData(productResponse)
      onUpdate()
    } catch (error) {
      console.log('Error updating product:', error);
    }
  };

  return (
    <div className='center'>
    <div >
      <h3>Update Product</h3>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Name </label>
          <div>
          <input
            type="text"
            value={updatedProductData.name}
            onChange={(e) => setUpdatedProductData({...updatedProductData, name: e.target.value})}
          />
          </div>
        </div>
        <div>
          <label>Price </label>
          <div>
          <input
            type="number"
            value={updatedProductData.price}
            onChange={(e) => setUpdatedProductData({ ...updatedProductData, price: e.target.value })}
          />
          </div>
        </div>
        <div>
          <label>Description </label>
          <div>
          <textarea
            value={updatedProductData.description}
            onChange={(e) => setUpdatedProductData({ ...updatedProductData, description: e.target.value })}
          ></textarea>
          </div>
        </div>
        <div>
          <label>Category </label>
          <select
            value={updatedProductData.category}
            onChange={(e) => setUpdatedProductData({ ...updatedProductData, category: e.target.value })}
          >
            <option value="">Select Category</option>
            <option value="necklace">necklace</option>
            <option value="ring">ring</option>
            <option value="earrings">earrings</option>
          </select>
        </div>
        <div>
          <label>Company </label>
          <select value={updatedProductData.company} onChange={(e) => setUpdatedProductData({ ...updatedProductData, company: e.target.value })}>
            <option value="">Select Company</option>
            <option value="Suarez">Suarez</option>
            <option value="Tiffany">Tiffany</option>
            <option value="Cartier">Cartier</option>
          </select>
        </div>
        <div>
          <label>Featured </label>
          <input
            type="checkbox"
            checked={updatedProductData.featured}
            onChange={(e) => setUpdatedProductData({ ...updatedProductData, featured: e.target.checked })}
          />
        </div>
        <div>
          <label>Free Shipping </label>
          <input
            type="checkbox"
            checked={updatedProductData.freeShipping}
            onChange={(e) => setUpdatedProductData({ ...updatedProductData, freeShipping: e.target.checked })}
          />
        </div>
        <div>
          <label>Inventory </label>
          <div>
          <input
            type="number"
            value={updatedProductData.inventory}
            onChange={(e) => setUpdatedProductData({ ...updatedProductData, inventory: e.target.value })}
          />
          </div>
        </div>
        {/* <button type="submit" onClick={handleSubmit}>
          Update Product
        </button> */}
        <button type="submit" className='crudbtn' onClick={handleSubmit}>
    <span>Update Product</span>
    <ArrowIcon />
</button>
      </form>
      <p>
        <b>
          <em>{message}</em>
        </b>
      </p>
    </div>
    </div>
  );
};

export default UpdateProduct;
