import React from "react";
import SurveyNav from "./SurveyNav";
import LocationLayout from "../Location/LocationLayout";

export default function SurveyLayout() {
  const [currentSurvey, setCurrentSurvey] = React.useState(<LocationLayout />);
  return (
    <div>
      <div>
        <SurveyNav setCurrentSurvey={setCurrentSurvey} />
      </div>
      <div>{currentSurvey}</div>
    </div>
  );
}
