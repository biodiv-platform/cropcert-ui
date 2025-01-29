import { Button, useDisclosure } from "@chakra-ui/react";
import { axDeleteUser } from "@services/user.service";
import notification, { NotificationType } from "@utils/notification";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";

export default function DeleteAccount({ userId }) {
  const { t } = useTranslation();
  const { open, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const router = useRouter();

  const handleOnDelete = async () => {
    const { success } = await axDeleteUser(userId);
    if (success) {
      notification(t("user:delete.success"), NotificationType.Success);
      onClose();
      router.push("/user/list");
    }
  };

  return (
    <>
      <Button w="full" colorPalette="red" onClick={onOpen} mb={4}>
        {t("common:delete")}
      </Button>

      <DialogRoot open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader fontSize="lg" fontWeight="bold">
            {t("user:delete.title")}
          </DialogHeader>

          <DialogBody>{t("user:delete.message")}</DialogBody>

          <DialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {t("common:cancel")}
            </Button>
            <Button colorPalette="red" onClick={handleOnDelete} ml={3}>
              {t("common:delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
}
