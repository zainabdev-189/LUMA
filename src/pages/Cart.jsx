import { Link } from "react-router-dom";

export default function Cart({ cart, updateQuantity, removeFromCart }) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="page-section cart-page">
      <div className="page-intro compact">
        <p className="eyebrow">LUMA / YOUR BAG</p>
        <h1>Your selections.</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your bag is currently empty.</h2>
          <p>Discover something considered for your everyday.</p>
          <Link to="/categories" className="primary-btn dark">
            EXPLORE COLLECTION →
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <Link to={`/product/${item.id}`} className="cart-image">
                  <img src={item.thumbnail} alt={item.title} />
                </Link>

                <div className="cart-item-info">
                  <p className="product-category">{item.category}</p>
                  <Link to={`/product/${item.id}`} className="product-name">
                    {item.title}
                  </Link>
                  <span>${item.price.toFixed(2)}</span>

                  <div className="quantity-row">
                    <div className="quantity">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <p className="eyebrow">SUMMARY</p>
            <div>
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <hr />
            <div className="total-row">
              <span>Total</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <button
              className="add-to-bag"
              onClick={() =>
                alert("Checkout is a demo feature in this project.")
              }
            >
              CHECKOUT <span>→</span>
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}