import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
export default function SearchPage() {
  const [params] = useSearchParams();
  const [products, setProducts] = useState([]);
  const query = params.get("q");

  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
      });
  }, []);
  useEffect(() => {
    if (typeof query === "string" && query.trim() !== "") {
      setResults(
        products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setResults([]);
    }
  }, [products, query]);
  return (
    <div className="container">
      <h1>Results for "{query}"</h1>
      <div className="products-list">
        {results.length > 0 ? (
          results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No results found.</p>
        )}
        
      </div>
    </div>
  );
}
