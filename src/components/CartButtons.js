import React , { useState, useEffect }from 'react';
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Link, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { useProductsContext } from '../context/products_context';
import { useCartContext } from '../context/cart_context';
import axios, { AxiosError } from 'axios';

const rootUrl = 'https://ecommerce-6kwa.onrender.com';


//vart-btn-wrapper- global class- see in Navbar.js it is display none on a default screen, nested class in NavContainer = styled...
const CartButtons = () => {
  const { closeSidebar } = useProductsContext(); // extracting the closeSidebar function from the returned object from useProductsContext() and assigning it to a variable named closeSidebar.

  const { total_items } = useCartContext();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const url = `${rootUrl}/api/v1/users/showMe`;
      axios
        .get(url, { withCredentials: true })
        .then((response) => {
          console.log(response);
          setCurrentUser(response.data.user);
        })
        .catch((error) => {
          const errorPayload =
            error instanceof AxiosError ? error.response.data : error;
          console.error(errorPayload);
        });
    }
    fetchData();
    // By using empty array [], for the "dependencies" argument of useEffect, it tells React to run this useEffect hook only *once*, the first time this component/context is rendered
  }, []);

  return (
    <Wrapper className="cart-btn-wrapper">
{!currentUser && (
  <Link to='/login' className='cart-btn'>
          <span>
            <FaUserPlus />
          </span>
          </Link>
      )}

{currentUser && (
    <Link to='/logout' className='cart-btn'>
    <span>{currentUser?.name}</span>
    <span>
      <FaUserMinus />
    </span>
  </Link>
)}

      <Link to='/cart' className='cart-btn' onClick={closeSidebar}>
        Cart
        <span className='cart-container'>
          <FaShoppingCart />
          <span className='cart-value'>{total_items}</span>
        </span>
      </Link>
      
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 150px;


  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.2rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
  
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default CartButtons;
