import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavLinks() {
  const LoggedIn = useSelector((state) => state.data.LoggedIn);

  window.addEventListener("click", function (e) {
    const NavBar = document.getElementById("NAVLINKS");
    if (NavBar.contains(e.target)) {
      NavBar.classList.remove("h-[3rem]");
    } else {
      NavBar.classList.add("h-[3rem]");
    }

    const NavLinks = document.getElementsByClassName("liNav");
    for (let i = 0; i < NavLinks.length; i++) {
      if (NavLinks[i].contains(e.target)) {
        NavBar.classList.add("h-[3rem]");
      }
    }
  });

  return (
    <div className="absolute top-0 left-0">
      <ul id="NAVLINKS" className="ulNav overflow-hidden h-[3rem] transition-all">
        {LoggedIn ? (
          <div>
            <li className="liNavMenuLink">
              <div className="w-full h-full flex flex-row justify-center items-center">
                <a href="/" className="py-3 px-6">
                  Menu
                </a>
              </div>
            </li>
            <li className="liNav">
              <div className="w-full h-full flex flex-row justify-center items-center">
                <Link to="/audit" className="py-3 px-6">
                  audit
                </Link>
              </div>
            </li>

            <li className="liNav">
              <div className="w-full h-full flex flex-row justify-center items-center">
                <Link to="/" className="py-3 px-6">
                  home
                </Link>
              </div>
            </li>
          </div>
        ) : (
          <li className="liNav">
            <div className="w-full h-full flex flex-row justify-center items-center">
              <Link to="/login" className="py-3 px-6">
                Login
              </Link>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
