import { Box, SimpleGrid, Stack } from "@chakra-ui/react";
import { PageHeading } from "@components/@core/layout";
import { DateTimeInputField } from "@components/form/datepicker";
import { RichTextareaField } from "@components/form/rich-textarea";
import { SelectInputField } from "@components/form/select";
import { TextBoxField } from "@components/form/text";
import { axGetDocumentBibFields } from "@services/document.service";
import { getBibFieldsMeta } from "@utils/document";
import notification from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import BibImportButton from "../bib-import";
import TagsInput from "./tags-input";

interface BasicInfoProps {
  documentTypes;
  setBibField;
  canImport?: boolean;
  showTags?: boolean;
  licensesList;
}

export default function BasicInfo({
  documentTypes,
  setBibField,
  canImport,
  showTags = true,
  licensesList,
}: BasicInfoProps) {
  const form = useFormContext();
  const { t } = useTranslation();
  const itemTypeIdWatch = form.watch("itemTypeId");

  const getBibOption = async () => {
    const { success, data: fields } = await axGetDocumentBibFields(itemTypeIdWatch);
    if (success) {
      setBibField(getBibFieldsMeta(fields));
    } else {
      notification(t("document:bib.schema.error"));
    }
  };

  useEffect(() => {
    if (itemTypeIdWatch) {
      getBibOption();
    }
  }, [itemTypeIdWatch]);

  return (
    <div>
      <Stack flexDirection={["column", "row"]} alignItems="top" mb={1}>
        <PageHeading mb={4} mr={4} size={"3xl"}>
          ℹ️ {t("document:basic_information")}
          {canImport && <BibImportButton />}
        </PageHeading>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: 0, md: 4 }}>
        <Box gridColumn="1/4">
          <TextBoxField name="bibFieldData.title" label={t("form:title")} required={true} />
        </Box>
        <SelectInputField
          name="itemTypeId"
          label={t("document:type")}
          options={documentTypes}
          isRequired={true}
          isControlled={true}
          shouldPortal={true}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 0, md: 4 }}>
        <div>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 0, md: 4 }}>
            <Box width={"full"}>
              <DateTimeInputField name="fromDate" label={t("document:publication_date")} />
            </Box>
            <SelectInputField
              name="licenseId"
              label={t("form:license")}
              options={licensesList}
              isRequired={true}
              isControlled={true}
              shouldPortal={true}
            />
          </SimpleGrid>
          {showTags && <TagsInput />}
        </div>
        <div>
          <RichTextareaField name="bibFieldData.abstract" label={t("document:description")} />
        </div>
      </SimpleGrid>
    </div>
  );
}
