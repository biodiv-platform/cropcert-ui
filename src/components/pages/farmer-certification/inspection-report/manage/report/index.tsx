import React from "react";
import AdvicesInformation from "./advices-information";

import AnimalsInformation from "./animals-information";
import FarmInformation from "./farm-information";
import GeneralInformation from "./general-information";

export default function InspectionReportPreview({ report }) {
  return (
    <>
      <GeneralInformation report={report} />
      <FarmInformation report={report} />
      <AnimalsInformation report={report} />
      <AdvicesInformation report={report} />
    </>
  );
}
