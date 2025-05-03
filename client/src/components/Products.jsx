export default function Products(){
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
          name: "Product B",
          desc: "Another great product",
          price: 150,
        },
        {
          img: "src/assets/Images/male-model-with-t-shirt-mockup.jpg",
          name: "Product B",
          desc: "Another great product",
          price: 150,
        },
        {
          img: "src/assets/Images/male-model-with-t-shirt-mockup.jpg",
          name: "Product B",
          desc: "Another great product",
          price: 150,
        },
        {
          img: "src/assets/Images/male-model-with-t-shirt-mockup.jpg",
          name: "Product B",
          desc: "Another great product",
          price: 150,
        }
      ];

      const products = productsList.map((product, index) => (
        <div className="product-card" key={index}>
          <img src={product.img} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.desc}</p>
          <p>${product.price}</p>
          <button onClick={() => handleClick(product.name)}>Explore</button>
        </div>
      ))
    return (
        <div className="products">
        <h1>Products</h1>
            <div className="products-list">
            {products}
            </div>
        </div>
    )
}