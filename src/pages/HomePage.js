import React from 'react';
import { FeaturedProducts, Hero, Services, Contact } from '../components';
import AddProduct from './AddProduct';
import { useUserContext } from "../context/user_context";

const HomePage = () => {
  const { currentUser } = useUserContext();

  const isAdminLoggedIn = currentUser?.role === 'admin';
  return (
    <main>
      <Hero />

      {isAdminLoggedIn && <AddProduct />}
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
