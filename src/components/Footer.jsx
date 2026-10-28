import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="newsletter">
        <p className="eyebrow">THE LUMA LETTER</p>
        <h2>Quiet things. Considered well.</h2>
        <p>
          Sign up for new arrivals, editorial stories and early access to
          selected collections.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.currentTarget.reset();
            alert("Thank you for joining LUMA.");
          }}
          className="newsletter-form"
        >
          <input type="email" placeholder="Your email address" required />
          <button type="submit">JOIN →</button>
        </form>
      </div>

      <div className="footer-grid">
        <div>
          <div className="footer-logo">LUMA</div>
          <p className="footer-copy">
            Modern objects and everyday essentials, selected with intention.
          </p>
        </div>

        <div>
          <p className="footer-title">Explore</p>
          <Link to="/">Home</Link>
          <Link to="/categories">Collections</Link>
          <Link to="/cart">Shopping bag</Link>
        </div>

        <div>
          <p className="footer-title">Information</p>
          <a href="#shipping">Shipping</a>
          <a href="#returns">Returns</a>
          <a href="#contact">Contact</a>
        </div>

        <div>
          <p className="footer-title">Follow</p>
          <a href="#instagram">Instagram</a>
          <a href="#pinterest">Pinterest</a>
          <a href="#journal">Journal</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} LUMA</span>
        <span>Designed for the everyday.</span>
      </div>
    </footer>
  );
}