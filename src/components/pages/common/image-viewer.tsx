import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Icon, Image } from "@chakra-ui/react";
import DeleteIcon from "@icons/delete";
import { axDeleteResource, axGetAllMediaGallery } from "@services/media-gallery.service";
import { axGetLicenseList } from "@services/resources.service";
import { adminOrAuthor } from "@utils/auth";
import { getNextResourceRAW } from "@utils/media";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import CarouselResourceInfo from "./resource-info";

const ImageViewer = ({ resourceData, initialIndex, onClose, loadNextPage }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const [licensesList, setLicenseList] = useState([]);

  const [mediaGalleryList, setMediaGalleryList] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const { data: licenses } = await axGetLicenseList();
        setLicenseList(licenses);
      } catch (error) {
        console.error("Error fetching licenses:", error);
      }
    };

    fetchLicenses();
  }, []);

  useEffect(() => {
    axGetAllMediaGallery().then(setMediaGalleryList);
  }, []);

  const imageUrls = resourceData.l.map((o) => getNextResourceRAW(o.resource?.id));

  const currentResource = resourceData.l[currentIndex];

  const hasAccess = adminOrAuthor(currentResource?.resource.uploaderId);

  const handleNext = async () => {
    if (currentIndex === resourceData.l.length - 1) {
      await loadNextPage();
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % resourceData.l.length);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + resourceData.l.length) % resourceData.l.length);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(t("common:resource.delete.info"));

    if (confirmed) {
      const { success } = await axDeleteResource(currentResource.resource.id);

      if (success) {
        notification(`${t("common:resource.delete.success")}`, NotificationType.Success);

        if (currentIndex === resourceData.n - 1) {
          handlePrev();
        } else {
          handleNext();
        }
      }
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="rgba(0, 0, 0, 0.8)"
      zIndex={1000}
    >
      <Button
        position="absolute"
        top="50%"
        left={4}
        transform="translateY(-50%)"
        onClick={handlePrev}
        colorScheme="black"
        disabled={currentIndex === 0}
        backgroundColor="#232323"
        _hover={{ backgroundColor: "gray" }}
        borderRadius="50%"
        width="50px"
        height="50px"
      >
        <Icon as={ChevronLeftIcon} boxSize={10} />
      </Button>
      <Button
        position="absolute"
        top="50%"
        right={4}
        transform="translateY(-50%)"
        onClick={handleNext}
        colorScheme="black"
        disabled={resourceData.n === currentIndex + 1}
        backgroundColor="#232323"
        _hover={{ backgroundColor: "gray" }}
        borderRadius="50%"
        width="50px"
        height="50px"
      >
        <Icon as={ChevronRightIcon} boxSize={10} />
      </Button>

      <Box position="absolute" top={0} right={4}>
        <Button
          position="relative"
          top={5}
          right={4}
          onClick={onClose}
          colorScheme="black"
          borderRadius="50%"
          backgroundColor="#232323"
          _hover={{ backgroundColor: "gray" }}
          width="50px"
          height="50px"
        >
          <Icon as={CloseIcon} />
        </Button>
      </Box>

      <Box position="absolute" top={1} right={2}>
        <CarouselResourceInfo
          currentResource={resourceData.l[currentIndex]}
          licensesList={licensesList}
          mediaGalleryList={mediaGalleryList}
        />
      </Box>

      {hasAccess && (
        <Box position="absolute" top={0} right={4}>
          <Button
            position="relative"
            top={5}
            right={130}
            onClick={handleDelete}
            colorScheme="black"
            borderRadius="50%"
            backgroundColor="#232323"
            _hover={{ backgroundColor: "gray" }}
            width="50px"
            height="50px"
          >
            <Icon as={DeleteIcon} />
          </Button>
        </Box>
      )}

      <Box position="relative">
        <Image
          src={imageUrls[currentIndex]}
          maxH="80vh"
          maxW="90vw"
          objectFit="contain"
          loading="lazy"
        />
      </Box>
    </Box>
  );
};

export default ImageViewer;
