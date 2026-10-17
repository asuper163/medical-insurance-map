import LogoImg from "../assets/Logo.png";
import HeaderP from "./HeaderP";
import Logo from "./Logo";
import Navbar from "./NavBar";

export default function Header() {
  return (
    <div className="w-full flex justify-center items-center bg-[#F3F5F9]  px-3 md:px-5 py-3 md:py-5  border-b border-[#394295]">
      <div className=" container flex justify-between items-center md:px-3">
        <HeaderP />
        <Logo />
      </div>
    </div>
  );
}
