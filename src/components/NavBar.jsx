import {NavLink} from "react-router-dom";

const navLinks = [
  {name: "الصفحة الرئيسية", path: "/"},
  {name: "المستشفيات", path: "/hospitals"},
  {name: "الصيدليات", path: "/pharmacies"},
  {name: "المعامل و الاشعات", path: "/labs-radiology"},
];

export default function Navbar() {
  return (
    <nav className="">
      <div className="hidden md:flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Navigation links */}
        <ul className="flex w-full  items-center gap-2 sm:w-auto sm:gap-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({isActive}) =>
                  `block rounded-lg px-2 py-2 text-sm font-bold transition-colors duration-200 sm:px-4 text-[14px] lg:text-[20px] ${
                    isActive
                      ? "bg-[#394295] text-white shadow-sm "
                      : "text-[#394295] hover:bg-white hover:text-[#394295]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
