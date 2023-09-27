import { AspectRatio, Box, IconButton, Image, useCheckbox } from "@chakra-ui/react";
import styled from "@emotion/styled";
import DeleteIcon from "@icons/delete";
import { RESOURCE_SIZE } from "@static/constants";
import { getResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";

import useManageMediaGallery from "../media-gallery-upload-provider";

const ImageBox = styled.div`
  cursor: pointer;
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 0.4rem;

  .icon {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0.7rem;
  }

  .remove {
    position: absolute;
    margin: 0;
    top: 0;
    left: 0;
  }
`;

const Checkbox = (props: any) => {
  const { t } = useTranslation();

  const getImageThumb = (resourceURL) => {
    return getResourceThumbnail(RESOURCE_CTX.MY_UPLOADS, "1" + resourceURL, RESOURCE_SIZE.DEFAULT);
  };

  const imageURL = useMemo(() => getImageThumb("/" + props.asset.path), []);

  const { addToMediaGalleryAssets, removeMediaGalleryAsset, removeAsset } = useManageMediaGallery();

  const handleOnChange = (e) => {
    e.target.checked
      ? addToMediaGalleryAssets(props.asset.hashKey)
      : removeMediaGalleryAsset(props.asset.hashKey);
  };

  const { getInputProps, getCheckboxProps } = useCheckbox(props);

  return (
    <Box as="label" className="fade" aria-checked={props.isChecked}>
      <input {...getInputProps()} onChange={handleOnChange} required={false} />
      <AspectRatio
        ratio={1}
        {...getCheckboxProps()}
        borderRadius="lg"
        overflow="hidden"
        borderWidth="2px"
        bg="white"
        _checked={{ borderColor: "blue.500", bg: "blue.50" }}
        style={undefined}
      >
        <ImageBox>
          <IconButton
            className="remove fade"
            variant="ghost"
            colorScheme="red"
            hidden={props.isChecked}
            aria-label={t("common:delete")}
            onClick={() => removeAsset(props.asset)}
            icon={<DeleteIcon />}
          />
          <Image
            style={{ filter: "none" }}
            boxSize="full"
            objectFit="cover"
            src={imageURL}
            borderRadius="md"
            alt={props.asset.fileName}
          />
        </ImageBox>
      </AspectRatio>
    </Box>
  );
};

export default Checkbox;
