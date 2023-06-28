import React, { useEffect, useState } from 'react';
import { useCartContext } from '../context/cart_context';
import './styles.css';
import axios, { AxiosError } from 'axios';
const rootUrl = 'https://ecommerce-6kwa.onrender.com';

const Orders = () => {

  //fetch current user
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const url = `${rootUrl}/api/v1/users/showMe`;
      axios
        .get(url, { withCredentials: true })
        .then((response) => {
          setCurrentUser(response?.data?.user);
        })
        .catch((error) => {
          const errorPayload =
            error instanceof AxiosError ? error?.response?.data : error;
          console.error(errorPayload);
        });
    }
    fetchData();
  }, []);
const user= currentUser;

//SINGLE ITEM ORDER




//WHOLE ORDER CHECKOUT

  const { cart, clearCart } = useCartContext();
  const { total_amount, shipping_fee } = useCartContext();
   const [tax, setTax] = useState(10);
  
  const [order, setOrder] = useState(null);

  const handleCheckout = async () => {
   
        try {
          const response = await axios.post(
            'https://ecommerce-6kwa.onrender.com/api/v1/orders',
            {
              tax,
              shippingFee: shipping_fee,
              subtotal: total_amount,
              total: total_amount + shipping_fee + tax,
              items: cart,
              user: user.userId,
              clientSecret: 'randomString',
            },
            { withCredentials: true },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
      
          if (response.status === 200) {
            const data = response.data;
           // setOrder(data.order);
          } else {
            console.error('Error:', response.status);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
 
  return (
    <div className="center ">
      <div className="space">
        <h4>Cart Items:</h4>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                
                Product: {item.name} (  quantity: {item.amount} ) * ${item.price}
                
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space">
        <h4>Order Summary:</h4>
        <p>Tax: ${tax}</p>
        <p>Shipping Fee: ${shipping_fee}</p>
        <p>Total: ${total_amount + shipping_fee + tax}</p>
      </div>

      <div>
        {/* <button onClick={handleCheckout}>Place Order</button> */}
        <button type="submit" className="crudbtn" onClick={handleCheckout}>
          <span>Place Order</span>
          <svg
            width="34"
            height="34"
            viewBox="0 0 74 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="37"
              cy="37"
              r="35.5"
              stroke="black"
              stroke-width="3"
            ></circle>
            <path
              d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
              fill="black"
            ></path>
          </svg>
        </button>
      </div>

      {order && (
        <div>
          <h3>Order Confirmation:</h3>
          <p>Order ID: {order._id}</p>
          <p>Status: {order.status}</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
