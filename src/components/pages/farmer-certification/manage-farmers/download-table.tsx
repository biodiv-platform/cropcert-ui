import { SearchIcon } from "@chakra-ui/icons";
import { Badge, Box, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import Accesser from "@components/@core/accesser";
import { CoreGrid } from "@components/@core/layout";
import ResponsiveRow from "@components/@core/layout/responsive-row";
import useInspectionReport from "@hooks/use-inspection-report";
import useOnlineStatus from "@rehooks/online-status";
import { ROLES } from "@static/constants";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";

import ActionButton from "./action-button";

export default function DownloadTable() {
  const { ccList, onCoCodeChange } = useInspectionReport();
  const [ccListF, setCCListF] = useState<any>([]);
  const isOnline = useOnlineStatus();

  const onFilterChange = (e) => {
    const q = new RegExp(e.target.value, "i");
    setCCListF(ccList.filter((cc) => cc.name.match(q) || cc.code.toString().match(q)));
  };

  useEffect(() => {
    setCCListF(ccList);
  }, [ccList]);

  return (
    <>
      <CoreGrid mb={4}>
        <Accesser toRole={ROLES.COOPERATIVE} onChange={onCoCodeChange} />
        <div></div>
        <InputGroup mt={6}>
          <InputLeftElement children={<SearchIcon color="gray.300" />} />
          <Input
            type="text"
            placeholder="Find Collection Center"
            borderColor="gray.400"
            onChange={onFilterChange}
          />
        </InputGroup>
      </CoreGrid>
      {ccListF.map(({ code, name, syncStatus, pendingReports }, index) => (
        <ResponsiveRow bgGray={index % 2 !== 0} key={code} minH="6rem">
          <Box>
            <Text fontSize="xl" display="inline" mr={4} verticalAlign="middle">
              {code}. {name}
            </Text>
            {syncStatus && pendingReports.length > 0 && (
              <Badge colorScheme="green" variant="outline">
                {pendingReports.length} Report Completed
              </Badge>
            )}
            {syncStatus && <Box fontSize="sm">Last updated {format(syncStatus.lastSynced)}</Box>}
          </Box>
          <Box textAlign={{ md: "right" }}>
            <ActionButton
              ccCode={code}
              syncStatus={syncStatus}
              isOnline={isOnline}
              pendingReports={pendingReports.length}
            />
          </Box>
        </ResponsiveRow>
      ))}
    </>
  );
}
