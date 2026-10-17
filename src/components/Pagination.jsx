export default function Pagination({currentPage, totalPages, onPageChange}) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    if (totalPages <= 7) {
      return Array.from({length: totalPages}, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = getPages();

  const buttonBase =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition";

  const normalButton =
    "border-gray-200 bg-white text-gray-700 hover:border-[#394295] hover:text-[#394295]";

  const activeButton = "border-[#394295] bg-[#394295] text-white shadow-sm";

  const disabledButton =
    "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-400";

  return (
    <nav
      dir="rtl"
      aria-label="التنقل بين صفحات النتائج"
      className="flex w-full justify-center rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:p-5"
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${buttonBase} ${
            currentPage === 1 ? disabledButton : normalButton
          }`}
        >
          السابق
        </button>

        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1 text-gray-400"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-label={`الصفحة ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={`${buttonBase} ${
                currentPage === page ? activeButton : normalButton
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${buttonBase} ${
            currentPage === totalPages ? disabledButton : normalButton
          }`}
        >
          التالي
        </button>
      </div>
    </nav>
  );
}
