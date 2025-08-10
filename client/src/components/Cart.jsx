export default function Cart({ cart, setCart }) {
    const [ProductsList, setProductsList] = useState([]);
    

    

    return (
        <div className="cart">
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.title} />
                        <div className="cart-item-info">
                            <h2>{item.title}</h2>
                            <p>${item.price}</p>
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}