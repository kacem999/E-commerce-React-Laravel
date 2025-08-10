import { useNavigate, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState,useEffect } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
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
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const autoComplete = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };
  
  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={autoComplete}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}>{product.title}</Link>
            </li>
          ))}
        </ul>
      )}
      <button type="submit" aria-label="Search">
        <FaSearch />
      </button>
    </form>
  );
}
