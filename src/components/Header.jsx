import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header({ cartCount }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submitSearch(event) {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) return;

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <header className="header">
      <div className="header-inner">
        <button
          className="mobile-menu"
          onClick={() => setSearchOpen((value) => !value)}
          aria-label="Toggle search"
        >
          {searchOpen ? "×" : "⌕"}
        </button>

        <nav className="desktop-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/categories">Collections</NavLink>
        </nav>

        <Link to="/" className="logo">
          LUMA
        </Link>

        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={() => setSearchOpen((value) => !value)}
            aria-label="Search"
          >
            Search
          </button>

          <Link to="/cart" className="cart-link">
            Bag <span>{cartCount}</span>
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="search-bar">
          <form onSubmit={submitSearch}>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
            />
            <button type="submit">SEARCH →</button>
          </form>
        </div>
      )}
    </header>
  );
}