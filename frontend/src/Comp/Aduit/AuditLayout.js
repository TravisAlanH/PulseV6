import React from "react";
import AuditNav from "./AuditNav";
import LocationLayout from "../Location/LocationLayout";

export default function AuditLayout({ AllData }) {
  const [currentAudit, setCurrentAudit] = React.useState(<LocationLayout />);
  return (
    <div>
      <div>
        <AuditNav setCurrentAudit={setCurrentAudit} AllData={AllData} />
      </div>
      <div>{currentAudit}</div>
    </div>
  );
}
