import {useState, useMemo, useEffect} from "react";
import data from "../data.json";
import ServiceProviderFilter from "./filters/ServiceProviderFilter";

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

// Check all selected filters except the specified dropdown.
function matchesFilters(item, filters, excludedKey = null) {
  return filterFields.every(({key, field}) => {
    if (key === excludedKey || !filters[key]) {
      return true;
    }

    return normalize(item[field]) === normalize(filters[key]);
  });
}

export default function FilterInputs({onFilterChange}) {
  const [filters, setFilters] = useState({...initialFilters});
  const [searchTerm, setSearchTerm] = useState("");

  // Each dropdown depends on all the other selected dropdowns.
  const filterOptions = useMemo(() => {
    const options = {};

    filterFields.forEach(({key, field}) => {
      const relatedData = data.filter((item) =>
        matchesFilters(item, filters, key),
      );

      options[key] = [
        ...new Set(
          relatedData
            .map((item) => String(item[field] ?? "").trim())
            .filter(Boolean),
        ),
      ].sort((a, b) => a.localeCompare(b, "ar"));
    });

    return options;
  }, [filters]);

  // Apply the selected filters and search query.
  const filteredData = useMemo(() => {
    const query = normalize(searchTerm);

    return data.filter((item) => {
      if (!matchesFilters(item, filters)) {
        return false;
      }

      if (query) {
        return normalize(getSearchableText(item)).includes(query);
      }

      return true;
    });
  }, [filters, searchTerm]);

  // Send the filtered results to the parent component.
  useEffect(() => {
    onFilterChange(filteredData);
  }, [filteredData, onFilterChange]);

  const handleFilterChange = (changedKey, value) => {
    setFilters((previous) => {
      const nextFilters = {
        ...previous,
        [changedKey]: value,
      };

      // Clear selections that no longer match the changed filter.
      let hasChanges = true;

      while (hasChanges) {
        hasChanges = false;

        for (const {key, field} of filterFields) {
          if (key === changedKey || !nextFilters[key]) {
            continue;
          }

          const hasCompatibleRecord = data.some(
            (item) =>
              normalize(item[field]) === normalize(nextFilters[key]) &&
              matchesFilters(item, nextFilters, key),
          );

          if (!hasCompatibleRecord) {
            nextFilters[key] = "";
            hasChanges = true;
          }
        }
      }

      return nextFilters;
    });
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
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#394295] md:text-xl">
            البحث وتصفية مقدمي الخدمات
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            اختر أي فلتر لعرض النتائج والخيارات المرتبطة به.
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

      {/* Search input */}
      <div className="mb-5">
        <label
          htmlFor="provider-search"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          البحث عن المستشفي
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
            placeholder="ابحث باسم المستشفي أو العنوان أو المحافظة أو المنطقة أو التخصص..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-12 pl-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#394295] focus:ring-2 focus:ring-[#394295]/10"
          />
        </div>
      </div>

      {/* Connected dropdowns */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {filterFields.map(({key, label}) => (
          <div key={key} className="min-w-0">
            {key === "provider" ? (
              <ServiceProviderFilter
                options={filterOptions.provider}
                value={filters.provider}
                onChange={(value) => handleFilterChange("provider", value)}
              />
            ) : (
              <>
                <label
                  htmlFor={`filter-${key}`}
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  {label}
                </label>

                <select
                  id={`filter-${key}`}
                  value={filters[key]}
                  onChange={(event) =>
                    handleFilterChange(key, event.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-800 outline-none transition focus:border-[#394295] focus:ring-2 focus:ring-[#394295]/10"
                >
                  <option value="">الكل</option>

                  {filterOptions[key].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Results count */}
      <div className="mt-5 border-t border-gray-100 pt-4 text-sm text-gray-500">
        عدد النتائج المطابقة:{" "}
        <span className="font-bold text-[#394295]">{filteredData.length}</span>
      </div>
    </section>
  );
}
