import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        const featured = data
          .filter(product => product.rating?.rate > 4)
          .sort((a, b) => b.rating.rate - a.rating.rate);
        setFeaturedProducts(featured);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const maxIndex = Math.max(0, featuredProducts.length - visibleCount);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    return stars;
  };

  if (loading) return <div className="loading-spinner">Loading featured products...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (featuredProducts.length === 0) return <div className="no-products">No featured products found</div>;

  return (
    <section className="featured-products-section">
      <div className="section-header">
        <h2>Featured Products</h2>
        <div className="navigation-arrows">
          <button onClick={prevSlide} className="nav-arrow" aria-label="Previous products">
            <FaChevronLeft />
          </button>
          <button onClick={nextSlide} className="nav-arrow" aria-label="Next products">
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="featured-products-container">
        <div
          className="featured-products-slider"
          style={{
            display: 'flex',
            transition: 'transform 0.5s ease',
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
          }}
        >
          {featuredProducts.map((product) => (
            <div className="featured-product-card" key={product.id} style={{ flex: `0 0 ${100 / visibleCount}%` }}>
              <div className="product-badge">Featured</div>
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="featured-product-image">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    onError={(e) => { e.target.src = '/placeholder-product.jpg'; }}
                  />
                </div>
                <div className="feat-product-info">
                  <h3 className="feat-product-title">{product.title}</h3>
                  <div className="feat-product-rating">
                    {renderRatingStars(product.rating?.rate || 0)}
                    <span>({product.rating?.count || 0})</span>
                  </div>
                  <p className="feat-product-price">${product.price}</p>
                </div>
              </Link>
              <Link to={`/product/${product.id}`} className="explore-button">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
