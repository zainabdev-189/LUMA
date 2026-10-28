import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const LIMIT = 12;

export default function SearchResults({ addToCart }) {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!query) {
      setProducts([]);
      setTotal(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    searchProducts(query, LIMIT, (page - 1) * LIMIT)
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [query, page]);

  return (
    <section className="page-section">
      <div className="catalog-header">
        <div>
          <p className="eyebrow">LUMA / SEARCH</p>
          <h1>Results for “{query}”</h1>
        </div>
        <p>{total} pieces</p>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage />}

      {!loading && !error && products.length === 0 && (
        <div className="empty-state">
          No pieces matched your search. Try another word.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="product-grid catalog-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>

          <Pagination
            page={page}
            total={total}
            limit={LIMIT}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
}