import { NavLink, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FiShoppingCart, FiUser, FiChevronDown, FiChevronUp } from "react-icons/fi";
import SearchBar from "./SearchBar";

export default function Header({ cart }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const categories = [
    { id: 1, name: "Electronics", slug: "electronics" },
    { id: 2, name: "Jewelery", slug: "jewelery" },
    { id: 3, name: "Men's Clothing", slug: "men's clothing" },
    { id: 4, name: "Women's Clothing", slug: "women's clothing" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setIsMobileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="top-bar">
        <p>Free shipping on orders over $50 | 30-day return policy</p>
      </div>
      
      <nav className="navbar">
        {/* Mobile menu button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle menu"
        >
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
        </button>

        {/* Logo */}
        <Link to="/" className="logo">
          <img src="public/assets/Images/logo.png" alt="Company Logo" />
        </Link>
        <div className="mobile-search-bar">
          <SearchBar />
        </div>
        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/products" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Products
            </NavLink>
          </li>
          <li 
            className="dropdown-container"
            ref={dropdownRef}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <NavLink
              className={({ isActive }) => isActive ? "nav-link" : "nav-link"}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              Categories
              {isDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
            </NavLink>

            {isDropdownOpen && (
              <div className="dropdown-menu" role="menu">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                    role="menuitem"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Search Bar */}
        <SearchBar className="desktop-search-bar" />

        {/* User Actions */}
        <div className="user-actions">
          <NavLink to="/account" className="account-link" aria-label="Account">
            <FiUser />
          </NavLink>
          
          <NavLink to="/cart" className="cart-link" aria-label="Cart">
            <FiShoppingCart />
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </NavLink>
        </div>
        
        <div className="desktop-auth-buttons">
          <Link to="/connect" className="login-btn">Login</Link>
          <Link to="/connect" className="signup-btn">Sign Up</Link>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
          ref={mobileMenuRef}
        >
          <div className="mobile-search">
            <SearchBar />
          </div>
          <ul>
            <li>
              <NavLink 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/products" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </NavLink>
            </li>
            <li className="mobile-dropdown">
              <button 
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                aria-expanded={isMobileDropdownOpen}
                aria-haspopup="true"
              >
                Categories {isMobileDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {isMobileDropdownOpen && (
                <div className="mobile-dropdown-menu" role="menu">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      onClick={() => {
                        setIsMobileDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      role="menuitem"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            <li>
              <NavLink 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="mobile-search">
            <SearchBar />
          </div>
          <div className="mobile-auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}