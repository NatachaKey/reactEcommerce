import React, { useState } from 'react';
import './styles.css';
import { useProductsContext } from "../context/products_context";
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-with-circle.svg'
import { productApi } from '../api';

const emptyProduct = {
  name: '',
  price: '',
  description: '',
  image: '',
  imageFile: undefined,
  category: '',
  company: '',
  featured: false,
  freeShipping: false,
  inventory: 15
}

const AddProduct = () => {
  const { addProduct } = useProductsContext();
  const [productData, setProductData] = useState(emptyProduct);
  const [message, setMessage] = useState(''); //message 'product'added'

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setMessage('');
      
      const imageResponse = await productApi.uploadProductImage(productData.imageFile)

      const product = { ...productData, image: imageResponse.data.image }
      
      const addedProduct = await addProduct(product);

      if (addedProduct) {
        setMessage(`Product added successfully`);
        // Reset form fields
        setProductData(emptyProduct)
        // Reset image file input
        e.target.elements["imageInput"].value = ''
      }
    } catch (e) {
      setMessage(e.message)
    }
  };

  return (
    <div className="center">
      <div>
        <h3>Add Product</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name </label>
            <div>
              <input
                className="inputbox"
                type="text"
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label>Price </label>
            <div>
              <input
                type="number"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label>Description </label>
            <div>
              <textarea
                value={productData.description}
                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
              ></textarea>
            </div>
          </div>
          <div>
            <label>Image </label>
            <input name="imageInput" type="file" onChange={(e) => setProductData({ ...productData, imageFile: e.target.files[0] })} />
          </div>
          <div>
            <label>Category </label>
            <select
              value={productData.category}
              onChange={(e) => setProductData({ ...productData, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="necklace">necklace</option>
              <option value="ring">ring</option>
              <option value="earrings">earrings</option>
            </select>
          </div>
          <div>
            <label>Company </label>
            <select
              value={productData.company}
              onChange={(e) => setProductData({ ...productData, company: e.target.value })}
            >
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
              checked={productData.featured}
              onChange={(e) => setProductData({ ...productData, featured: e.target.checked })}
            />
          </div>
          <div>
            <label>Free Shipping </label>
            <input
              type="checkbox"
              checked={productData.freeShipping}
              onChange={(e) => setProductData({ ...productData, freeShipping: e.target.checked })}
            />
          </div>
          <div>
            <label>Inventory </label>
            <div>
              <input
                type="number"
                value={productData.inventory}
                onChange={(e) => setProductData({ ...productData, inventory: e.target.value })}
              />
            </div>
          </div>

          {/* <button type="submit">Add Product</button> */}
          <button type="submit" className="crudbtn">
            <span>Add Product</span>
            <ArrowIcon />
          </button>
          <p>
            <b>
              <em> {message}</em>
            </b>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
