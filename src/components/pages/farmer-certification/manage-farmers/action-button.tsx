import { Button, Flex, Stack } from "@chakra-ui/core";
import useInspectionReport from "@hooks/use-inspection-report";
import NextLink from "next/link";
import React, { useState } from "react";

export default function ActionButton({ ccCode, ccName, syncStatus }) {
  const [isLoading, setIsLoading] = useState(false);
  const { removeCCFarmers, downloadCCFarmers } = useInspectionReport();

  const handleOnRemove = async () => {
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
            <Button as="a" variantColor="blue" size="sm" rightIcon="arrow-forward" mb={4}>
              Farmers List ({syncStatus?.farmersCount})
            </Button>
          </NextLink>
          <Button
            className="download"
            variantColor="red"
            isLoading={isLoading}
            onClick={handleOnRemove}
            loadingText="Deleting"
            leftIcon="delete"
            size="sm"
          >
            Remove Farmers List
          </Button>
        </Stack>
      ) : (
        <Button
          size="sm"
          className="download"
          variantColor="teal"
          onClick={handleOnDownload}
          isLoading={isLoading}
          loadingText="Downloading"
          leftIcon="download"
          w="11rem"
        >
          Download Farmers
        </Button>
      )}
    </Flex>
  );
}
