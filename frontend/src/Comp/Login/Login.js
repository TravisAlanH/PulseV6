import React from "react";
import LoginTable from "./LoginTable";

export default function Login({ setAllData }) {
  return (
    <div className="LoginBackground w-screen h-screen flex flex-row justify-center items-center">
      <LoginTable setAllData={setAllData} />
    </div>
  );
}
