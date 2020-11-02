import { Accordion } from "@chakra-ui/core";
import ErrorSummery from "@components/@core/formik/error-summery";
import SubmitButton from "@components/@core/formik/submit-button";
import { axSaveICSInspectionReport } from "@services/certification.service";
import { axUploadSignature } from "@services/report.service";
import notification, { NotificationType } from "@utils/notification.util";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";

import ICSSignature from "./signature";

export default function InspectionReportApprovalForm({ report, version, subVersion }) {
  const router = useRouter();

  const ICSInspectionForm = {
    validationSchema: yup.object().shape({
      ics: yup.object().shape({ path: yup.string().required() }),
      /*
      boardAGMMinutesKept: yup.boolean().required(),
      membershipListsAndSharesUpdated: yup.boolean().required(),
      isAnnualBudgetAndAuditedAccounts: yup.boolean().required(),
      isFairTradePremiumBudgetAndWorkplan: yup.boolean().required(),
      isEnvirnmentCommitteAndItsWorkplan: yup.boolean().required(),
      isFTContractPersonAppointed: yup.boolean().required(),
      */
    }),
    initialValues: {
      ics: {},
    },
  };

  const handleOnICSInspectionFormSubmit = async (values, actions) => {
    const signatureURL = await axUploadSignature(values?.ics?.path);

    const payload = {
      farmerId: report.farmerId,
      version,
      subVersion,
      signature: { path: signatureURL, date: null, done: true },
    };

    const { success } = await axSaveICSInspectionReport(payload);
    if (success) {
      notification("Inspection Report Approved", NotificationType.Success);
      router.push(`/farmer-certification/inspection-report/list`);
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      {...ICSInspectionForm}
      onSubmit={handleOnICSInspectionFormSubmit}
      validateOnChange={false}
      validateOnBlur={true}
    >
      <Form>
        <Accordion allowMultiple>
          <ICSSignature />
        </Accordion>
        <ErrorSummery />
        <SubmitButton leftIcon="check2">Save</SubmitButton>
      </Form>
    </Formik>
  );
}
