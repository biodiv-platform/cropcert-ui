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
}

function CarouselResourceInfo({ currentResource, licensesList }: CarouselResourceInfoProps) {
  if (!currentResource) {
    return null;
  }

  const { t } = useTranslation();

  const canEdit = adminOrAuthor(currentResource?.userIbp?.id);
  const [isOpen, setIsOpen] = useState(false);

  const [resource, setResource] = useState(currentResource);

  const [tags, setTags] = useState(currentResource?.tags);

  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    if (isOpen || fetch) {
      const fetchResource = async () => {
        try {
          const { data } = await axGetResourceById(currentResource.resource.id);
          setResource(data);
          setTags(data.tags);
        } catch (error) {
          console.error("Error fetching resource:", error);
        }
      };
      fetchResource();
      setFetch(false);
    }
  }, [isOpen, fetch, currentResource?.tags]);

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
        <PopoverContent zIndex={4} maxWidth="600px" maxHeight="800px">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{t("common:resource.resource_info")}</PopoverHeader>
          <PopoverBody>
            <Grid templateColumns="1fr 2fr" gap={3}>
              <Box>{t("common:resource.caption")}</Box>
              <FieldShow
                field="caption"
                fieldValue={resource?.resource?.description}
                updateFunc={axEditResource}
                setFetch={setFetch}
                defaultValue={resource}
                canEdit={canEdit}
              />

              <Box>{t("common:resource.contributor")}</Box>
              <FieldShow
                field="contributor"
                fieldValue={resource?.resource?.contributor || resource?.userIbp?.name}
                updateFunc={axEditResource}
                setFetch={setFetch}
                defaultValue={resource}
                canEdit={canEdit}
              />

              <Box>{t("common:uploader")}</Box>
              <Box>
                <Link href={`/user/show/${resource?.userIbp?.id}`}>
                  <ExternalBlueLink>{resource?.userIbp?.name}</ExternalBlueLink>
                </Link>
              </Box>

              {resource?.resource?.uploadTime && (
                <>
                  <Box>{t("common:resource.upload_time")}</Box>
                  <Box>{formatTimeStampFromUTC(resource?.resource?.uploadTime)}</Box>
                </>
              )}

              <Box>{t("common:resource.license")}</Box>
              <FieldShow
                field="license"
                fieldValue={resource?.license?.name}
                updateFunc={axEditResource}
                setFetch={setFetch}
                defaultValue={resource}
                licensesList={licensesList}
                canEdit={canEdit}
              />

              <Box>{t("common:resource.tags")}</Box>
              <Box>
                <TagsShow
                  items={tags}
                  objectId={resource?.resource?.id}
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
