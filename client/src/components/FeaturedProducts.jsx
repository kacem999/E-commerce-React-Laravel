import React, { useState } from 'react';

export default function FeaturedProducts() {
  const productsList = [
    {
      img: "src/assets/Images/male-model-with-t-shirt-mockup.jpg",
      name: "Product A",
      desc: "A very useful item",
      price: 100,
    },
    {
      img: "src/assets/Images/male-model-with-t-shirt-mockup.jpg",
      name: "Product B",
      desc: "Another great product",
      price: 150,
    },
    {
      img: "src/assets/Images/male-model-with-t-shirt-mockup.jpg",
      name: "Product C",
      desc: "Yet another product",
      price: 200,
    },
    {
      img: "src/assets/Images/male-model-with-t-shirt-mockup.jpg",
      name: "Product D",
      desc: "Premium quality item",
      price: 250,
    },
    {
      img: "src/assets/Images/male-model-with-t-shirt-mockup.jpg",
      name: "Product E",
      desc: "Premium quality item",
      price: 250,
    },
    {
      img: "src/assets/Images/male-model-with-t-shirt-mockup.jpg",
      name: "Product F",
      desc: "Premium quality item",
      price: 250,
    },
    {
      img: "src/assets/Images/male-model-with-t-shirt-mockup.jpg",
      name: "Product G",
      desc: "Premium quality item",
      price: 250,
    },
    {
      img: "src/assets/Images/male-model-with-t-shirt-mockup.jpg",
      name: "Product H",
      desc: "Premium quality item",
      price: 250,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % productsList.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + productsList.length) % productsList.length
    );
  };

  const visibleProducts = [];
  for (let i = 0; i < visibleCount; i++) {
    const index = (currentIndex + i) % productsList.length;
    visibleProducts.push(productsList[index]);
  }

  function handleClick(productName) {
    console.log(`Explore clicked for ${productName}`);
  }

  return (
    <>
      <h1>Featured Products</h1>
      <div className="featured-products">
      <button className="LeftBut" onClick={prevSlide}> <img src="./src/assets/icons/left-arrow.png" alt="" /></button>
        {visibleProducts.map((product, index) => (
          <div className="featured-product-card" key={index}>
            <img src={product.img} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.desc}</p>
            <p>${product.price}</p>
            <button onClick={() => handleClick(product.name)}>Explore</button>
          </div>
        ))}
        <button className="RightBut" onClick={nextSlide}><img src="./src/assets/icons/arrow-right.png" alt="" /></button>
      </div>
    </>
  );
}
