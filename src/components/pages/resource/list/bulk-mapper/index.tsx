import { Box, CheckboxGroup, Stack } from "@chakra-ui/react";
import { SubmitButton } from "@components/form/submit-button";
import CheckIcon from "@icons/check";
import { axGetAllMediaGallery, axGetAllResources } from "@services/media-gallery.service";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";

import useResourceFilter from "../../common/use-resource-filter";

export default function BulkMapperModal() {
  const { t } = useTranslation();
  const { onClose, open, bulkResourceIds, selectAll, unselectedResourceIds, filter } =
    useResourceFilter();

  const [mediaGalleryList, setMediaGalleryList] = useState<any[]>([]);
  const [mediaIds, setMediaIds] = useState<any[]>([]);

  useEffect(() => {
    axGetAllMediaGallery().then(setMediaGalleryList);
  }, []);

  const projectForm = useForm<any>({});

  const handleFormSubmit = async () => {
    const params = {
      ...filter,
      selectAll: selectAll,
      unSelected: unselectedResourceIds?.toString(),
      resourceIds: bulkResourceIds?.toString() || "",
      mediaGalleryIds: mediaIds?.toString() || "",
      isBulkPosting: true,
    };

    const { success } = await axGetAllResources(params);
    if (success) {
      notification(t("common:media_gallery.post.success"), NotificationType.Success);
    } else {
      notification(t("common:media_gallery.post.failure"));
    }
    onClose();
  };

  const handleOnChange = (e) => {
    setMediaIds(e);
  };

  return (
    <DialogRoot open={open} onOpenChange={onClose} lazyMount>
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>{t("common:media_gallery.select")}</DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          <FormProvider {...projectForm}>
            <form className="fade" onSubmit={projectForm.handleSubmit(handleFormSubmit)}>
              <Box mb={"4"}>
                <CheckboxGroup name="mediaGalleryId" onValueChange={handleOnChange}>
                  <Stack>
                    {mediaGalleryList.map(({ id, name }) => (
                      <Checkbox
                        value={String(id)}
                        alignItems="baseline"
                        name="mediaGalleryId"
                        key={id}
                        colorPalette={"blue"}
                      >
                        {name}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </Box>
              <SubmitButton leftIcon={<CheckIcon />}>
                {t("common:media_gallery.post.name")}
              </SubmitButton>
            </form>
          </FormProvider>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
