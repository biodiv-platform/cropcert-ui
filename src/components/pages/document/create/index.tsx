import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { SubmitButton } from "@components/form/submit-button";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckIcon from "@icons/check";
import { axCreateDocument } from "@services/document.service";
import { DEFAULT_BIB_FIELDS, DEFAULT_BIB_FIELDS_SCHEMA } from "@static/document";
import notification, { NotificationType } from "@utils/notification";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import { transformDocumentCreatePayload } from "../common/create-util";
import BasicInfo from "./basic-info";
import Coverage from "./coverage";
import Metadata from "./metadata";
import DocumentUploader from "./uploader";

export default function DocumentCreatePageComponent({ documentTypes, licensesList }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [bibField, setBibField] = useState({
    schema: DEFAULT_BIB_FIELDS_SCHEMA,
    fields: DEFAULT_BIB_FIELDS,
  });

  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(
      Yup.object().shape({
        itemTypeId: Yup.number().required(),
        bibFieldData: Yup.object().shape(bibField.schema),

        licenseId: Yup.number().required(),
        fromDate: Yup.mixed(),

        resource: Yup.lazy((value) =>
          value
            ? Yup.object().shape({
                resourceURL: Yup.string().required(),
                size: Yup.number().required(),
              })
            : Yup.mixed().notRequired()
        ),

        tags: Yup.array().nullable(),

        docCoverageData: Yup.array().of(
          Yup.object().shape({
            id: Yup.mixed().nullable(),
            placename: Yup.string().required(),
            topology: Yup.string().required(),
          })
        ),

        userGroupId: Yup.array(),
      })
    ),
    defaultValues: {
      bibFieldData: {},
      tags: [],
      speciesGroupIds: [],
      habitatIds: [],
      docCoverageData: [],
      userGroupId: [],
      licenseId: licensesList?.[0]?.value,
    },
  });

  const handleOnSubmit = async (values) => {
    const payload = transformDocumentCreatePayload(values, documentTypes);
    const { success, data } = await axCreateDocument(payload);

    if (success) {
      notification(t("document:create.success"), NotificationType.Success);
      router.push(`/document/show/${data.document.id}`);
    } else {
      notification(t("document:create.error"));
    }
  };

  return (
    <Container py={6}>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          <PageHeading>📄 {t("document:create.title")}</PageHeading>
          <DocumentUploader name="resource" />
          <BasicInfo
            canImport={true}
            documentTypes={documentTypes}
            setBibField={setBibField}
            licensesList={licensesList}
          />
          <Metadata bibFields={bibField.fields} />
          <Coverage />
          <SubmitButton leftIcon={<CheckIcon />}>{t("document:create.title")}</SubmitButton>
        </form>
      </FormProvider>
    </Container>
  );
}
