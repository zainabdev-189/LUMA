import { Link } from "react-router-dom";

function formatCategory(category) {
  return category
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-wrap">
        <img src={product.thumbnail} alt={product.title} className="product-image" />
        <span className="quick-view">VIEW</span>
      </Link>

      <div className="product-info">
        <div>
          <p className="product-category">{formatCategory(product.category)}</p>
          <Link to={`/product/${product.id}`} className="product-name">
            {product.title}
          </Link>
        </div>

        <div className="product-bottom">
          <span>${product.price.toFixed(2)}</span>
          <button
            className="add-btn"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.title} to bag`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}