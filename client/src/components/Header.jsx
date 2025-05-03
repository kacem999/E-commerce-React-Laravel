import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <img src="./src/assets/Images/LOGO-BLANC.png" alt="logo" />
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/categories">Categories</a>
          </li>
          <li>
            <a href="/about">About us</a>
          </li>
          <li>
            <a href="/contact">Contact us</a>
          </li>
        </ul>
        <div className="search-bar">
          <button type="submit">
            <img src="./src/assets/icons/search-loop.png" alt="search" />
          </button>
          <input type="text" placeholder="Search" />
        </div>

        <a href="/cart">
          <img src="./src/assets/icons/shopping-cart.png" alt="cart" />
        </a>
        <div className="auth-buttons">
          <button className="log">Sign Up</button>
          <div className="separator" />
          <button className="log">Login</button>
        </div>
        
      </nav>
    </header>
  );
}
