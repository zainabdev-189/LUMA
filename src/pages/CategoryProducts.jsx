import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCategoryProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const LIMIT = 12;

function titleCase(value) {
  return value
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function CategoryProducts({ addToCart }) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const skip = (page - 1) * LIMIT;

    getCategoryProducts(category, LIMIT, skip)
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category, page]);

  return (
    <section className="page-section">
      <div className="breadcrumb">
        <Link to="/categories">Collections</Link>
        <span>/</span>
        <span>{titleCase(category)}</span>
      </div>

      <div className="catalog-header">
        <div>
          <p className="eyebrow">LUMA / COLLECTION</p>
          <h1>{titleCase(category)}</h1>
        </div>
        <p>{total} pieces</p>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && products.length === 0 && (
        <div className="empty-state">No products found in this collection.</div>
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