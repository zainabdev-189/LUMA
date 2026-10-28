import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const editorialImage =
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=90";

const secondaryImage =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=90";

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts(8, 0)
      .then((data) => setProducts(data.products))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero">
        <img src={editorialImage} alt="LUMA editorial collection" />
        <div className="hero-shade"></div>

        <div className="hero-content">
          <p className="eyebrow">LUMA / AUTUMN WINTER 2026</p>
          <h1>
            The new
            <br />
            everyday.
          </h1>
          <p className="hero-description">
            Considered pieces for a life lived beautifully.
          </p>

          <Link to="/categories" className="primary-btn">
            EXPLORE COLLECTION <span>→</span>
          </Link>
        </div>

        <div className="hero-side-label">01 / 04</div>
      </section>

      <section className="manifesto section">
        <div>
          <p className="eyebrow">LUMA OBJECTS</p>
        </div>
        <h2>
          Less noise.
          <br />
          More intention.
        </h2>
        <p>
          LUMA is a considered edit of objects, essentials and details for
          modern living. Discover pieces chosen for their form, function and
          quiet character.
        </p>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 — THE EDIT</p>
            <h2>New arrivals</h2>
          </div>
          <Link to="/categories" className="text-link">
            View all →
          </Link>
        </div>

        {loading && <Loader />}
        {error && <ErrorMessage />}
        {!loading && !error && (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </section>

      <section className="editorial-split">
        <div className="editorial-image">
          <img src={secondaryImage} alt="LUMA fashion editorial" />
        </div>

        <div className="editorial-copy">
          <p className="eyebrow">02 — EDITORIAL</p>
          <h2>Made to exist beyond the moment.</h2>
          <p>
            From personal essentials to considered objects, LUMA brings
            together pieces that feel relevant today and remain beautiful
            tomorrow.
          </p>
          <Link to="/categories" className="outline-btn">
            EXPLORE THE EDIT →
          </Link>
        </div>
      </section>

      <section className="quote-section">
        <p className="quote-mark">“</p>
        <h2>
          Beauty doesn't have
          <br />
          to be loud.
        </h2>
        <p>LUMA — modern essentials, thoughtfully selected.</p>
      </section>
    </>
  );
}