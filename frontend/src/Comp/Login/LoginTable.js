import React from "react";
import Logo from "../../Img/sunbird-logo-white.png";
// import { useDispatch } from "react-redux";
// import * as actions from "../../Store/Slices/Slice";
import "../../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as FireActions from "../../FireActions";
import LoadingSpinner from "../Reuse/LoadingSpinner/Spinner";
// import MessageBox from "../Reuse/MessageBox";

export default function LoginTable({ setAllData }) {
  // const [messageVerify, setMessageVerify] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [createAccount, setCreateAccount] = React.useState(false);
  const [hidePass, setHidePass] = React.useState(true);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [createUser, setCreateUser] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    FullName: "",
  });
  // const dispatch = useDispatch();
  let navigate = useNavigate();

  // const baseLogin = process.env.REACT_APP_LOGIN;
  // const basePass = process.env.REACT_APP_PASS;
  const baseURL = process.env.REACT_APP_BASE_URL;
  // const rackURL = process.env.REACT_APP_RACK_URL;

  const FullData = "data.json";

  // let payload = {
  //   set: 1,
  // };

  function isValidEmail(email) {
    const testAgainst = process.env.REACT_APP_AUTHORIZED_EMAIL_DOMAIN;
    const providedEmailDomain = email.split("@")[1].toLowerCase(); // Convert to lowercase
    const authorizedEmailDomain = testAgainst.toLowerCase(); // Convert to lowercase

    if (providedEmailDomain === authorizedEmailDomain) {
      return true;
    }

    console.log("Invalid email domain:", providedEmailDomain, email);
    return false;
  }

  return (
    <div className="w-[17.5rem] flex flex-col pt-[1rem] justify-center items-center relative bg-[rgba(16,16,16,0.68);] rounded-md">
      <ul className="flex flex-col gap-3 items-center">
        <li>
          <img src={Logo} alt="Sunbird Logo" className="w-[11rem] h-[3.1rem] mb-3" />
        </li>
        {/* //! CREATE FULLNAME */}
        {createAccount && (
          <li className="w-[15.31rem] relative table">
            <input
              type="text"
              placeholder="Full Name"
              name="domain"
              id="domain"
              className="LoginInput font-medium"
              onChange={(e) => {
                setCreateUser({ ...createUser, FullName: e.target.value });
              }}
            />
          </li>
        )}
        {/* //! EMAIL */}
        {!createAccount && (
          <li className="w-[15.31rem] relative table">
            <input
              type="email"
              autoFocus="autofocus"
              placeholder="Email"
              name="email"
              id="email"
              className="LoginInput font-medium"
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </li>
        )}
        {/* //! CREATE EMAIL */}
        {createAccount && (
          <li className="w-[15.31rem] relative table">
            <input
              type="email"
              autoFocus="autofocus"
              placeholder="Email"
              name="email"
              id="email"
              autoComplete="off"
              className="LoginInput font-medium"
              onChange={(e) => {
                setCreateUser({ ...createUser, email: e.target.value });
              }}
            />
          </li>
        )}
        {/* //! PASS */}
        {!createAccount && (
          <li className="w-[15.31rem] relative table">
            <input
              type={hidePass ? "password" : "text"}
              placeholder="Password"
              name="pass"
              id="pass"
              className="LoginInput font-medium"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </li>
        )}
        {/* //! CREATE PASS */}
        {createAccount && (
          <div>
            <li className="w-[15.31rem] relative table mb-3">
              <input
                id="passCreate"
                type={hidePass ? "password" : "text"}
                placeholder="Password"
                name="pass"
                className="LoginInput font-medium"
                onChange={(e) => {
                  setCreateUser({ ...createUser, password: e.target.value });
                }}
              />
            </li>
            {/* //! CREATE PASS CHECK */}
            <li className="w-[15.31rem] relative table">
              <input
                id="passConfirm"
                type={hidePass ? "password" : "text"}
                placeholder="Confirm Password"
                name="domain"
                className="LoginInput font-medium"
                onChange={(e) => {
                  setCreateUser({ ...createUser, confirmPassword: e.target.value });
                }}
              />
            </li>
          </div>
        )}
        <li>
          {/* show and hide password checkbox */}
          <input
            type="checkbox"
            id="showPass"
            className="mr-2"
            onChange={() => {
              setHidePass(!hidePass);
            }}
          />
          <label htmlFor="showPass" className="text-white text-xs">
            Show Password
          </label>
        </li>
        {/* //! LOGIN */}
        {!createAccount && (
          <li>
            <button
              className="LoginButton"
              onClick={async () => {
                if (!isValidEmail(user.email)) {
                  alert("Invalid email used");
                  return;
                }
                setLoading(true);
                try {
                  FireActions.signIn(user);

                  //! GET DATA FIREBASE
                  // const data = await FireActions.getData();
                  // setAllData(data);

                  //! GET DATA JSON
                  axios.get(baseURL + FullData).then((res) => {
                    setAllData(res.data["rows"]);
                  });
                  //!
                  //!
                  //! EMAIL VERIFICATION
                  // console.log(FireActions.auth);
                  // if (!FireActions.auth.currentUser.emailVerified) {
                  //   alert("Please verify your email");
                  //   FireActions.VerificationEmail();
                  //   FireActions.UserSignOut(FireActions.auth);
                  //   return;
                  // }
                  navigate("/home");
                } catch (error) {
                  console.error("Error occurred during login:", error);
                  // Handle error as needed
                } finally {
                  setLoading(false);
                }
              }}>
              Login
            </button>
          </li>
        )}
        {/* //! CREATE */}
        {!createAccount && (
          <li>
            <button
              className="LoginButton mb-4"
              onClick={() => {
                setCreateAccount(true);
              }}>
              Create Account
            </button>
          </li>
        )}
        {/* //! CREATE CREATE */}
        {createAccount && (
          <li className="">
            <button
              className="LoginButton mt-3"
              onClick={() => {
                if (createUser.password !== createUser.confirmPassword) {
                  alert("Passwords do not match");
                  return;
                } else if (!isValidEmail(createUser.email)) {
                  alert("Invalid email used");
                  return;
                } else {
                  setCreateAccount(false);
                  setCreateUser({
                    email: "",
                    password: "",
                    confirmPassword: "",
                    FullName: "",
                  });
                  FireActions.signup(createUser).then(() => {
                    FireActions.VerificationEmail();
                    FireActions.UserSignOut(FireActions.auth);
                  });
                  alert("Account Created, Please verify your email to gain Access");
                }
              }}>
              Create
            </button>
          </li>
        )}
        {createAccount && (
          <li>
            <button
              className="LoginButton"
              onClick={() => {
                setCreateAccount(false);
                setCreateUser({
                  email: "",
                  password: "",
                  confirmPassword: "",
                  FullName: "",
                });
              }}>
              Cancel
            </button>
          </li>
        )}
      </ul>
      {/* <button
        className="text-white text-xs"
        onClick={() => {
          if (FireActions.auth.currentUser.currentUser === null) {
            alert("Please enter your email");
            return;
          } else {
            FireActions.VerificationEmail();
            FireActions.UserSignOut(FireActions.auth);
            alert("Email Sent");
          }
        }}>
        Reverify Email
      </button> */}
      <h2 className="text-white tracking-[-.42px] border-t-[2px] pt-3 w-[80%] text-center">dcTrack Auditor Tool</h2>
      <p className="text-white opacity-60 text-xs text-center px-4 py-3">
        Access to this system is prohibited unless authorized. Accessing programs or data unrelated to your job is
        prohibited.
      </p>
      <div className="absolute top-[7.5rem]">
        {loading ? <LoadingSpinner /> : null}
        {/* <MessageBox messageVerify={messageVerify} setMessageVerify={setMessageVerify} />; */}
      </div>
    </div>
  );
}
