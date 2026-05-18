import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-[65px] flex justify-center items-center bg-gray-900 border-b border-gray-700 shadow-md gap-x-10">

      {NavbarData.map((link, idx) => (
        <NavLink
          key={idx}
          to={link.path}
          className={({ isActive }) =>
            isActive
              ? "text-blue-400 font-semibold text-lg border-b-2 border-blue-400 pb-1"
              : "text-gray-300 hover:text-white transition text-lg"
          }
        >
          {link.title}
        </NavLink>
      ))}

    </div>
  );
};

export default Navbar;