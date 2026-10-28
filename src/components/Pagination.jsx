export default function Pagination({ page, total, limit, onPageChange }) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      <button
        className="page-arrow"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ←
      </button>

      <div className="page-numbers">
        {pages.map((number) => (
          <button
            key={number}
            className={number === page ? "page-number active" : "page-number"}
            onClick={() => onPageChange(number)}
          >
            {String(number).padStart(2, "0")}
          </button>
        ))}
      </div>

      <button
        className="page-arrow"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        →
      </button>
    </div>
  );
}