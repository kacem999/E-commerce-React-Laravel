import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
export default function ProductCard({ product, cart, setCart, handleClick, isInCart, cartItem }) {

  function updateQuantity(productId, delta) {
    const updatedCart = cart
      .map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + delta) } // Ensure quantity doesn't go below 0
          : item
      ).filter(item => item.quantity > 0);
      
    setCart(updatedCart);
  }

  // Calculate discounted price
  const discountPercentage = 34;
  const discountedPrice = (product.price * (1 - discountPercentage/100)).toFixed(2);
function renderRatingStars(rating) {
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
  }

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isInCart: PropTypes.bool,
  cartItem: PropTypes.object
};

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} loading="lazy" />
        <span className="discount-badge">{discountPercentage}% OFF</span>
      </div>
      
      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-card-link">
          <h3 className="product-title">{product.title}</h3>
        </Link>
        
        <div className="price-container">
          <span className="original-price">${product.price}</span>
          <span className="discounted-price">${discountedPrice}</span>
        </div>
        
        {product.rating && (
          <div className="rating">
            {renderRatingStars(product.rating?.rate || 0)}
            <span className="rating-count">({product.rating.count})</span>
          </div>
        )}
      </div>
      
      <div className="product-actions">
        {isInCart ? (
  <div className="quantity-controls">
    <button 
      onClick={() => updateQuantity(product.id, -1)}
      disabled={!cartItem || cartItem.quantity < 1}
      className="quantity-btn"
    >
      −
    </button>
    <span className="quantity">{cartItem?.quantity ?? 1}</span>
    <button 
      onClick={() => updateQuantity(product.id, 1)}
      className="quantity-btn"
    >
      +
    </button>
  </div>
) : (
  <button 
    onClick={() => handleClick(product)}
    className="add-to-cart-btn"
  >
    Add to Cart
  </button>
)}

      </div>
    </div>
  );
}