import { SelectAsyncInputField } from "@components/form/select-async";
import { axQueryDocumentTagsByText } from "@services/document.service";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const onTagsQuery = async (q) => {
  const { data } = await axQueryDocumentTagsByText(q);
  return data.map((tag) => ({ label: tag.name, value: tag.id, version: tag.version }));
};

export default function TagsInput() {
  const { t } = useTranslation();

  return (
    <SelectAsyncInputField
      placeholder={t("Tags")}
      name="tags"
      multiple={true}
      onQuery={onTagsQuery}
    />
  );
}
