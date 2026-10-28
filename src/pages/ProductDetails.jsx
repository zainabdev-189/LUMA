import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../services/api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function formatCategory(category = "") {
  return category
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getProduct(id)
      .then(setProduct)
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) return <Loader />;
  if (error || !product) return <ErrorMessage message="Product not found." />;

  const images = product.images?.length
    ? product.images
    : [product.thumbnail];

  return (
    <section className="product-detail page-section">
      <div className="breadcrumb">
        <Link to="/categories">Collections</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`}>
          {formatCategory(product.category)}
        </Link>
        <span>/</span>
        <span>{product.title}</span>
      </div>

      <div className="detail-layout">
        <div className="detail-gallery">
          <div className="detail-main-image">
            <img src={images[activeImage]} alt={product.title} />
          </div>

          {images.length > 1 && (
            <div className="thumbnail-row">
              {images.map((image, index) => (
                <button
                  key={image}
                  className={index === activeImage ? "thumb active" : "thumb"}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt={`${product.title} view ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <p className="eyebrow">{formatCategory(product.category)}</p>
          <h1>{product.title}</h1>

          <div className="detail-price">${product.price.toFixed(2)}</div>

          <div className="rating">
            <span>★ {product.rating.toFixed(1)}</span>
            <span>{product.reviews?.length || 0} reviews</span>
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-meta">
            <div>
              <span>Brand</span>
              <strong>{product.brand || "LUMA Selection"}</strong>
            </div>
            <div>
              <span>Availability</span>
              <strong>{product.availabilityStatus}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <strong>{product.shippingInformation}</strong>
            </div>
          </div>

          <button className="add-to-bag" onClick={() => addToCart(product)}>
            ADD TO BAG <span>→</span>
          </button>

          <div className="accordion">
            <details>
              <summary>Product details</summary>
              <p>
                SKU: {product.sku}
                <br />
                Weight: {product.weight}
                <br />
                Minimum order quantity: {product.minimumOrderQuantity}
              </p>
            </details>

            <details>
              <summary>Returns & warranty</summary>
              <p>
                {product.returnPolicy}
                <br />
                {product.warrantyInformation}
              </p>
            </details>
          </div>
        </div>
      </div>

      {product.reviews?.length > 0 && (
        <section className="reviews-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CUSTOMER NOTES</p>
              <h2>Reviews</h2>
            </div>
          </div>

          <div className="reviews-grid">
            {product.reviews.map((review, index) => (
              <article className="review-card" key={`${review.reviewerName}-${index}`}>
                <div>{"★".repeat(review.rating)}</div>
                <p>“{review.comment}”</p>
                <span>{review.reviewerName}</span>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}