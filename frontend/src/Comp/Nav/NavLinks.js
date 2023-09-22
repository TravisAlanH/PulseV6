import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RiMenuLine } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import * as Actions from "../../Store/Slices/Slice";

export default function NavLinks() {
  const LoggedIn = useSelector((state) => state.data.LoggedIn);
  const dispatch = useDispatch();

  window.addEventListener("click", function (e) {
    const NavBar = document.getElementById("NAVLINKS");
    const MenuIcon = document.getElementById("MenuIcon");
    if (NavBar.contains(e.target)) {
      NavBar.classList.remove("h-[4rem]");
      MenuIcon.classList.remove("rotate-0");
      MenuIcon.classList.add("-rotate-90");
    } else {
      NavBar.classList.add("h-[4rem]");
      MenuIcon.classList.remove("-rotate-90");
      MenuIcon.classList.add("rotate-0");
    }
  });

  return (
    <div id="NAVLINKS" className="absolute top-0 right-0 overflow-hidden h-[4rem] transition-all">
      {LoggedIn ? (
        <div>
          <div className="h-[4rem] flex flex-row justify-center items-center text-white">
            {/* <button className="py-3 px-6">Menu</button> */}
            <RiMenuLine className="w-[3rem] h-[2rem] rotate-0 transition-all" id="MenuIcon" />
          </div>
          <Link
            to="/audit"
            className="h-[3rem] w-[5rem] bg-[#e0e0e0] flex flex-row justify-start pl-3 font-bold items-center">
            Audit
          </Link>
          <Link
            to="/survey"
            className="h-[3rem] w-[5rem] bg-[#e0e0e0] flex flex-row justify-start pl-3 font-bold items-center">
            Survey
          </Link>
          <div
            onClick={() => {
              const payload = {
                LoggedIn: false,
              };
              dispatch(Actions.loginLogout(payload));
            }}
            className="h-[3rem] w-[5rem] bg-[#e0e0e0] flex flex-row justify-start pl-3 font-bold items-center">
            Logout
          </div>
        </div>
      ) : (
        <Link to="/login" className="h-[4rem] w-[5rem] flex flex-row justify-center items-center text-white">
          <IoPersonCircleOutline className="w-[3rem] h-[2rem] rotate-0 transition-all" id="MenuIcon" />
        </Link>
      )}
    </div>
  );
}
