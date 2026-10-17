import {useState, useMemo, useEffect} from "react";
import data from "../data.json";

const filterFields = [
  {key: "provider", label: "مقدم الخدمة", field: "مقدم الخدمة"},
  {key: "type", label: "نوع مقدم الخدمة", field: "نوع مقدم الخدمة"},
  {key: "governorate", label: "المحافظة", field: "المحافظة"},
  {key: "area", label: "المنطقة", field: "المنطقة"},
  {key: "specialty", label: "التخصص", field: "التخصص"},
];

const initialFilters = {
  provider: "",
  type: "",
  governorate: "",
  area: "",
  specialty: "",
};

const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

function getSearchableText(value) {
  if (value == null) return "";

  if (Array.isArray(value)) {
    return value.map(getSearchableText).join(" ");
  }

  if (typeof value === "object") {
    return Object.values(value).map(getSearchableText).join(" ");
  }

  return String(value);
}

export default function FilterInputs({onFilterChange}) {
  const [filters, setFilters] = useState(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");

  const filterOptions = useMemo(() => {
    const options = {};

    filterFields.forEach(({key, field}) => {
      options[key] = [
        ...new Set(
          data.map((item) => String(item[field] ?? "").trim()).filter(Boolean),
        ),
      ].sort((a, b) => a.localeCompare(b, "ar"));
    });

    return options;
  }, []);

  const filteredData = useMemo(() => {
    const query = normalize(searchTerm);

    return data.filter((item) => {
      const matchesFilters = filterFields.every(({key, field}) => {
        const selectedValue = filters[key];

        if (!selectedValue) return true;

        return normalize(item[field]) === normalize(selectedValue);
      });

      if (!matchesFilters) return false;

      if (query) {
        const searchableText = normalize(getSearchableText(item));

        if (!searchableText.includes(query)) return false;
      }

      return true;
    });
  }, [filters, searchTerm]);

  useEffect(() => {
    onFilterChange(filteredData);
  }, [filteredData, onFilterChange]);

  const handleFilterChange = (key, value) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({...initialFilters});
    setSearchTerm("");
  };

  return (
    <section
      dir="rtl"
      className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:p-6"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#394295] md:text-xl">
            البحث وتصفية مقدمي الخدمات
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            استخدم البحث والفلاتر معًا لتحديد النتائج.
          </p>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-[#394295] transition hover:bg-gray-50"
        >
          إعادة تعيين
        </button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <label
          htmlFor="provider-search"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          البحث عن مقدم الخدمة
        </label>

        <div className="relative">
          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          <input
            id="provider-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="ابحث بالاسم أو العنوان أو الهاتف أو التخصص..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-12 pl-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#394295] focus:ring-2 focus:ring-[#394295]/10"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {filterFields.map(({key, label}) => (
          <div key={key} className="min-w-0">
            <label
              htmlFor={`filter-${key}`}
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              {label}
            </label>

            <select
              id={`filter-${key}`}
              value={filters[key]}
              onChange={(event) => handleFilterChange(key, event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-800 outline-none transition focus:border-[#394295] focus:ring-2 focus:ring-[#394295]/10"
            >
              <option value="">الكل</option>

              {filterOptions[key].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4 text-sm text-gray-500">
        عدد النتائج المطابقة:{" "}
        <span className="font-bold text-[#394295]">{filteredData.length}</span>
      </div>
    </section>
  );
}
