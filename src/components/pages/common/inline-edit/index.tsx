import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import ExternalBlueLink from "@components/@core/blue-link/external";
import EditIcon from "@icons/edit";
import React, { useState } from "react";

import FieldEditor from "./field-editor";

interface IFieldProps {
  field?;
  fieldValue?;
  href?;
  updateFunc;
  defaultValue;
  licensesList?;
  canEdit;
  setFetch?;
}

export default function FieldShow({
  field,
  fieldValue,
  updateFunc,
  defaultValue,
  licensesList,
  canEdit,
  setFetch,
}: IFieldProps) {
  const [fieldName] = useState(field);

  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box>
      {isOpen && canEdit ? (
        <FieldEditor
          fieldName={fieldName}
          onClose={onClose}
          updateFunc={updateFunc}
          defaultValue={defaultValue}
          licensesList={licensesList}
          setFetch={setFetch}
        />
      ) : (
        <Box>
          {fieldName == "license" ? (
            <ExternalBlueLink href={defaultValue?.license?.url}>{fieldValue}</ExternalBlueLink>
          ) : (
            fieldValue
          )}
          {canEdit && (
            <IconButton
              variant="link"
              colorScheme="blue"
              onClick={onToggle}
              aria-label="Edit"
              icon={<EditIcon />}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
