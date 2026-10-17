import {useState, useCallback, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";

import Header from "./components/Header";
import FilterInputs from "./components/FilterInputs";
import Cards from "./components/Cards";
import Pagination from "./components/Pagination";

import data from "./data.json";

export default function App() {
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  // Responsive cards per page
  const [cardsPerPage, setCardsPerPage] = useState(() =>
    window.innerWidth >= 1024 ? 21 : 20,
  );

  // Update cards per page when screen size changes
  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(window.innerWidth >= 1024 ? 21 : 20);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFilterChange = useCallback((results) => {
    setFilteredData(results);
    setCurrentPage(1);
  }, []);

  const totalPages = Math.ceil(filteredData.length / cardsPerPage);

  // Keep current page valid when filtering or resizing
  useEffect(() => {
    setCurrentPage((page) => Math.min(page, Math.max(1, totalPages)));
  }, [totalPages]);

  const startIndex = (currentPage - 1) * cardsPerPage;

  const currentCards = filteredData.slice(
    startIndex,
    startIndex + cardsPerPage,
  );

  return (
    <BrowserRouter>
      <div dir="rtl" data-theme="light" className="min-h-dvh bg-[#F3F5F9]">
        <Header />

        <div className="flex">
          <h1 className="container mx-auto px-4 text-xl font-bold text-[#394295] lg:text-3xl pt-6">
            دليل المستشفيات المتعاقدة مع شركة التأمين الطبي
          </h1>
        </div>

        <main className="flex justify-center py-6 md:px-8">
          <div className="container flex flex-col gap-4 px-4">
            <FilterInputs onFilterChange={handleFilterChange} />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[#394295] md:text-2xl">
                دليل مقدمي الخدمات الطبية
              </h2>

              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
                عدد النتائج: {filteredData.length}
              </span>
            </div>

            {/* Responsive number of cards per page */}
            <Cards data={currentCards} />

            {filteredData.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredData.length}
                itemsPerPage={cardsPerPage}
              />
            )}
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
