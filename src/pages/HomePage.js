import React from "react";
import { FeaturedProducts, Hero, Services, Contact } from "../components";
import AddProduct from "./AddProduct";
import { useUserContext } from "../context/user_context";

const HomePage = () => {
  const { authState } = useUserContext();
  const isAdminLoggedIn = authState.currentUser?.role === "admin";
  // need to check here if user.role === 'admin'- show <AddProduct/> component

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
