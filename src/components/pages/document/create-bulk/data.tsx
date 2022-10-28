import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Badge, Box } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import { axGetDocumentBibFields, axParseBib } from "@services/document.service";
import { BULK_TABLE_STATIC_COLUMNS, DOCUMENT_STATUS_BADGE } from "@static/document";
import { getBibFieldsMeta } from "@utils/document";
import { readFileContents } from "@utils/text";
import bibtexParse from "bibtex-parse";
import { nanoid } from "nanoid";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import * as Yup from "yup";

import { transformDocumentCreatePayload } from "../common/create-util";

export const bibTableConditionalStyles = [
  {
    when: (row) => !row.isValid,
    style: {
      background: "var(--chakra-colors-red-100)",
    },
  },
  {
    when: (row) => row.isValid,
    style: {
      background: "var(--chakra-colors-green-100)",
    },
  },
];

export const parseBibFileList = async (file, documentTypes, licensesList) => {
  const text = await readFileContents(file);
  const rawBibs = bibtexParse.parse(text).filter((o) => o.itemtype !== "comment");
  const parsedBibs: any[] = [];
  let hasErrors = false;

  for (const bib of rawBibs) {
    const bibFile = new File([new Blob([bib.raw], { type: "text/plain" })], `${bib?.key}.bib`);

    const parsed = await axParseBib(bibFile);
    const validationRules = await axGetDocumentBibFields(parsed.data.itemTypeId);

    if (parsed.success && validationRules.success) {
      const meta = getBibFieldsMeta(validationRules.data);
      let isValid = true;

      try {
        Yup.object().shape(meta.schema).validateSync(parsed.data);
      } catch (e) {
        console.error(e);
        isValid = false;
      }

      parsedBibs.push({
        fields: transformDocumentCreatePayload(
          {
            licenseId: licensesList?.[0]?.value,
            bibFieldData: parsed.data,
          },
          documentTypes,
          true
        ),
        meta,
        isValid,
        id: nanoid(),
      });
    } else {
      hasErrors = true;
    }
  }

  return { parsedBibs, hasErrors };
};

export const bulkTableColumns = [
  ...BULK_TABLE_STATIC_COLUMNS.map((column) => ({
    name: column,
    width: "140px",
    cell: (row) => (
      <Box title={row.fields.bibFieldData[column]} noOfLines={2}>
        {row.fields.bibFieldData[column] || "-"}
      </Box>
    ),
  })),
  {
    name: "status",
    width: "90px",
    cell: ({ status = "Pending" }) => (
      <Badge variant="solid" colorScheme={DOCUMENT_STATUS_BADGE[status]}>
        {status}
      </Badge>
    ),
  },
  {
    name: "documentId",
    width: "120px",
    cell: ({ documentId }) => {
      const { t } = useTranslation();

      return documentId ? (
        <BlueLink href={`/document/show/${documentId}`}>
          {t("common:view")}
          <ArrowForwardIcon />
        </BlueLink>
      ) : null;
    },
  },
];
