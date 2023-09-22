import React from "react";
import NavLinks from "./NavLinks";
import logo from "../../Img/logo.webp";

export default function NavBase() {
  return (
    <div className="z-50 pb-[4rem] overflow-clip">
      <div className="w-screen h-[4rem] fixed top-0 orangeSplit z-50 ">
        <div className="flex flex-row justify-between items-center h-full w-full z-50">
          <div>
            <img src={logo} alt="sunbird" className="pl-3 h-[4rem]" />
          </div>
          <NavLinks />
        </div>
      </div>
    </div>
  );
}
