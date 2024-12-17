import { ArrowForwardIcon, ArrowUpIcon, CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import ResponsiveRow from "@components/@core/layout/responsive-row";
import useInspectionReport from "@hooks/use-inspection-report";
import { UPLOAD_ALL_INSPECTION } from "@static/events";
import NextLink from "next/link";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import DeleteIcon from "src/icons/delete";

export default function FarmerItem({ farmer, bgGray, isOnline, updateFarmer }) {
  const { uploadInspectionReport, discardInspectionReport } = useInspectionReport();
  const { isConflict, isSubVersionConflict } = farmer;
  const [isLoading, setIsLoading] = useState<boolean>();

  const upload = async () => {
    setIsLoading(true);
    await uploadInspectionReport(farmer.pendingReport);
    updateFarmer();
    setIsLoading(false);
  };

  useListener(() => {
    if (farmer?.pendingReport && isOnline && !isConflict && !isSubVersionConflict) {
      upload();
    }
  }, [UPLOAD_ALL_INSPECTION]);

  const discard = async () => {
    await discardInspectionReport(farmer.pendingReport.index);
    updateFarmer();
  };

  return (
    <ResponsiveRow bgGray={bgGray}>
      <div>
        <small>{farmer.farmerCode}</small>
        <div>
          <Text as="span" fontSize="lg">
            {farmer.name}
          </Text>
          <Box hidden={!isConflict} className="fade">
            <WarningIcon mr={2} color="orange.500" />
            {isSubVersionConflict
              ? "Sub-version Mismatch, Please choose one of the action"
              : "New Major version available Please discard local report"}
          </Box>
        </div>
      </div>
      <Box textAlign="right">
        {farmer?.pendingReport ? (
          isOnline ? (
            <>
              {!isConflict && !isSubVersionConflict && (
                <Button
                  mr={4}
                  className="fade"
                  colorScheme="orange"
                  leftIcon={<ArrowUpIcon />}
                  onClick={upload}
                  isLoading={isLoading}
                >
                  Upload
                </Button>
              )}
              {isSubVersionConflict && (
                <Button
                  mr={4}
                  className="fade"
                  colorScheme="purple"
                  leftIcon={<ArrowUpIcon />}
                  onClick={upload}
                  isLoading={isLoading}
                >
                  Force Upload
                </Button>
              )}
              <Button
                colorScheme="red"
                leftIcon={<DeleteIcon />}
                onClick={discard}
                hidden={isLoading}
              >
                Discard
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              colorScheme="green"
              leftIcon={<CheckCircleIcon />}
              isDisabled={true}
            >
              Report Ready
            </Button>
          )
        ) : (
          <NextLink href={`create?feFarmerId=${farmer.id}`} passHref={true} legacyBehavior>
            <Button className="fade" as="a" colorScheme="blue" rightIcon={<ArrowForwardIcon />}>
              Create Inspection Report
            </Button>
          </NextLink>
        )}
      </Box>
    </ResponsiveRow>
  );
}
