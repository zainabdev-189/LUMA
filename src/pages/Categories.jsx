import { useEffect, useState } from "react";
import { getCategories } from "../services/api";
import CategoryCard from "../components/CategoryCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="page-section categories-page">
      <div className="page-intro">
        <p className="eyebrow">LUMA / COLLECTIONS</p>
        <h1>Explore the edit.</h1>
        <p>
          Browse the world of LUMA by collection. Select a category to discover
          every available piece.
        </p>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      )}
    </section>
  );
}