import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import ExternalBlueLink from "@components/@core/blue-link/external";
import EditIcon from "@icons/edit";
import React, { useState } from "react";

import { Tag } from "@/components/ui/tag";

import FieldEditor from "./field-editor";

interface IFieldProps {
  field?;
  fieldValue?;
  href?;
  updateFunc;
  defaultValue;
  licensesList?;
  canEdit;
  setFetchResource?;
  mediaGalleryList?;
}

export default function FieldShow({
  field,
  fieldValue,
  updateFunc,
  defaultValue,
  licensesList,
  canEdit,
  setFetchResource,
  mediaGalleryList,
}: IFieldProps) {
  const [fieldName] = useState(field);

  const { open, onToggle, onClose } = useDisclosure();

  const convertToMediaList = (data) => {
    return data?.map((item) => {
      return {
        label: item?.name,
        value: item?.id?.toString(),
      };
    });
  };

  return (
    <Box>
      {open && canEdit ? (
        <FieldEditor
          fieldName={fieldName}
          onClose={onClose}
          updateFunc={updateFunc}
          defaultValue={defaultValue}
          licensesList={licensesList}
          setFetchResource={setFetchResource}
          defaultMediaGallery={convertToMediaList(defaultValue.mediaGallery)}
          mediaGalleryList={convertToMediaList(mediaGalleryList)}
        />
      ) : (
        <Box>
          {fieldName == "license" ? (
            <ExternalBlueLink href={defaultValue?.license?.url}>{fieldValue}</ExternalBlueLink>
          ) : fieldName == "mediaGallery" ? (
            defaultValue.mediaGallery?.map((item) => (
              <Tag size="sm" key={item.name} colorPalette="blue" mb={2} mr={2}>
                {item.name}
              </Tag>
            ))
          ) : (
            fieldValue
          )}
          {canEdit && (
            <IconButton
              variant="plain"
              colorPalette="blue"
              onClick={onToggle}
              aria-label="Edit"
              size={"xs"}
            >
              {<EditIcon />}
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
}
