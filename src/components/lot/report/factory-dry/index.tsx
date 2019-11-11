import { axCreateFactoryReport } from "@services/report.service";
import { messageRedirect, nonZeroFalsy } from "@utils/basic.util";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import { renderFactoryReportDryForm } from "./factory-dry-form";
import { calculateFormValues } from "./factory-dry-utils";

function FactoryReportDryComponent({ report, lotId }) {
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

      highGradeWeight: Yup.number().required(),

      triage: Yup.number().required(),
      pods: Yup.number().required(),
      sweeppingsOrSpillages: Yup.number().required(),

      totalBlackBeans: Yup.number().required(),

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

      highGradeWeight: nonZeroFalsy(report.highGradeWeight),

      triage: nonZeroFalsy(report.triage),
      pods: nonZeroFalsy(report.pods),
      sweeppingsOrSpillages: nonZeroFalsy(report.sweeppingsOrSpillages),

      totalBlackBeans: nonZeroFalsy(report.totalBlackBeans),

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
      enableReinitialize={true}
    >
      {renderFactoryReportDryForm}
    </Formik>
  );
}

export default FactoryReportDryComponent;
