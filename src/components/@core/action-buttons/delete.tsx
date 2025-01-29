import { Button, useDisclosure } from "@chakra-ui/react";
import DeleteIcon from "@icons/delete";
import notification, { NotificationType } from "@utils/notification";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";

import SimpleActionButton from "./simple";

export default function DeleteActionButton({
  observationId,
  deleteFunc,
  title,
  deleteGnfinderName = false,
  description,
  deleted,
  refreshFunc = () => {
    return null;
  },
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { open, onClose, onOpen } = useDisclosure();
  const cancelRef = React.useRef(null);

  const handleOnDelete = async () => {
    const { success } = await deleteFunc(observationId);
    if (success) {
      notification(deleted, NotificationType.Success);
      if (deleteGnfinderName) {
        refreshFunc();
      }
      onClose();
      if (!deleteGnfinderName) {
        router.push("/");
      }
    }
  };

  return (
    <>
      <SimpleActionButton onClick={onOpen} icon={<DeleteIcon />} title={title} colorPalette="red" />
      <DialogRoot open={open} onOpenChange={onClose}>
        <DialogBackdrop>
          <DialogContent>
            <DialogHeader fontSize="lg" fontWeight="bold">
              🗑️ {title}
            </DialogHeader>

            <DialogBody>{description}</DialogBody>

            <DialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t("common:cancel")}
              </Button>
              <Button colorPalette="red" onClick={handleOnDelete} ml={3}>
                {t("common:delete")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogBackdrop>
      </DialogRoot>
    </>
  );
}
