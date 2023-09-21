import React from "react";
import SurveyNav from "./SurveyNav";
import SurveyHome from "./SurveyHome";

export default function SurveyLayout() {
  const [currentSurvey, setCurrentSurvey] = React.useState(<SurveyHome />);
  return (
    <div>
      <div>
        <SurveyNav setCurrentSurvey={setCurrentSurvey} />
      </div>
      <div>{currentSurvey}</div>
    </div>
  );
}
