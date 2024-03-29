import "react-sortable-tree/style.css";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import usePages from "../sidebar/use-pages-sidebar";
import ReOrderTree from "./reorder-tree";

export default function ReOrderPagesModal() {
  const { t } = useTranslation();
  const p = usePages();

  const handleOnSave = async () => {
    await p.savePages();
    p.toggleEditing();
  };

  return (
    <>
      <Button mb={3} w="full" colorScheme="blue" onClick={p.toggleEditing}>
        {t("page:sidebar.reorder")}
      </Button>

      <Modal isOpen={p.isEditing} size="3xl" onClose={p.toggleEditing}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("page:sidebar.reorder")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReOrderTree />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleOnSave}>
              {t("common:save")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
