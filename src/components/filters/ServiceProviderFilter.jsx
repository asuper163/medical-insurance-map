export default function ServiceProviderFilter({options = [], value, onChange}) {
  return (
    <div className="flex min-w-0 flex-col gap-2" dir="rtl">
      <label
        htmlFor="filter-provider"
        className="text-sm font-semibold text-slate-700"
      >
        مقدم الخدمة
      </label>

      <select
        id="filter-provider"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
      >
        <option value="">كل مقدمي الخدمة</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
