import React from "react";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { RiMenuLine } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
// import * as Actions from "../../Store/Slices/Slice";
import * as FireActions from "../../FireActions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavLinks() {
  const [LoggedIn, setLoggedIn] = React.useState(false);
  const UUID = useSelector((state) => state.data.Current.DataBaseUUID);

  React.useEffect(() => {
    FireActions.auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  // const LoggedIn = FireActions.auth.currentUser;
  const auth = FireActions.auth;

  // const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <div className="h-[4rem] flex flex-row justify-end items-center text-white">
            {/* <button className="py-3 px-6">Menu</button> */}
            <RiMenuLine className="w-[3rem] h-[2rem] rotate-0 transition-all mr-[2rem]" id="MenuIcon" />
          </div>
          <Link
            to="/home"
            className="h-[3rem] w-[12rem] bg-[#e0e0e0] flex flex-row justify-start pl-3 font-bold items-center hover:bg-[#f59439]">
            Created Locations
          </Link>
          {UUID !== "" ? (
            <div>
              <Link
                to="/survey"
                className="h-[3rem] w-[12rem] bg-[#e0e0e0] flex flex-row justify-start pl-3 font-bold items-center hover:bg-[#f59439]">
                Survey
              </Link>
              <Link
                to="/audit"
                className="h-[3rem] w-[12rem] bg-[#e0e0e0] flex flex-row justify-start pl-3 font-bold items-center hover:bg-[#f59439]">
                Audit
              </Link>
              <Link
                to="/electrical"
                className="h-[3rem] w-[12rem] bg-[#e0e0e0] flex flex-row justify-start pl-3 font-bold items-center hover:bg-[#f59439]">
                Electrical
              </Link>
              <Link
                to="/drawing"
                className="h-[3rem] w-[12rem] bg-[#e0e0e0] flex flex-row justify-start pl-3 font-bold items-center hover:bg-[#f59439]">
                Drawing
              </Link>
            </div>
          ) : null}
          <Link
            to="/settings"
            className="h-[3rem] w-[12rem] bg-[#e0e0e0] flex flex-row justify-start pl-3 font-bold items-center hover:bg-[#f59439]">
            Settings
          </Link>
          <div
            onClick={() => {
              FireActions.UserSignOut(auth);
              navigate("/login");
            }}
            className="h-[3rem] w-[12rem] bg-[#e0e0e0] flex flex-row justify-start pl-3 font-bold items-center hover:bg-[#f59439]">
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
