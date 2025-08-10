import { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";

export default function RelatedProducts({ product, cart, setCart }) {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    fetch("https://fakestoreapi.com/products/")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(data => {
        if (isMounted) {
          setProductsList(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          console.error("Failed to fetch products", err);
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  const related = useMemo(() => {
    if (!product) return [];
    return productsList.filter(
      (item) => item.category === product.category && item.id !== product.id
    );
  }, [productsList, product]);

  function handleAddToCart(prod) {
    const existingItem = cart.find((item) => item.id === prod.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...prod, quantity: 1 }]);
    }
  }

  if (loading) return <div className="loading-spinner">Loading related products...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!product) return <div className="error-message">Invalid product reference.</div>;

  return (
    <div className="related-products">
      <h2>Related Products</h2>

      {related.length === 0 ? (
        <p className="no-related">No related products found.</p>
      ) : (
        <div className="products-list">
          {related.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              cart={cart}
              setCart={setCart}
              handleClick={handleAddToCart}
              isInCart={cart.some((item) => item.id === p.id)}
              cartItem={cart.find((item) => item.id === p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
