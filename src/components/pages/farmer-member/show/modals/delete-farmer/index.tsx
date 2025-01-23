import { Button, useDisclosure } from "@chakra-ui/react";
import { axDeleteFarmerById } from "@services/farmer.service";
import { FARMER_DELETE } from "@static/events";
import notification, { NotificationType } from "@utils/notification";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { useListener } from "react-gbus";

import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";

const DeleteFarmerModal = () => {
  const [farmerId, setFarmerId] = useState(null);
  const { open, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { t } = useTranslation();

  const handleConfirmDelete = async () => {
    try {
      // delete farmer
      const { success } = await axDeleteFarmerById(farmerId);

      if (success) {
        onClose();
        notification(t("traceability:farmer.delete_farmer_success"), NotificationType.Success);

        // navigate to the previous page
        router.push("/farmer/list");
      }
    } catch (err) {
      console.error(err);
      notification(t("traceability:farmer.delete_farmer_error"), NotificationType.Error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  useListener(
    (f) => {
      setFarmerId(f.farmerId);
      onOpen();
    },
    [FARMER_DELETE]
  );

  return (
    <DialogRoot open={open} onOpenChange={onClose}>
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>{t("traceability:farmer.delete_farmer_heading")}</DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>{t("traceability:farmer.delete_farmer_message")}</DialogBody>

        <DialogFooter>
          <Button colorPalette="red" mr={3} onClick={handleConfirmDelete}>
            {t("traceability:farmer.delete_farmer_confirm")}
          </Button>
          <Button onClick={handleCancel}>{t("traceability:farmer.delete_farmer_cancel")}</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default DeleteFarmerModal;
