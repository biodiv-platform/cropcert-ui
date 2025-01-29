import { Flex, Image, Input } from "@chakra-ui/react";
import Rating from "@components/@core/rating";
import { selectStyles } from "@components/form/configs";
import ResourceTagsEditor from "@components/pages/common/tags-editor";
import SITE_CONFIG from "@configs/site-config";
import styled from "@emotion/styled";
import useGlobalState from "@hooks/use-global-state";
import StarIcon from "@icons/star";
import StarOutlineIcon from "@icons/star-outline";
import { AssetStatus } from "@interfaces/custom";
import { ResourceMediaGallery } from "@interfaces/media";
import {
  axGetAllMediaGallery,
  axQueryMediaGalleryTagsByText,
} from "@services/media-gallery.service";
import { MENU_PORTAL_TARGET, RESOURCE_SIZE } from "@static/constants";
import { ASSET_TYPES, LOCAL_ASSET_PREFIX } from "@static/observation-create";
import { getResourceThumbnail, getYoutubeImage, RESOURCE_CTX } from "@utils/media";
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";

import { CloseButton } from "@/components/ui/close-button";

import useManageMediaGallery from "../media-gallery-upload-provider";
import StatusIcon from "../statusicon";

const ImageBox = styled.div`
  flex-grow: 1;
  margin-bottom: 0.5rem;
  position: relative;
  img {
    position: absolute;
    height: 100%;
    width: 100%;
  }
  svg {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0.5rem;
  }
`;

interface IResourceCardProps {
  resource: ResourceMediaGallery;
  index: number;
  isMultiUpload: boolean;
}

export const getImageThumb = (resource, userID) => {
  if (!resource) return;

  if (resource.blobURL) return resource.blobURL;

  if (resource.status === AssetStatus.Uploaded) {
    return resource.type?.match(ASSET_TYPES.VIDEO)
      ? getYoutubeImage(resource.url)
      : resource.path?.match(LOCAL_ASSET_PREFIX)
      ? getResourceThumbnail(
          RESOURCE_CTX.MY_UPLOADS,
          userID + resource.path,
          RESOURCE_SIZE.RECENT_THUMBNAIL
        )
      : getResourceThumbnail(resource.context, resource.path, RESOURCE_SIZE.DEFAULT);
  }

  try {
    if (resource.type.match(ASSET_TYPES.IMAGE) && resource.blob) {
      return window.URL.createObjectURL(resource.blob);
    }
  } catch (e) {
    console.error(e);
  }

  return undefined;
};

export default function ResourceCard({ resource, index, isMultiUpload }: IResourceCardProps) {
  const { removeMediaGalleryAsset, updateMediaGalleryAssets, licensesList } =
    useManageMediaGallery();

  const { user } = useGlobalState();

  const imageURL = useMemo(() => getImageThumb(resource, user?.id), []);

  const [mediaGalleryList, setMediaGalleryList] = useState<any[]>([]);

  const mapTags = (tags) => tags?.map(({ id, name }) => ({ label: name, value: id }));

  const mediaOptionList = mediaGalleryList.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  useEffect(() => {
    axGetAllMediaGallery().then(setMediaGalleryList);
  }, [resource]);

  const handleMediaGalleryChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    updateMediaGalleryAssets(index, resource.hashKey, "mId", selectedValues);
  };

  const licenseId = resource.licenseId ? resource.licenseId : SITE_CONFIG.LICENSE.DEFAULT;

  const [tags, setTags] = useState(resource?.tags);
  useEffect(() => {
    setTags(resource?.tags);
  }, [resource?.tags]);

  return (
    <Flex
      className="fade"
      minH="25rem"
      borderRadius="lg"
      bg="white"
      flexDir="column"
      border="1px solid"
      borderColor="gray.300"
      position="relative"
      p={2}
      key={resource.hashKey}
    >
      <ImageBox>
        <Image objectFit="cover" borderRadius="md" src={imageURL} loading="lazy" />
        <StatusIcon type={resource.status} />
      </ImageBox>
      <CloseButton
        position="absolute"
        top="0"
        right="0"
        size="sm"
        m={4}
        bg="red.500"
        _hover={{ bg: "red.500" }}
        color="white"
        onClick={() => removeMediaGalleryAsset(resource.hashKey)}
      />
      <Flex direction="column" flexShrink={0}>
        <Select
          placeholder="Select licence"
          defaultValue={licensesList.find((l) => l.value == licenseId)}
          menuPortalTarget={MENU_PORTAL_TARGET}
          options={licensesList}
          name={`opt-${resource.id}`}
          inputId={`opt-${resource.id}`}
          styles={selectStyles}
          onChange={(v) => updateMediaGalleryAssets(index, resource.hashKey, "licenseId", v.value)}
        />
        <Input
          placeholder="Contributor"
          mt={2}
          name={`contributor-${resource.id}`}
          defaultValue={resource.contributor}
          onBlur={(e) =>
            updateMediaGalleryAssets(index, resource.hashKey, "contributor", e?.target?.value)
          }
        />
        <Input
          placeholder="Caption"
          my={2}
          name={`caption-${resource.id}`}
          defaultValue={resource.caption}
          onBlur={(e) =>
            updateMediaGalleryAssets(index, resource.hashKey, "caption", e?.target?.value)
          }
        />
        {isMultiUpload && (
          <Select
            placeholder="MediaGallery"
            menuPortalTarget={MENU_PORTAL_TARGET}
            options={mediaOptionList}
            name={"mediaGalleryId"}
            inputId={`opt-${resource.id}`}
            styles={selectStyles}
            isMulti={true}
            onChange={handleMediaGalleryChange}
          />
        )}

        <ResourceTagsEditor
          tags={mapTags(tags)}
          queryFunc={axQueryMediaGalleryTagsByText}
          onChange={(v) => updateMediaGalleryAssets(index, resource.hashKey, "tags", v)}
        ></ResourceTagsEditor>

        <Flex justify="center" fontSize="1.5rem" lineHeight="1rem">
          <Rating
            initialRating={resource.rating}
            onChange={(v) => updateMediaGalleryAssets(index, resource.hashKey, "rating", v)}
            emptySymbol={<StarOutlineIcon />}
            fullSymbol={<StarIcon />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
