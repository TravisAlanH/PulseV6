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
import HomeLayout from "./Comp/Home/HomeLayout";
import Footer from "./Comp/Footer/Footer";

export default function Layout() {
  const auth = FireActions.auth.currentUser;

  const [AllData, setAllData] = React.useState([]);

  console.log(auth);

  return (
    <Router>
      {auth && auth.emailVerified ? <NavBase /> : null}
      <div className="pb-[2rem]">
        <Routes>
          <Route path="/" element={<Login setAllData={setAllData} />} />
          <Route path="/survey" element={auth && auth.emailVerified ? <SurveyLayout /> : <Login setAllData={setAllData} />} />
          <Route path="/electrical" element={auth && auth.emailVerified ? <ElectricalLayout AllData={AllData} /> : <Login setAllData={setAllData} />} />
          <Route path="/login" element={<Login setAllData={setAllData} />} />
          <Route path="/drawing" element={auth && auth.emailVerified ? <Drawing /> : <Login setAllData={setAllData} />} />

          <Route path="/home" element={auth && auth.emailVerified ? <HomeLayout /> : <Login setAllData={setAllData} />} />
          <Route path="/settings" element={auth && auth.emailVerified ? <Settings /> : <Login setAllData={setAllData} />} />

          <Route path="/audit" element={auth && auth.emailVerified ? <AuditLayout AllData={AllData} /> : <Login setAllData={setAllData} />} />
        </Routes>
      </div>
      {auth && auth.emailVerified ? <Footer /> : null}
    </Router>
  );
}
