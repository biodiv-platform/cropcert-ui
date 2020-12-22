import React from "react";

import AdvicesInformation from "./advices-information";
import AnimalsInformation from "./animals-information";
import FarmInformation from "./farm-information";
import FarmerInformation from "./farmer-information";
import GeneralInformation from "./general-information";
import SignatureInformation from "./signature-information";

export default function InspectionReportPreview({ currentReport, previousReport, showCurrent }) {
  return (
    <>
      <FarmerInformation farmerId={currentReport.farmerId || previousReport.farmerId} />
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
      <SignatureInformation
        currentReport={currentReport}
        previousReport={previousReport}
        showCurrent={showCurrent}
      />
    </>
  );
}
