import React from "react";
import { useSelector } from "react-redux";

export default function TableExports() {
  const Data = useSelector((state) => state.data);

  return <div>TableExports</div>;
}
