import { Flex, Link, Stack } from "@chakra-ui/react";
import useInspectionReport from "@hooks/use-inspection-report";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { LuArrowRight, LuDownload } from "react-icons/lu";
import DeleteIcon from "src/icons/delete";

import { Button } from "@/components/ui/button";

export default function ActionButton({ ccCode, syncStatus, isOnline, pendingReports }) {
  const [isLoading, setIsLoading] = useState(false);
  const { removeCCFarmers, downloadCCFarmers } = useInspectionReport();
  const router = useRouter();

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
    const success = await downloadCCFarmers(ccCode);
    if (success) {
      router.push(`/farmer-certification/inspection-report/select-farmer?feCCCode=${ccCode}`);
    }
    setIsLoading(false);
  };

  return (
    <Flex justifyContent="flex-end">
      {syncStatus ? (
        <Stack w={{ base: "full", md: "11rem" }}>
          <Link href={`/farmer-certification/inspection-report/select-farmer?feCCCode=${ccCode}`}>
            <Button as="a" colorPalette="blue" size="sm" mb={4}>
              Farmers List ({syncStatus?.farmersCount})
              <LuArrowRight />
            </Button>
          </Link>
          <Button
            className="download"
            colorPalette="red"
            loading={isLoading}
            onClick={handleOnRemove}
            loadingText="Deleting"
            size="sm"
          >
            <DeleteIcon />
            Remove Farmers List
          </Button>
        </Stack>
      ) : (
        <Button
          size="sm"
          className="download"
          colorPalette="teal"
          onClick={handleOnDownload}
          loading={isLoading}
          disabled={!isOnline}
          loadingText="Downloading"
          w="11rem"
        >
          <LuDownload />
          Download Farmers
        </Button>
      )}
    </Flex>
  );
}
