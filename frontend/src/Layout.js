import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as FireActions from "./FireActions";

// import * as actions from "./Store/Slices/Slice";
import NavBase from "./Comp/Nav/NavBase";
import Login from "./Comp/Login/Login";
import AuditLayout from "./Comp/Aduit/AuditLayout";
import SurveyLayout from "./Comp/Survey/SurveyLayout";
import ElectricalLayout from "./Comp/Electrical/ElectricalLayout";
import Settings from "./Comp/Settings/Settings";
import Drawing from "./Comp/Drawing/Drawing";

export default function Layout() {
  const auth = FireActions.auth.currentUser;

  const [AllData, setAllData] = React.useState([]);

  return (
    <Router>
      <NavBase />
      <Routes>
        <Route path="/" element={<Login setAllData={setAllData} />} />
        <Route path="/survey" element={auth ? <SurveyLayout /> : <Login setAllData={setAllData} />} />
        <Route
          path="/electrical"
          element={auth ? <ElectricalLayout AllData={AllData} /> : <Login setAllData={setAllData} />}
        />

        <Route path="/login" element={<Login setAllData={setAllData} />} />
        <Route path="/drawing" element={auth ? <Drawing /> : <Login setAllData={setAllData} />} />

        <Route path="/home" element={auth ? <h1>home</h1> : <Login setAllData={setAllData} />} />
        <Route path="/settings" element={auth ? <Settings /> : <Login setAllData={setAllData} />} />

        <Route path="/audit" element={auth ? <AuditLayout AllData={AllData} /> : <Login setAllData={setAllData} />} />
      </Routes>
    </Router>
  );
}
