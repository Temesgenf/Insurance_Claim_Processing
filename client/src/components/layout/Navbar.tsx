import insuranceMoney from "../../assets/insurance.svg";
import { navbarMenuItems } from "../../constants/index";
import type { NavbarMenuItem } from "../../types/navbar-menu-item";

function Navbar() {
  return (
    <nav>
      <div className="flex justify-between items-center py-4 md:pt-4">
        <div className="text-2xl flex items-center gap-2 font-bold ">
          <img src={insuranceMoney} className="w-[24px]" alt=""></img>
          <p className="text-[#22263c] ">ClaimPro</p>
        </div>
        <div>
          <ul className="flex items-center gap-6 text-[#22263c] font-semibold">
            {navbarMenuItems.map((item: NavbarMenuItem) => (
              <li key={item.id} className="text-xl">
                <a href={item.link}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <button className="bg-[#547aff] font-semibold text-[#fff] leading-6 flex justify-center items-center py-4 px-[50px] rounded-[20px]">
          Get Started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
