import Card from "./Card";

export default function Cards({data = []}) {
  if (!data.length) {
    return (
      <div
        dir="rtl"
        className="rounded-2xl border border-gray-100 bg-white px-4 py-12 text-center shadow-sm"
      >
        <h3 className="text-lg font-bold text-[#394295]">
          لا توجد نتائج مطابقة
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          جرّب تغيير كلمات البحث أو الفلاتر المحددة.
        </p>
      </div>
    );
  }

  return <Card data={data} />;
}
