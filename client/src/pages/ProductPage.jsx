import { useParams } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts";
import RelatedProducts from "../components/RelatedProducts";
import { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

export default function ProductPage({ cart, setCart }) {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products/")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        setProductsList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const { id } = useParams();
  const productId = parseInt(id, 10);
  const product = !isNaN(productId)
    ? productsList.find(p => p.id === productId)
    : undefined;

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!product) return <div className="not-found">Product not found.</div>;

  const isInCart = cart.some(item => item.id === product.id);
  const cartItem = cart.find(item => item.id === product.id) || { quantity: 0 };

  // Generate mock images for demonstration
  const productImages = [
    product.image,
    product.image.replace(/\/\d+\.jpg$/, '/2.jpg'),
    product.image.replace(/\/\d+\.jpg$/, '/3.jpg')
  ].filter(img => img !== product.image);

  function handleAddToCart() {
    if (isInCart) {
      setCart(cart.filter(item => item.id !== product.id));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  }

  function handleQuantityChange(newQuantity) {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  }

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

  return (
    <div className="product-page-container">
      <main className="product-page-main">
        <div className="breadcrumb">
          <a href="/products" className="back-link">
            <IoIosArrowBack /> Back to Products
          </a>
        </div>

        <div className="product-page">
          <div className="product-gallery">
            <div className="thumbnail-images">
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img || product.image}
                  alt={`${product.title} view ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                  onError={(e) => {
                    e.target.src = product.image;
                    e.target.style.opacity = '0.5';
                  }}
                />
              ))}
            </div>
            <div className="main-image">
              <img
                src={productImages[selectedImage] || product.image}
                alt={product.title}
                onError={(e) => {
                  e.target.src = product.image;
                }}
              />
            </div>
          </div>

          <div className="product-details">
            <h1 className="product-title">{product.title}</h1>
            
            <div className="product-meta">
              <div className="rating-container">
                {renderRatingStars(product.rating?.rate || 0)}
                <span className="rating-count">({product.rating?.count || 0} reviews)</span>
              </div>
              <span className="product-category">{product.category}</span>
            </div>

            <div className="price-container">
              <span className="current-price">${product.price}</span>
              {product.price > 50 && (
                <span className="discount-badge">Save 20%</span>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-actions">
              {isInCart ? (
                <div className="in-cart-actions">
                  <button 
                    onClick={() => handleAddToCart()}
                    className="remove-from-cart-btn"
                  >
                    Remove from Cart
                  </button>
                  <span className="in-cart-message">
                    ({cartItem.quantity} in cart)
                  </span>
                </div>
              ) : (
                <>
                  <div className="quantity-selector">
                    <button 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(quantity + 1)}>
                      +
                    </button>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    className="add-to-cart-btn"
                  >
                    Add to Cart
                  </button>
                </>
              )}
            </div>

            <div className="product-specs">
              <div className="spec-item">
                <span className="spec-label">Category:</span>
                <span className="spec-value">{product.category}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Availability:</span>
                <span className="spec-value in-stock">In Stock</span>
              </div>
            </div>
          </div>
        </div>

        <FeaturedProducts productsList={productsList} />
        <RelatedProducts product={product} cart={cart} setCart={setCart} />
      </main>
    </div>
  );
}