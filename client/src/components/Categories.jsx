import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
export default function Categories() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once; remove this line if you want repeat
        }
      },
      { threshold: 0.1 } // Adjust this for when to trigger (0 = any part, 1 = fully visible)
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  const categories = [
    {
      name: "Electronics",
      image: "/assets/Images/airforce.jpg",
      path: "/category/electronics"
    },
    {
      name: "Women's Clothing",
      image: "/assets/Images/airforce.jpg",
      path: "/category/women's clothing"
    },
    {
      name: "Accessories",
      image: "/assets/Images/airforce.jpg",
      path: "/category/accessories"
    },
    {
      name: "Men's Clothing",
      image: "/assets/Images/airforce.jpg",
      path: "/category/Men's clothing"
    },
    {
      name: "New Arrivals",
      image: "/assets/Images/airforce.jpg",
      path: "/category/New arrivals"
    }
  ];

  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link 
              to={category.path} 
              className="category-card" 
              key={index}
            >
              <div className="category-image-container">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="category-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/placeholder-category.jpg';
                  }}
                />
                <div className="category-overlay"></div>
              </div>
              <h3 className="category-title">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}