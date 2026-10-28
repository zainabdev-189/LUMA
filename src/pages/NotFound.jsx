import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found page-section">
      <p className="eyebrow">404</p>
      <h1>Nothing here.</h1>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/" className="primary-btn dark">
        BACK HOME →
      </Link>
    </section>
  );
}