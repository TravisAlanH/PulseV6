import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// import * as actions from "./Store/Slices/Slice";
import NavBase from "./Comp/Nav/NavBase";
import Login from "./Comp/Login/Login";
import * as FormatRacks from "./Format/FormatRacks";
import AuditLayout from "./Comp/Aduit/AuditLayout";

export default function Layout() {
  const LoggedIn = useSelector((state) => state.data.LoggedIn);
  const [rackData, setRackData] = React.useState([]);
  const [smallRackData, setSmallRackData] = React.useState([]);

  React.useEffect(() => {
    setSmallRackData(FormatRacks.getUniqueMakes(rackData));
  }, [rackData]);

  return (
    <Router>
      <NavBase />
      <Routes>
        <Route path="/" element={<h1>{JSON.stringify(smallRackData)}</h1>} />
        <Route path="/login" element={<Login setRackData={setRackData} />} />
        <Route path="/about" element={LoggedIn ? <h1>About</h1> : <Login setRackData={setRackData} />} />
        <Route
          path="/audit"
          element={LoggedIn ? <AuditLayout rackData={rackData} /> : <Login setRackData={setRackData} />}
        />
      </Routes>
    </Router>
  );
}
