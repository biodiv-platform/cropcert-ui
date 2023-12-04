import { Box } from "@chakra-ui/react";
import { SubmitButton } from "@components/form/submit-button";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckIcon from "@icons/check";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import BasicInfo from "../../create/basic-info";
import Metadata from "../../create/metadata";
import DocumentUploader from "../../create/uploader";

export default function DocumentEdit(props) {
  const { t } = useTranslation();
  const [bibField, setBibField] = useState(props.data.meta);

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
    defaultValues: props.data.fields,
  });

  const handleOnSubmit = async (fields) => {
    props.onUpdate({
      ...props.data,
      fields,
      isValid: true,
    });

    // collapse current expand
    const btn: any = document.querySelector(`[data-testid=expander-button-${props.data.id}]`);
    btn.click();
  };

  return (
    <Box p={4}>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          <DocumentUploader name="resource" />
          <BasicInfo
            canImport={false}
            documentTypes={props.documentTypes}
            licensesList={props.licensesList}
            setBibField={setBibField}
          />
          <Metadata bibFields={bibField.fields} />
          <SubmitButton leftIcon={<CheckIcon />}>{t("common:save")}</SubmitButton>
        </form>
      </FormProvider>
    </Box>
  );
}
