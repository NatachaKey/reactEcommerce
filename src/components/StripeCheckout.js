import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useCartContext } from '../context/cart_context';


const CheckoutForm = () => {
   const { total_amount } = useCartContext();
  const handleToken = (token) => {
   
    // Send the token to your server for processing
    fetch('/orders/:id/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: total_amount, // ex. 1000= $10 (in cents)
        currency: 'USD',
        description: 'Payment for E-commerce purchase',
        token: token.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response from the server
        if (data.success) {
          console.log('Payment successful:', data.charge);
          // Perform additional actions (e.g., update order status)
        } else {
          console.log('Payment error:', data.error);
          // Display an error message to the user
        }
      })
      .catch((error) => {
        console.log('Payment error:', error);
        // Handle other network or server errors
      });
  };

  return (
    <StripeCheckout
      token={handleToken}
      stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
      amount={total_amount} // Example: $10 (in cents)
      currency="USD"
      name="E-commerce App"
      description="Payment for E-commerce purchase"
    />
  );
};

export default CheckoutForm;
