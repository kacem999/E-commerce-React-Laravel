import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"; // Added missing imports
import ProductCard from "../components/ProductCard";

export default function CategoryPage({ cart, setCart }) {
  const { categoryName } = useParams();
  const [ProductsList, setProductsList] = useState([]);

  // Decode and normalize the category name
  const decodedCategory = categoryName ? decodeURIComponent(categoryName).toLowerCase() : '';

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setProductsList(data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  // Filter products by category
  const filteredProducts = ProductsList.filter(product =>
    product.category.toLowerCase() === decodedCategory
  );

  // Fixed handleClick to match the logic from Products component
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

  return (
    <div className="category-page">
      <h1>Category: {categoryName ? decodeURIComponent(categoryName) : 'All Categories'}</h1>
      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => {
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
          })
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}