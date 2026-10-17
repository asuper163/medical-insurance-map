export default function ServiceProviderFilter({options, value, onChange}) {
  return (
    <div className="flex flex-col gap-2" dir="rtl">
      <label className="text-sm font-semibold text-slate-700">
        مقدم الخدمة
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 outline-none focus:border-indigo-500"
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
