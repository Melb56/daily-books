import Link from "next/link";
import "@/styles/components/home/pagination.scss"

function getPaginationRange(currentPage, totalPages, delta = 2) {
  if (totalPages <= 1) return [1];

  const range = [];
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  range.push(1);

  if (left > 2) range.push("…");

  for (let i = left; i <= right; i++) range.push(i);

  if (right < totalPages - 1) range.push("…");

  range.push(totalPages);

  return range;
}

export default function Pagination({
  currentPage,
  totalPages,
  selectedCategory = "Tous",
  delta = 2,
}) {
  if (totalPages <= 1) return null;

  const pages = getPaginationRange(currentPage, totalPages, delta);
  const cat = encodeURIComponent(selectedCategory);

  return (
    <nav className="pagination" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          className="pagination__link"
          href={`/?category=${cat}&page=${currentPage - 1}`}
          aria-label="Page précédente"
        >
          ←
        </Link>
      ) : (
        <span className="pagination__link pagination__link--disabled">
          ←
        </span>
      )}

      {pages.map((item, idx) =>
        item === "…" ? (
          <span key={`ellipsis-${idx}`} className="pagination__ellipsis">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={`/?category=${cat}&page=${item}`}
            className={`pagination__page ${
              item === currentPage ? "pagination__page--active" : ""
            }`}
            aria-current={item === currentPage ? "page" : undefined}
          >
            {item}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          className="pagination__link"
          href={`/?category=${cat}&page=${currentPage + 1}`}
          aria-label="Page suivante"
        >
          →
        </Link>
      ) : (
        <span className="pagination__link pagination__link--disabled">
          →
        </span>
      )}
    </nav>
  );
}
