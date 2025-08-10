import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Products from "../components/Products";
import Categories from "../components/Categories";
import { useState } from "react";
export default function Home({cart, setCart, ProductsList, setProductsList}) {

  return (
    
      <div className="container">
      <main>
      <FeaturedProducts ProductsList={ProductsList} setProductsList={setProductsList} />
      <Categories />
      <Products cart={cart} setCart={setCart} />
      </main>
      </div>
    
  );
}