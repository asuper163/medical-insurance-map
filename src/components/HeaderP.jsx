import React from "react";
import {NavLink} from "react-router-dom";

export default function HeaderP() {
  return (
    <NavLink to="/" className="flex items-center gap-3">
      <div>
        <p className="font-bold text-[18px] md:text-[20px] lg:text-[32px] text-[#394295] leading-[150%] tracking-[2px]">
          الادارة الطبية
        </p>
      </div>
    </NavLink>
  );
}
