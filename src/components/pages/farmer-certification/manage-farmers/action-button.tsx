import { ArrowForwardIcon, DownloadIcon } from "@chakra-ui/icons";
import { Button, Flex, Stack } from "@chakra-ui/react";
import useInspectionReport from "@hooks/use-inspection-report";
import NextLink from "next/link";
import React, { useState } from "react";
import DeleteIcon from "src/icons/delete";

export default function ActionButton({ ccCode, syncStatus, isOnline, pendingReports }) {
  const [isLoading, setIsLoading] = useState(false);
  const { removeCCFarmers, downloadCCFarmers } = useInspectionReport();

  const handleOnRemove = async () => {
    if (pendingReports) {
      if (
        !confirm(
          `There are ${pendingReports} certification forms that have not been uploaded.\nDo you want to delete the farmers list?`
        )
      ) {
        return;
      }
    }
    setIsLoading(true);
    await removeCCFarmers(ccCode);
    setIsLoading(false);
  };

  const handleOnDownload = async () => {
    setIsLoading(true);
    await downloadCCFarmers(ccCode);
    setIsLoading(false);
  };

  return (
    <Flex justifyContent="flex-end">
      {syncStatus ? (
        <Stack w={{ base: "full", md: "11rem" }}>
          <NextLink
            href={`/farmer-certification/inspection-report/select-farmer?feCCCode=${ccCode}`}
            passHref={true}
          >
            <Button as="a" colorScheme="blue" size="sm" rightIcon={<ArrowForwardIcon />} mb={4}>
              Farmers List ({syncStatus?.farmersCount})
            </Button>
          </NextLink>
          <Button
            className="download"
            colorScheme="red"
            isLoading={isLoading}
            onClick={handleOnRemove}
            loadingText="Deleting"
            leftIcon={<DeleteIcon />}
            size="sm"
          >
            Remove Farmers List
          </Button>
        </Stack>
      ) : (
        <Button
          size="sm"
          className="download"
          colorScheme="teal"
          onClick={handleOnDownload}
          isLoading={isLoading}
          isDisabled={!isOnline}
          loadingText="Downloading"
          leftIcon={<DownloadIcon />}
          w="11rem"
        >
          Download Farmers
        </Button>
      )}
    </Flex>
  );
}
