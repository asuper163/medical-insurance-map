import React from "react";
import data from "../data.json";

export default function CardServiceProvider() {
  const hospitalsNetwork = data;

  return (
    <div>
      {hospitalsNetwork.map((el) => (
        <div className="flex gap-3">
          <p className="font-bold text-[14px] md:text-[16px] lg:text-[20px] text-[#394295] leading-[150%] tracking-[2px]">
            <span className="text-[16px] md:text-[18px] lg:text-[22px] text-black ">
              مقدم الخدمة :-{" "}
            </span>
            {el["مقدم الخدمة"]}
          </p>
        </div>
      ))}
    </div>
  );
}
