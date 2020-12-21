import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
  Stack,
} from "@chakra-ui/core";
import { PageHeading } from "@components/@core/layout";
import useInspectionReport from "@hooks/use-inspection-report";
import useOnlineStatus from "@rehooks/online-status";
import { UPLOAD_ALL_INSPECTION } from "@static/events";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";
import { debounce } from "ts-debounce";

import Breadcrumbs from "./breadcrumbs";
import FarmerItem from "./farmer-item";

const LIMITS = ["50", "100", "200"];

export default function FarmerList({ feCCCode }) {
  const {
    getCCFarmers,
    affected: { added, updated },
  } = useInspectionReport();
  const isOnline = useOnlineStatus();
  const [farmers, setFarmers] = useState<any>([]);
  const [initialFarmers, setInitialFarmers] = useState<any>([]);
  const [query, setQuery] = useState("");
  const [pendingOnly, setPendingOnly] = useState<boolean>();
  const [limit, setLimit] = useState(LIMITS[0]);

  const onFilterChange = debounce((e) => setQuery(e.target.value.toLowerCase()), 300, {
    isImmediate: true,
  });

  const refetchFarmers = (isOnline = false) => {
    getCCFarmers(feCCCode, isOnline, true).then(setInitialFarmers);
  };

  useEffect(() => {
    refetchFarmers(isOnline);
  }, []);

  useEffect(() => {
    setFarmers(
      initialFarmers
        .filter(({ firstName, pendingReport }) => {
          const match = firstName.toLowerCase().includes(query);
          return pendingOnly ? pendingReport && match : match;
        })
        .slice(0, Number(limit))
    );
  }, [query, initialFarmers, pendingOnly, limit]);

  return initialFarmers.length ? (
    <>
      <PageHeading mb={8}>👨‍🌾 Farmers List - {initialFarmers[0]["ccName"]}</PageHeading>
      <Breadcrumbs {...initialFarmers[0]} />
      <Flex flexDirection={{ base: "column", md: "row" }} my={4} justifyContent="space-between">
        <Box mb={4}>
          <Stack flexDirection={{ base: "column", md: "row" }} mb={1}>
            <InputGroup w="24rem" mr={4}>
              <InputLeftElement children={<Icon name="search" color="gray.300" />} />
              <Input type="text" placeholder="Find Farmer" onChange={onFilterChange} />
            </InputGroup>
            <Select w="10rem" defaultValue={limit} onChange={(e) => setLimit(e.target.value)}>
              {LIMITS.map((limit) => (
                <option value={limit} key={limit}>
                  {limit} records
                </option>
              ))}
            </Select>
          </Stack>
          Showing {farmers.length} of {initialFarmers.length} Farmer(s)
        </Box>
        <Box>
          <Button
            mb={4}
            variantColor="orange"
            onClick={() => emit(UPLOAD_ALL_INSPECTION)}
            isDisabled={!isOnline}
          >
            Upload All Completed Reports
          </Button>
          <Stack>
            <Checkbox name="completed-only" onChange={(e) => setPendingOnly(e.target.checked)}>
              Show Completed Reports Only
            </Checkbox>
          </Stack>
        </Box>
      </Flex>

      {(added > 0 || updated > 0) && (
        <Alert mb={6} borderRadius="md">
          <AlertIcon />
          {added > 0 && `${added} Farmers Added, `}
          {updated > 0 && `${updated} Farmers Updated`}
        </Alert>
      )}

      {farmers.map((farmer, index) => (
        <FarmerItem
          farmer={farmer}
          isOnline={isOnline}
          bgGray={index % 2 !== 0}
          key={farmer["id"]}
          updateFarmer={refetchFarmers}
        />
      ))}
    </>
  ) : (
    <Spinner />
  );
}
