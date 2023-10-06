import { Button } from "@chakra-ui/react";
import { SelectInputField } from "@components/form/select";
import { SelectMultipleInputField } from "@components/form/select-multiple";
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
  defaultMediaGallery,
  mediaGalleryList,
}) {
  const { t } = useTranslation();

  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        caption: Yup.string(),
        contributor: Yup.string(),
        mId: Yup.array().nullable(),
      })
    ),
    defaultValues: {
      caption: defaultValue?.resourceData?.resource?.description,
      id: defaultValue?.resourceData?.resource?.id,
      url: defaultValue?.resourceData?.resource.url,
      licenseId: defaultValue?.resourceData?.resource.licenseId?.toString(),
      contributor:
        defaultValue?.resourceData?.resource?.contributor ||
        defaultValue?.resourceData?.userIbp?.name,
      rating: defaultValue?.resourceData?.resource?.rating,

      mId: defaultMediaGallery.map(({ value }) => value),
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
        ) : fieldName == "mediaGallery" ? (
          <SelectMultipleInputField name="mId" options={mediaGalleryList} label={""} />
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
