import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import EditIcon from "@icons/edit";
import React, { useState } from "react";

import LinkTag from "../../common/link-tag";
import TagsEditor from "./tags-editor";

interface ITagsShowProps {
  items?;
  href?;
  objectId;
  updateFunc;
  queryFunc;
}

export default function TagsShow({
  items = [],
  objectId,
  updateFunc,
  queryFunc,
  href,
}: ITagsShowProps) {
  const [tags, setTags] = useState(items.map((i) => ({ label: i.name, value: i.id })));
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box gridColumn="2/5" mb={2}>
      {isOpen ? (
        <Box>
          <TagsEditor
            objectId={objectId}
            tags={tags}
            setTags={setTags}
            onClose={onClose}
            queryFunc={queryFunc}
            updateFunc={updateFunc}
          />
        </Box>
      ) : (
        <Box>
          {tags?.map((tag) => (
            <LinkTag href={href} label={tag.label} key={tag?.label} />
          ))}
          <IconButton
            variant="link"
            colorScheme="blue"
            onClick={onToggle}
            aria-label="Edit"
            icon={<EditIcon />}
          />
        </Box>
      )}
    </Box>
  );
}
