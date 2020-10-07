import React from "react";
import AdvicesInformation from "./advices-information";

import AnimalsInformation from "./animals-information";
import FarmInformation from "./farm-information";
import GeneralInformation from "./general-information";

export default function InspectionReportPreview({ currentReport, previousReport, showCurrent }) {
  return (
    <>
      <GeneralInformation
        currentReport={currentReport}
        previousReport={previousReport}
        showCurrent={showCurrent}
      />
      <FarmInformation
        currentReport={currentReport}
        previousReport={previousReport}
        showCurrent={showCurrent}
      />
      <AnimalsInformation
        currentReport={currentReport}
        previousReport={previousReport}
        showCurrent={showCurrent}
      />
      <AdvicesInformation
        currentReport={currentReport}
        previousReport={previousReport}
        showCurrent={showCurrent}
      />
    </>
  );
}
