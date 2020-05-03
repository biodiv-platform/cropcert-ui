import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/core";
import { axDeletePageByPageId } from "@services/page.service";
import { PAGE_DELETE } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import { Page } from "types/pages";

export default function DeletePageModal({ update }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = React.useRef();
  const [page, setPage] = useState<Page>();

  useListener(
    (page) => {
      setPage(page);
      onOpen();
    },
    [PAGE_DELETE]
  );

  const handleOnDelete = async () => {
    const { success } = await axDeletePageByPageId(page.id);
    if (success) {
      update();
      onClose();
    }
  };

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay />
      {page && (
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Page
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure about deleting page named <b>{page.title}</b>?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button variantColor="red" onClick={handleOnDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}
