import { Box, Button } from "@chakra-ui/react";
import Table from "@components/@core/table";
import CheckIcon from "@icons/check";
import { axCreateDocument } from "@services/document.service";
import { DOCUMENT_UPLOAD_STATUS } from "@static/document";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

import { transformDocumentCreatePayload } from "../../common/create-util";
import { bibTableConditionalStyles, bulkTableColumns } from "../data";
import DocumentEdit from "./document-edit";

export default function BibTable(props) {
  const { t } = useTranslation();
  const [items, setItems] = useState(props.items);

  const updateItemsRow = (items, item) => {
    return items.map((_item) => (_item.id === item.id ? item : _item));
  };

  const handleOnUpdate = (item) => setItems(updateItemsRow(items, item));

  const handleOnSubmit = async () => {
    let newItems = [...items];

    for (let i = 0; i < newItems.length; i++) {
      const _item = newItems[i];

      if (_item.isValid) {
        const payload = transformDocumentCreatePayload(_item.fields, props.documentTypes);
        const { success, data } = await axCreateDocument(payload);

        newItems = updateItemsRow(newItems, {
          ..._item,
          documentId: data?.document?.id,
          status: success ? DOCUMENT_UPLOAD_STATUS.CREATED : DOCUMENT_UPLOAD_STATUS.FAILED,
        });
        setItems(newItems);
      } else {
        newItems = updateItemsRow(newItems, { ..._item, status: DOCUMENT_UPLOAD_STATUS.SKIPPED });
        setItems(newItems);
      }
    }
  };

  return (
    <div>
      <Box mb={6}>
        <Table
          data={items}
          columns={bulkTableColumns}
          conditionalRowStyles={bibTableConditionalStyles}
          expandableRows={true}
          expandableRowsComponent={DocumentEdit}
          expandableRowsComponentProps={{
            licensesList: props.licensesList,
            documentTypes: props.documentTypes,
            onUpdate: handleOnUpdate,
          }}
        />
      </Box>

      <Button colorScheme="blue" leftIcon={<CheckIcon />} onClick={handleOnSubmit}>
        {t("form:uploader.upload")}
      </Button>
    </div>
  );
}
