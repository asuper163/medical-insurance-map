import React from "react";
import SearchIcon from "../assets/SearchIcon.svg";

export default function SearchInput() {
  return (
    <div className="flex gap-3 flex-col ">
      <label htmlFor="" className="text-[#394295]">
        ابحث عن مقدم الخدمة
      </label>
      <div className="flex p-3 border border-gray-300 px-3 rounded-2xl ">
        <input type="text" className="outline-none text-gray-500 " />
        <img src={SearchIcon} alt="SearchIcon" />
      </div>
    </div>
  );
}
