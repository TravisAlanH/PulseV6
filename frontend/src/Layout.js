import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// import * as actions from "./Store/Slices/Slice";
import NavBase from "./Comp/Nav/NavBase";
import Login from "./Comp/Login/Login";
import AuditLayout from "./Comp/Aduit/AuditLayout";

export default function Layout() {
  const LoggedIn = useSelector((state) => state.data.LoggedIn);
  const [AllData, setAllData] = React.useState([]);

  return (
    <Router>
      <NavBase />
      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="/login" element={<Login setAllData={setAllData} />} />
        <Route path="/about" element={LoggedIn ? <h1>About</h1> : <Login setAllData={setAllData} />} />
        <Route
          path="/audit"
          element={LoggedIn ? <AuditLayout AllData={AllData} /> : <Login setAllData={setAllData} />}
        />
      </Routes>
    </Router>
  );
}
