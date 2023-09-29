import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// import * as actions from "./Store/Slices/Slice";
import NavBase from "./Comp/Nav/NavBase";
import Login from "./Comp/Login/Login";
import AuditLayout from "./Comp/Aduit/AuditLayout";
import SurveyLayout from "./Comp/Survey/SurveyLayout";
import ElectricalLayout from "./Comp/Electrical/ElectricalLayout";
import Settings from "./Comp/Settings/Settings";

export default function Layout() {
  const LoggedIn = useSelector((state) => state.data.LoggedIn);
  const [AllData, setAllData] = React.useState([]);

  return (
    <Router>
      <NavBase />
      <Routes>
        <Route path="/" element={<Login setAllData={setAllData} />} />
        <Route path="/survey" element={LoggedIn ? <SurveyLayout /> : <Login setAllData={setAllData} />} />
        <Route
          path="/electrical"
          element={LoggedIn ? <ElectricalLayout AllData={AllData} /> : <Login setAllData={setAllData} />}
        />

        <Route path="/login" element={<Login setAllData={setAllData} />} />
        <Route path="/home" element={LoggedIn ? <h1>home</h1> : <Login setAllData={setAllData} />} />
        <Route path="/settings" element={LoggedIn ? <Settings /> : <Login setAllData={setAllData} />} />

        <Route
          path="/audit"
          element={LoggedIn ? <AuditLayout AllData={AllData} /> : <Login setAllData={setAllData} />}
        />
      </Routes>
    </Router>
  );
}
