import React, { useState } from 'react';
import { useCartContext } from '../context/cart_context';
import './styles.css';
import { useUserContext } from "../context/user_context";
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-with-circle.svg'
import { formatPrice } from '../utils/helpers';
import { orderApi } from '../api';

const Orders = () => {
  const { currentUser } = useUserContext();
  const [message, setMessage] = useState('');

  const user = currentUser;

  const { cart, total_amount, shipping_fee, taxRate } = useCartContext();
  const tax = (total_amount * taxRate).toFixed(2);
  const roundedTax = parseFloat(tax);
  const [order, setOrder] = useState(null);

  // Possibly you'd want to use the `clearCart` function from the cart context to clear the cart after a successful order?
  const handleCheckout = async () => {
    const orderToPost = {
      tax: roundedTax,
      shippingFee: shipping_fee,
      subtotal: total_amount,
      total: total_amount + shipping_fee + roundedTax,
      items: cart,
      user: user.userId,
      clientSecret: 'randomString',
    };

    try {
      const successfulOrder = await orderApi.createOrder(orderToPost);

      setOrder(successfulOrder);
      console.log('Order added successfully:', successfulOrder);
      setMessage(`Order added successfully`);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="center">
      <div className="space">
        <h4>Cart Items:</h4>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                Product: {item.name} (quantity: {item.amount}) * ${item.price}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space">
        <h4>Order Summary:</h4>
        <p>Tax: {formatPrice(tax)}</p>
        <p>Shipping Fee: {formatPrice(shipping_fee)}</p>
        <p>Total: {formatPrice(total_amount + shipping_fee + roundedTax)}</p>
      </div>

      <div>
        {!order && (
          <button type="submit" className="crudbtn" onClick={handleCheckout}>
            <span>Place Order</span>
            <ArrowIcon />
          </button>
        )}
        <p style={{ color: 'red' , textTransform: 'uppercase' }}>{message}</p>
      </div>

      {order && (
        <div className='space'>
          <h4>Order Confirmation:</h4>
          <p>Order ID: {order._id}</p>
          <p>Status: {order.status}</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
