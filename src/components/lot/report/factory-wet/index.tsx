import { axCreateFactoryReport } from "@services/report.service";
import { messageRedirect, nonZeroFalsy } from "@utils/basic.util";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import { renderFactoryReportWetForm } from "./factory-wet-form";
import { calculateFormValues } from "./factory-wet-utils";

function FactoryReportWetComponent({ report, lotId }) {
  const factoryReportForm = {
    validationSchema: Yup.object().shape({
      grnNumber: Yup.string().required(),
      date: Yup.number().required(),

      mcIn: Yup.number()
        .required()
        .max(100),
      mcOut: Yup.number()
        .required()
        .max(100),

      inputWeight: Yup.number().required(),
      spillPrivBatch: Yup.number().required(),
      spillCF: Yup.number().required(),

      gradeAA: Yup.number().required(),
      gradeAB: Yup.number().required(),
      gradeCAndPB: Yup.number().required(),

      triage: Yup.number().required(),
      pods: Yup.number().required(),
      arabica1899: Yup.number().required(),
      sweeppingsOrSpillages: Yup.number().required(),

      blackBeansAA: Yup.number().required(),
      blackBeansAB: Yup.number().required(),
      blackBeansC: Yup.number().required(),

      stone: Yup.number().required(),
      preCleaner: Yup.number().required(),
      graderHusks: Yup.number().required(),

      handlingLoss: Yup.number().required(),
      dryingLoss: Yup.number().required(),
    }),
    initialValues: {
      grnNumber: report.grnNumber || "",
      date: report.date,

      mcIn: nonZeroFalsy(report.mcIn),
      mcOut: nonZeroFalsy(report.mcOut),

      inputWeight: nonZeroFalsy(report.inputWeight),
      spillPrivBatch: nonZeroFalsy(report.spillPrivBatch),
      spillCF: nonZeroFalsy(report.spillCF),

      gradeAA: nonZeroFalsy(report.gradeAA),
      gradeAB: nonZeroFalsy(report.gradeAB),
      gradeCAndPB: nonZeroFalsy(report.gradeCAndPB),

      triage: nonZeroFalsy(report.triage),
      pods: nonZeroFalsy(report.pods),
      arabica1899: nonZeroFalsy(report.arabica1899),
      sweeppingsOrSpillages: nonZeroFalsy(report.sweeppingsOrSpillages),

      blackBeansAA: nonZeroFalsy(report.blackBeansAA),
      blackBeansAB: nonZeroFalsy(report.blackBeansAB),
      blackBeansC: nonZeroFalsy(report.blackBeansC),

      stone: nonZeroFalsy(report.stone),
      preCleaner: nonZeroFalsy(report.preCleaner),
      graderHusks: nonZeroFalsy(report.graderHusks),

      handlingLoss: nonZeroFalsy(report.handlingLoss),
      dryingLoss: nonZeroFalsy(report.dryingLoss),
    },
  };

  const handleFactoryReportSubmit = (v, actions) => {
    actions.setSubmitting(false);
    axCreateFactoryReport({
      ...v,
      id: report.id || -1,
      lotId,
      gradeAA: 0,
      gradeAB: 0,
      gradeCAndPB: 0,
      arabica1899: 0,
      blackBeansAA: 0,
      blackBeansAB: 0,
      blackBeansC: 0,
      ...calculateFormValues(v),
    }).then(response =>
      messageRedirect({ ...response, mcode: "FACTORY_REPORT_CREATED" })
    );
  };

  return (
    <Formik
      {...factoryReportForm}
      onSubmit={handleFactoryReportSubmit}
      render={renderFactoryReportWetForm}
      enableReinitialize={true}
    />
  );
}

export default FactoryReportWetComponent;
