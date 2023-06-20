import React, { useState } from 'react';
import axios from 'axios';

//get error when adding a product- even if i login as admin
//this component is seen by everyone but should be visible only to admin
const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [colors, setColors] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  const [inventory, setInventory] = useState(15);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // instantiate a 'form-data' object in the browser to upload the image file
    formData.set('image', image);
    const imageResponse = await axios.post(
      'https://ecommerce-6kwa.onrender.com/api/v1/products/uploadImage',
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    console.dir(imageResponse);

    const product = {
      name,
      price,
      description,
      image: imageResponse.data.image,
      category,
      company,
      colors,
      featured,
      freeShipping,
      inventory,
    };

    try {
      const response = await axios.post(
        'https://ecommerce-6kwa.onrender.com/api/v1/products',
        product,
        { withCredentials: true }
      );
      console.log('Product added successfully:', response.data);
      // Reset form fields
      setName(response.data.name);
      setPrice(response.data.price);
      setDescription(response.data.description);
      setImage(response.data.image);
      setCategory(response.data.category);
      setCompany(response.data.company);
      setColors(response.data.colors);
      setFeatured(response.data.featured);
      setFreeShipping(response.data.freeShipping);
      setInventory(response.data.inventory);
    } catch (error) {
      console.log('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Image</label>
          <input type='file' onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=''>Select Category</option>
            <option value='office'>Office</option>
            <option value='kitchen'>Kitchen</option>
            <option value='bedroom'>Bedroom</option>
          </select>
        </div>
        <div>
          <label>Company</label>
          <select value={company} onChange={(e) => setCompany(e.target.value)}>
            <option value=''>Select Company</option>
            <option value='ikea'>IKEA</option>
            <option value='liddy'>Liddy</option>
            <option value='marcos'>Marcos</option>
          </select>
        </div>
        <div>
          <label>Colors</label>
          <input
            type='text'
            value={(colors || []).join(',')}
            onChange={(e) => setColors(e.target.value.split(','))}
          />
        </div>
        <div>
          <label>Featured</label>
          <input
            type='checkbox'
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
        </div>
        <div>
          <label>Free Shipping</label>
          <input
            type='checkbox'
            checked={freeShipping}
            onChange={(e) => setFreeShipping(e.target.checked)}
          />
        </div>
        <div>
          <label>Inventory</label>
          <input
            type='number'
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
          />
        </div>

        <button type='submit'>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
