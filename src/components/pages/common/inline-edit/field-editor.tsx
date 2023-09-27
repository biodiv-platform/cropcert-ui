import { Button } from "@chakra-ui/react";
import { SelectInputField } from "@components/form/select";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

export default function FieldEditor({
  updateFunc,
  fieldName,
  onClose,
  defaultValue,
  licensesList,
  setFetch,
}) {
  const { t } = useTranslation();

  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(
      Yup.object().shape({
        caption: Yup.string(),
        contributor: Yup.string(),
      })
    ),
    defaultValues: {
      caption: defaultValue?.resource?.description,
      id: defaultValue?.resource?.id,
      url: defaultValue?.resource.url,
      licenseId: defaultValue?.resource.licenseId?.toString(),
      contributor: defaultValue?.resource?.contributor || defaultValue?.userIbp?.name,
      rating: defaultValue?.resource?.rating,

      tags: defaultValue?.tags,
    },
  });

  const handleOnSubmit = async (values) => {
    const payload = { ...values };

    const { success } = await updateFunc(payload);
    if (success) {
      setFetch(true);
      onClose();
      notification(t("common:resource.update_sucess"), NotificationType.Success);
    }
  };

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
        {fieldName == "license" ? (
          <SelectInputField
            name="licenseId"
            placeholder="Select licence"
            options={licensesList}
            label={""}
          />
        ) : (
          <TextBoxField name={fieldName} mb={2} label={""} />
        )}
        <Button size="sm" colorScheme="blue" aria-label="Save" type="submit">
          {t("common:save")}
        </Button>
        <Button size="sm" ml={2} colorScheme="gray" aria-label="Cancel" onClick={onClose}>
          {t("common:cancel")}
        </Button>
      </form>
    </FormProvider>
  );
}
