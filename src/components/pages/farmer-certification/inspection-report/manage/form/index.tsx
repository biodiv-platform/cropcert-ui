import ErrorSummery from "@components/form/error-summery";
import { SubmitButton } from "@components/form/submit-button";
import { yupResolver } from "@hookform/resolvers/yup";
import { axSaveICSInspectionReport } from "@services/certification.service";
import { axUploadSignature } from "@services/report.service";
import notification, { NotificationType } from "@utils/notification";
import { useRouter } from "next/router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Check2Icon from "src/icons/check2";
import * as yup from "yup";

import { AccordionRoot } from "@/components/ui/accordion";

import ICSSignature from "./signature";

export default function InspectionReportApprovalForm({ report, version, subVersion }) {
  const router = useRouter();

  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      yup.object().shape({
        ics: yup.object().shape({ path: yup.string().required() }),
      })
    ),
    defaultValues: {
      ics: {},
    },
  });

  const handleOnICSInspectionFormSubmit = async (values) => {
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
  };

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleOnICSInspectionFormSubmit)}>
        <AccordionRoot multiple>
          <ICSSignature />
        </AccordionRoot>
        <ErrorSummery />
        <SubmitButton leftIcon={<Check2Icon />}>Save</SubmitButton>
      </form>
    </FormProvider>
  );
}
