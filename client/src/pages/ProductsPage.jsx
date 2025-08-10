import { useParams } from "react-router-dom";
import Header from "../components/Header";
import FeaturedProducts from "../components/FeaturedProducts";
import RelatedProducts from "../components/RelatedProducts";
import { useState, useEffect } from "react";
import FilterArea from "../components/FilterArea";
import ProductCard from "../components/ProductCard";

export default function ProductsPage({ cart, setCart }) {
  // Fixed: Changed 'brands' to 'categories' to match your original Products component
  const [filters, setFilters] = useState({ categories: [], price: "", rating: "" });
  const [visibleCount, setVisibleCount] = useState(9);
  
  const [ProductsList, setProductsList] = useState([]);
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then(res => res.json())
      .then(data => setProductsList(data))
      .catch(err => console.error("Failed to fetch products", err));
  }, []);

  // Fixed: Updated handleClick to match the quantity-based logic from your Products component
  function handleClick(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    setVisibleCount(9);
  }

  // Fixed: Updated filter logic to match your original Products component
  const filteredProducts = ProductsList.filter(product => {
    // Fixed: Changed from 'brands' to 'categories' and added proper case-insensitive matching
    const matchCategory =
      filters.categories.length === 0 ||
      filters.categories.map(c => c.toLowerCase()).includes(product.category.toLowerCase());
    
    const price = product.price;
    const rating = product.rating?.rate || 0;
    
    const matchesRating =
      filters.rating === "" ||
      (filters.rating === "4-above" && rating >= 4) ||
      (filters.rating === "3-above" && rating >= 3);
    
    const matchesPrice =
      filters.price === "" ||
      (filters.price === "under-120" && price < 120) ||
      (filters.price === "120-150" && price >= 120 && price <= 150) ||
      (filters.price === "above-150" && price > 150);
    
    return matchCategory && matchesPrice && matchesRating;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="container">
    <main>
    <div className="product-container">
      <FilterArea onFilterChange={handleFilterChange} />
      <div className="products">
        <h1>Products</h1>
        <div className="products-list">
          {visibleProducts.map(product => {
            const cartItem = cart.find(item => item.id === product.id);
            const isInCart = !!cartItem;
            return (
              <ProductCard
                key={product.id}
                product={product}
                cart={cart}
                setCart={setCart}
                handleClick={handleClick}
                isInCart={isInCart}
                cartItem={cartItem}
              />
            );
          })}
        </div>
        {hasMore && (
          <div className="load-more-wrapper">
            <button onClick={() => setVisibleCount(prev => prev + 9)} className="load-more-button">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
    </main>
    </div>
  );
}