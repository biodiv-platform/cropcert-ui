import {
  Button,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  HStack,
} from "@chakra-ui/react";
import DeleteIcon from "@icons/delete";
import notification, { NotificationType } from "@utils/notification";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

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

  const handleOnDelete = async () => {
    const { success } = await deleteFunc(observationId);
    if (success) {
      notification(deleted, NotificationType.Success);
      if (deleteGnfinderName) {
        refreshFunc();
      }
      if (!deleteGnfinderName) {
        router.push("/");
      }
    }
  };

  return (
    <HStack>
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger asChild>
          <Button variant="outline" colorScheme="red">
            <DeleteIcon />
            {title}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🗑️ {title}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p>{description}</p>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">{t("common:cancel")}</Button>
            </DialogActionTrigger>
            <Button colorScheme="red" onClick={handleOnDelete}>
              {t("common:delete")}
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
}
