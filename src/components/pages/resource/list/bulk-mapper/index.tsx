import {
  Box,
  Checkbox,
  CheckboxGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { SubmitButton } from "@components/form/submit-button";
import CheckIcon from "@icons/check";
import { axBulkResourceMapping, axGetAllMediaGallery } from "@services/media-gallery.service";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import useResourceFilter from "../../common/use-resource-filter";

export default function BulkMapperModal() {
  const { t } = useTranslation();
  const { onClose, isOpen, bulkResourceIds, selectAll, unselectedResourceIds } =
    useResourceFilter();

  const [mediaGalleryList, setMediaGalleryList] = useState<any[]>([]);
  const [mediaIds, setMediaIds] = useState<any[]>([]);

  const checkBoxValue = [];

  useEffect(() => {
    axGetAllMediaGallery().then(setMediaGalleryList);
  }, []);

  const projectForm = useForm<any>({});

  const handleFormSubmit = async () => {
    const payload = {
      resourceIds: bulkResourceIds,
      mediaGalleryIds: mediaIds,
    };
    const params = {
      selectAll: selectAll,
      unSelected: unselectedResourceIds,
    };
    const { success } = await axBulkResourceMapping(params, payload);
    if (success) {
      notification(t("common:media_gallery.post.success"), NotificationType.Success);
    } else {
      notification(t("common:media_gallery.post.failure"));
    }
    onClose();
  };

  const handleOnChange = (v) => {
    setMediaIds(v);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("common:media_gallery.select")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormProvider {...projectForm}>
            <form className="fade" onSubmit={projectForm.handleSubmit(handleFormSubmit)}>
              <Box mb={"4"}>
                <CheckboxGroup defaultValue={checkBoxValue} onChange={handleOnChange}>
                  <Stack>
                    {mediaGalleryList.map(({ id, name }) => (
                      <Checkbox value={String(id)} alignItems="baseline" name="mediaGalleryId">
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
