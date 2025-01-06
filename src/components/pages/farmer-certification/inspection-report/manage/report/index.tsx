import React from "react";

import { AccordionRoot } from "@/components/ui/accordion";

import AdvicesInformation from "./advices-information";
import AnimalsInformation from "./animals-information";
import CertificationInformation from "./certification-information";
import FarmInformation from "./farm-information";
import FarmerInformation from "./farmer-information";
import GeneralInformation from "./general-information";
import SignatureInformation from "./signature-information";

export default function InspectionReportPreview({ currentReport, previousReport, showCurrent }) {
  return (
    <AccordionRoot multiple={true}>
      <FarmerInformation farmerId={currentReport.farmerId || previousReport.farmerId} />
      <CertificationInformation
        currentReport={currentReport}
        previousReport={previousReport}
        showCurrent={showCurrent}
      />
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
    </AccordionRoot>
  );
}
