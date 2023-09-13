import React from "react";
import LoginTable from "./LoginTable";

export default function Login({ setRackData }) {
  return (
    <div className="LoginBackground w-screen flex flex-row justify-center items-center">
      <LoginTable setRackData={setRackData} />
    </div>
  );
}
