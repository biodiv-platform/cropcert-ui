import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Grid,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import ExternalBlueLink from "@components/@core/blue-link/external";
import {
  axEditResource,
  axGetResourceById,
  axQueryMediaGalleryTagsByText,
  axUpdateMediaGalleryTags,
} from "@services/media-gallery.service";
import { adminOrAuthor } from "@utils/auth";
import { formatTimeStampFromUTC } from "@utils/date";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import TagsShow from "../observation/show/info/tags";
import FieldShow from "./inline-edit";

interface CarouselResourceInfoProps {
  currentResource;
  licensesList;
  mediaGalleryList;
}

function CarouselResourceInfo({
  currentResource,
  licensesList,
  mediaGalleryList,
}: CarouselResourceInfoProps) {
  if (!currentResource) {
    return null;
  }

  const { t } = useTranslation();
  const canEdit = adminOrAuthor(currentResource?.userIbp?.id);
  const [isOpen, setIsOpen] = useState(false);
  const [resource, setResource] = useState(currentResource);
  const [tags, setTags] = useState(currentResource?.tags);
  const [fetchResource, setFetchResource] = useState(false);

  useEffect(() => {
    if (isOpen || fetchResource) {
      const fetchResourceData = async () => {
        try {
          const { data } = await axGetResourceById(currentResource.resource.id);
          setResource(data);
          setTags(data.resourceData.tags);
        } catch (error) {
          console.error("Error fetching resource:", error);
        }
      };
      fetchResourceData();
      setFetchResource(false);
    }
  }, [isOpen, fetchResource, currentResource?.resource.id]);

  return (
    <Box position="absolute" top={4} right={20} display="flex">
      <Popover
        placement="bottom-start"
        closeOnBlur={true}
        isLazy={true}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        <PopoverTrigger>
          <IconButton
            aria-label={t("common:resource.resource_info")}
            icon={<InfoOutlineIcon />}
            zIndex={4}
            isRound={true}
            _hover={{ backgroundColor: "gray" }}
            backgroundColor="#232323"
            width="50px"
            height="50px"
            color={"white"}
            bgSize={"8px"}
            size={"lg"}
          />
        </PopoverTrigger>
        <PopoverContent zIndex={4} minWidth="400px" maxHeight="800px">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{t("common:resource.resource_info")}</PopoverHeader>
          <PopoverBody>
            <Grid templateColumns="1fr 2fr" gap={3}>
              <Box>{t("common:resource.caption")}</Box>
              <FieldShow
                field="caption"
                fieldValue={resource?.resourceData?.resource?.description}
                updateFunc={axEditResource}
                setFetchResource={setFetchResource}
                defaultValue={resource}
                canEdit={canEdit}
              />

              <Box>{t("common:resource.contributor")}</Box>
              <FieldShow
                field="contributor"
                fieldValue={
                  resource?.resourceData?.resource?.contributor ||
                  resource?.resourceData?.userIbp?.name
                }
                updateFunc={axEditResource}
                setFetchResource={setFetchResource}
                defaultValue={resource}
                canEdit={canEdit}
              />

              <Box>{t("common:uploader")}</Box>
              <Box>
                <Link href={`/user/show/${resource?.resourceData?.userIbp?.id}`}>
                  <ExternalBlueLink>{resource?.resourceData?.userIbp?.name}</ExternalBlueLink>
                </Link>
              </Box>

              {resource?.resource?.uploadTime && (
                <>
                  <Box>{t("common:resource.upload_time")}</Box>
                  <Box>{formatTimeStampFromUTC(resource?.resourceData?.resource?.uploadTime)}</Box>
                </>
              )}

              <Box>{t("common:resource.license")}</Box>
              <FieldShow
                field="license"
                fieldValue={resource?.resourceData?.license?.name}
                updateFunc={axEditResource}
                setFetchResource={setFetchResource}
                defaultValue={resource}
                licensesList={licensesList}
                canEdit={canEdit}
              />

              <Box>{t("common:media_gallery.title")}</Box>
              <FieldShow
                field="mediaGallery"
                updateFunc={axEditResource}
                setFetchResource={setFetchResource}
                defaultValue={resource}
                canEdit={canEdit}
                mediaGalleryList={mediaGalleryList}
              />

              <Box>{t("common:resource.tags")}</Box>
              <Box>
                <TagsShow
                  items={tags}
                  objectId={resource?.resourceData?.resource?.id}
                  href={"/resource/list"}
                  updateFunc={axUpdateMediaGalleryTags}
                  queryFunc={axQueryMediaGalleryTagsByText}
                />
              </Box>
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

export default CarouselResourceInfo;
