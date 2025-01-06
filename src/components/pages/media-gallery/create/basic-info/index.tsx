import { Box, SimpleGrid, Stack } from "@chakra-ui/react";
import { PageHeading } from "@components/@core/layout";
import { DateTimeInputField } from "@components/form/datepicker";
import { TextBoxField } from "@components/form/text";
import { TextAreaField } from "@components/form/textarea";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function BasicInfo({ isEdit }) {
  const { t } = useTranslation();

  return (
    <div>
      <Stack flexDirection={["column", "row"]} alignItems="top" mb={1}>
        <PageHeading mb={4} mr={4}>
          ℹ️ {t("Media Gallery Information")}
        </PageHeading>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 0, md: 4 }}>
        <Box>
          <TextBoxField name="name" label={t("Name")} required={true} />
        </Box>
        {!isEdit && (
          <Box>
            <DateTimeInputField name="fromDate" label={t("Publication date")} />
          </Box>
        )}
      </SimpleGrid>

      <Box mt={4}>
        <TextAreaField name="description" label={t("Description")} />
      </Box>
    </div>
  );
}
