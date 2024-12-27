import { Button, VisuallyHidden } from "@chakra-ui/react";
import { axParseBib } from "@services/document.service";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useFormContext } from "react-hook-form";
import { LuArrowRight } from "react-icons/lu";

export default function BibImportButton() {
  const { setValue } = useFormContext();
  const { t } = useTranslation();

  const handleOnBibUpload = async (e) => {
    const bibFile = e.target.files[0];
    if (bibFile.name.endsWith(".bib")) {
      const {
        success,
        data: { itemTypeId, ...bibFields },
      } = await axParseBib(bibFile);
      if (success) {
        setValue("itemTypeId", itemTypeId);
        setValue("bibFieldData", bibFields);
      }
    }
  };

  return (
    <Button
      cursor="pointer"
      as="label"
      size="sm"
      colorScheme="blue"
      borderRadius="3rem"
    >
      <LuArrowRight />
      <VisuallyHidden
        // type="file"
        as="input"
        id="bibtex-file"
        // accept=".bib"
        onChange={handleOnBibUpload}
      />
      {t("document:import_bibtex")}
    </Button>
  );
}
