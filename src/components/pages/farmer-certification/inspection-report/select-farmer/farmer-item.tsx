import { Box, Button, Icon, Text } from "@chakra-ui/core";
import ResponsiveRow from "@components/@core/layout/responsive-row";
import useInspectionReport from "@hooks/use-inspection-report";
import { UPLOAD_ALL_INSPECTION } from "@static/events";
import NextLink from "next/link";
import React, { useState } from "react";
import { useListener } from "react-gbus";

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
            {farmer.firstName}
          </Text>
          <Box hidden={!isConflict} className="fade">
            <Icon name="warning" mr={2} color="orange.500" />
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
                  variantColor="orange"
                  leftIcon="arrow-up"
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
                  variantColor="purple"
                  leftIcon="arrow-up"
                  onClick={upload}
                  isLoading={isLoading}
                >
                  Force Upload
                </Button>
              )}
              <Button variantColor="red" leftIcon="delete" onClick={discard} hidden={isLoading}>
                Discard
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              variantColor="green"
              leftIcon="check-circle"
              isDisabled={true}
            >
              Report Ready
            </Button>
          )
        ) : (
          <NextLink href={`create?feFarmerId=${farmer.id}`} passHref={true}>
            <Button className="fade" as="a" variantColor="blue" rightIcon="arrow-forward">
              Create Inspection Report
            </Button>
          </NextLink>
        )}
      </Box>
    </ResponsiveRow>
  );
}
