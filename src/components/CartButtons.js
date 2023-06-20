import React, { useState } from "react";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";

//vart-btn-wrapper- global class- see in Navbar.js it is display none on a default screen, nested class in NavContainer = styled...
const CartButtons = () => {
  const { closeSidebar } = useProductsContext(); // extracting the closeSidebar function from the returned object from useProductsContext() and assigning it to a variable named closeSidebar.
  const { authState } = useUserContext();


  return (
    <Wrapper className="cart-btn-wrapper">
      <Link to="/login" className="cart-btn">
        <span>{authState.currentUser?.name}</span>
        {!authState.currentUser && (
          <span>
            <FaUserPlus />
          </span>
        )}
      </Link>

      {authState.currentUser && (<Link to="/logout" className="cart-btn">
        <span>
          <FaUserMinus />
        </span>
      </Link>)}

      <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
        <span>
          Cart <FaShoppingCart />
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
      //margin-left:0 px;
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
