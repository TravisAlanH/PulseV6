import React from "react";

export default function Footer() {
  return (
    <div className="w-screen h-[1.5rem] fixed bottom-0  z-50 flex flex-row justify-end pr-2 text-xs gap-2 bg-[#F7F5F1]">
      <p>{"Pulse Survey v1.0.1"}</p>
      <a href="https://www.sunbirddcim.com/" target="_blank" rel="noreferrer" className="text-[#f59439]">
        {"SunbirdDCIM"}
      </a>
    </div>
  );
}
