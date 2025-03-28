import { Box, Text } from "@chakra-ui/react";
import ResponsiveRow from "@components/@core/layout/responsive-row";
import useInspectionReport from "@hooks/use-inspection-report";
import { UPLOAD_ALL_INSPECTION } from "@static/events";
import Link from "next/link";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import { LuArrowRight, LuArrowUp, LuCircleCheck } from "react-icons/lu";
import { MdWarning } from "react-icons/md";
import DeleteIcon from "src/icons/delete";

import { Button } from "@/components/ui/button";

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
            <MdWarning color="orange.500" />
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
                  colorPalette="orange"
                  onClick={upload}
                  loading={isLoading}
                >
                  <LuArrowUp />
                  Upload
                </Button>
              )}
              {isSubVersionConflict && (
                <Button
                  mr={4}
                  className="fade"
                  colorPalette="purple"
                  onClick={upload}
                  loading={isLoading}
                >
                  <LuArrowUp />
                  Force Upload
                </Button>
              )}
              <Button colorPalette="red" onClick={discard} hidden={isLoading}>
                <DeleteIcon />
                Discard
              </Button>
            </>
          ) : (
            <Button variant="outline" colorPalette="green" disabled={true}>
              <LuCircleCheck />
              Report Ready
            </Button>
          )
        ) : (
          <Link href={`create?feFarmerId=${farmer.id}`}>
            <Button className="fade" as="a" colorPalette="blue">
              Create Inspection Report
              <LuArrowRight />
            </Button>
          </Link>
        )}
      </Box>
    </ResponsiveRow>
  );
}
