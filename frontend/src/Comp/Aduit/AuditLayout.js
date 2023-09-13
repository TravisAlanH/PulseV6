import React from "react";
import AuditNav from "./AuditNav";
import AuditHome from "./AuditHome";

export default function AuditLayout({ rackData }) {
  const [currentAudit, setCurrentAudit] = React.useState(<AuditHome />);
  return (
    <div>
      <div>
        <AuditNav setCurrentAudit={setCurrentAudit} rackData={rackData} />
      </div>
      <div>{currentAudit}</div>
    </div>
  );
}
