import { Button, VisuallyHidden } from "@chakra-ui/react";
import { axParseBib } from "@services/document.service";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useFormContext } from "react-hook-form";
import { LuArrowUp } from "react-icons/lu";

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
    <Button cursor="pointer" as="label" colorPalette="blue" borderRadius="full" ml={4}>
      <LuArrowUp />
      <VisuallyHidden asChild>
        <input
          type="file"
          id="bibtex-file"
          accept=".bib"
          placeholder="Search..."
          onChange={handleOnBibUpload}
        />
      </VisuallyHidden>
      {t("document:import_bibtex")}
    </Button>
  );
}
