export default function ErrorMessage({ message = "Unable to load this page." }) {
  return (
    <div className="error-message">
      <p>{message}</p>
      <button onClick={() => window.location.reload()} className="outline-btn">
        Try again
      </button>
    </div>
  );
}