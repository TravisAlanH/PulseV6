import React from "react";

export default function Footer() {
  return (
    <div className="w-screen h-[1.5rem] fixed bottom-0  z-50 flex flex-row justify-end items-center pr-4 text-xs gap-2 bg-[#F7F5F1]">
      <p>{"Auditors Tool v1.0.2"}</p>
      <a href="https://www.sunbirddcim.com/" target="_blank" rel="noreferrer" className="text-[#f59439]">
        {"SunbirdDCIM"}
      </a>
    </div>
  );
}
