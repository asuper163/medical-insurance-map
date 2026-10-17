import {useState} from "react";

export default function Card({data = []}) {
  const [copiedPhone, setCopiedPhone] = useState("");

  const hasValue = (value) =>
    value !== null && value !== undefined && String(value).trim() !== "";

  const copyPhoneNumber = async (phone) => {
    try {
      await navigator.clipboard.writeText(String(phone).trim());
      setCopiedPhone(String(phone).trim());

      setTimeout(() => {
        setCopiedPhone("");
      }, 2000);
    } catch (error) {
      console.error("Failed to copy phone number:", error);
      alert("تعذر نسخ الرقم. يرجى المحاولة مرة أخرى.");
    }
  };

  if (!data.length) {
    return (
      <p dir="rtl" className="py-10 text-center text-gray-500">
        لا توجد نتائج مطابقة للفلاتر المحددة.
      </p>
    );
  }

  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {data.map((el, index) => {
        const phones = [el["رقم الهاتف 1"], el["رقم الهاتف 2"]].filter(
          hasValue,
        );

        return (
          <article
            key={el.id ?? el.documentId ?? `${el["مقدم الخدمة"]}-${index}`}
            className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="mb-4 border-b border-gray-100 pb-3 text-lg font-bold leading-relaxed text-[#394295]">
              {el["مقدم الخدمة"] || "غير محدد"}
            </h3>

            {hasValue(el["نوع مقدم الخدمة"]) && (
              <p className="mb-3 text-sm leading-7 text-gray-600">
                <span className="font-semibold text-gray-800">
                  نوع مقدم الخدمة:{" "}
                </span>
                {el["نوع مقدم الخدمة"]}
              </p>
            )}

            {hasValue(el["المحافظة"]) && (
              <p className="mb-3 text-sm leading-7 text-gray-600">
                <span className="font-semibold text-gray-800">المحافظة: </span>
                {el["المحافظة"]}
              </p>
            )}

            {hasValue(el["المنطقة"]) && (
              <p className="mb-3 text-sm leading-7 text-gray-600">
                <span className="font-semibold text-gray-800">المنطقة: </span>
                {el["المنطقة"]}
              </p>
            )}

            {hasValue(el["العنوان"]) && (
              <p className="mb-3 text-sm leading-7 text-gray-600">
                <span className="font-semibold text-gray-800">العنوان: </span>
                {el["العنوان"]}
              </p>
            )}

            {hasValue(el["التخصص"]) && (
              <p className="mb-3 text-sm leading-7 text-gray-600">
                <span className="font-semibold text-gray-800">التخصص: </span>
                {el["التخصص"]}
              </p>
            )}

            {phones.length > 0 && (
              <div className="mt-auto border-t border-gray-100 pt-3">
                <p className="mb-2 text-sm font-semibold text-gray-800">
                  رقم الهاتف:
                </p>

                <div className="flex flex-wrap gap-2">
                  {phones.map((phone, phoneIndex) => {
                    const phoneText = String(phone).trim();
                    const isCopied = copiedPhone === phoneText;

                    return (
                      <button
                        key={`${phoneText}-${phoneIndex}`}
                        type="button"
                        onClick={() => copyPhoneNumber(phoneText)}
                        title="اضغط لنسخ رقم الهاتف"
                        className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold transition ${
                          isCopied
                            ? "bg-green-100 text-green-700"
                            : "bg-[#394295]/10 text-[#394295] hover:bg-[#394295]/20"
                        }`}
                      >
                        {isCopied ? "✓ تم النسخ" : phoneText}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
