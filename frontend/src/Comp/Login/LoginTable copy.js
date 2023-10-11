import React from "react";
import Logo from "../../Img/sunbird-logo-white.png";
import { useDispatch } from "react-redux";
import * as actions from "../../Store/Slices/Slice";
import "../../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginTable({ setAllData }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const baseLogin = process.env.REACT_APP_LOGIN;
  const basePass = process.env.REACT_APP_PASS;
  const baseURL = process.env.REACT_APP_BASE_URL;
  // const rackURL = process.env.REACT_APP_RACK_URL;

  const FullData = "data.json";

  let payload = {
    set: 1,
  };

  return (
    <div className="h-[31rem] w-[17.5rem] flex flex-col pt-[1rem] justify-center items-center relative bg-[rgba(16,16,16,0.68);] rounded-md">
      <ul className="flex flex-col gap-3 items-center">
        <li>
          <img src={Logo} alt="Sunbird Logo" className="w-[11rem] h-[3.1rem]" />
        </li>
        <li className="w-[15.31rem] relative table">
          <input
            type="text"
            autoFocus="autofocus"
            placeholder="Username"
            name="user"
            id="user"
            className="LoginInput font-medium"
          />
        </li>
        <li className="w-[15.31rem] relative table">
          <input type="password" placeholder="Password" name="pass" id="pass" className="LoginInput font-medium" />
        </li>
        <li className="w-[15.31rem] relative table">
          <input type="text" placeholder="Domain" name="domain" id="domain" className="LoginInput font-medium" />
        </li>
        <li>
          <button
            className="LoginButton mt-3 mb-8"
            onClick={() => {
              let user = document.getElementById("user").value;
              let pass = document.getElementById("pass").value;
              if (user === baseLogin && pass === basePass) {
                // payload.Local = JSON.parse(localStorage.getItem("PulseStateData"));
                // console.log(payload.Local);
                // dispatch(actions.loadLocalStorage(payload));
                payload = {
                  value: true,
                };
                dispatch(actions.loginLogout(payload));
                axios.get(baseURL + FullData).then((res) => {
                  setAllData(res.data["rows"]);
                });
                navigate("/home");
              }
            }}>
            Login
          </button>
        </li>
      </ul>
      <h2 className="text-white tracking-[-.42px] border-t-[2px] pt-3 w-[80%] text-center">dcTrack Pulse Audit</h2>
      <p className="text-white opacity-60 text-xs text-center px-4 py-3">
        Access to this system is prohibited unless authorized. Accessing programs or data unrelated to your job is
        prohibited.
      </p>
    </div>
  );
}
