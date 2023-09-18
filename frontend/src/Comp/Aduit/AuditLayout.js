import React from "react";
import AuditNav from "./AuditNav";
import AuditHome from "./AuditHome";

export default function AuditLayout({ AllData }) {
  const [currentAudit, setCurrentAudit] = React.useState(<AuditHome />);
  return (
    <div>
      <div>
        <AuditNav setCurrentAudit={setCurrentAudit} AllData={AllData} />
      </div>
      <div>{currentAudit}</div>
    </div>
  );
}
