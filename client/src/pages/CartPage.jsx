import { Link } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import {Coupons} from "../Data/Coupons"
import { useState, useEffect } from "react";
import { use } from "react";
export default function CartPage({ cart, setCart }) {
  const [total, setTotal] = useState(0);
  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
  useEffect(() => {
    setTotal(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, [cart]);
  const handleQuantityChange = (id, amount) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        )
    );
  };
  const handleApplyCoupon = () => {
    const couponCode = document.querySelector('input[placeholder="Enter coupon code"]').value;
    const coupon = Coupons.find(c => c.code === couponCode && c.isActive);
    if (coupon) {
      setTotal(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * (coupon ? (1 - coupon.value / 100) : 1));
    } else {
      console.log('Invalid coupon code');
    }
  };

  return (
    <div className="container">
    <main>
    <div className="cart-container">
      <h1 className="cart-title">Your Shopping Cart</h1>

      <div className="cart-content">
        {cart.length > 0 ? (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image-container">
                    <Link to={`/product/${item.id}`}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="cart-item-image"
                        loading="lazy"
                      />
                    </Link>
                  </div>

                  <div className="cart-item-details">
                    <Link to={`/product/${item.id}`} className="cart-item-link">
                      <h3 className="cart-item-title">{item.title}</h3>
                    </Link>
                    <p className="cart-item-description">
                      {item.description.substring(0, 100)}...
                    </p>
                    <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                    
                    <div className="cart-item-quantity">
                      <button 
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-total">
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="remove-btn"
                      aria-label="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Estimated Shipping</span>
                <span>{total > 50 ? 'FREE' : '$5.99'}</span>
              </div>
              <div className="summary-row">
                <span>Add coupon</span>
                <input type="text" placeholder="Enter coupon code" />
                <button onClick={handleApplyCoupon}>Apply</button>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${(total > 50 ? total : total + 5.99).toFixed(2)}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
    </main>
    </div>
  );
}