import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/core";
import ResponsiveRow from "@components/@core/layout/responsive-row";
import useInspectionReport from "@hooks/use-inspection-report";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { debounce } from "ts-debounce";

export default function FarmerList() {
  const { getCCFarmers } = useInspectionReport();
  const [farmers, setFarmers] = useState([]);
  const [initialFarmers, setInitialFarmers] = useState([]);
  const router = useRouter();

  const onFilterChange = debounce(
    (e) => {
      const query = e.target.value.toLowerCase();
      setFarmers(initialFarmers.filter(({ firstName }) => firstName.toLowerCase().includes(query)));
    },
    400,
    { isImmediate: true }
  );

  useEffect(() => {
    getCCFarmers(router.query?.feCCCode).then((data) => {
      setInitialFarmers(data);
      setFarmers(data);
    });
  }, [router.query?.feCCCode]);

  return farmers.length ? (
    <>
      <InputGroup mt={8} mb={4} size="lg" maxW="25rem">
        <InputLeftElement children={<Icon name="search" color="gray.300" />} />
        <Input
          type="text"
          placeholder="Find Farmer"
          borderColor="gray.400"
          onChange={onFilterChange}
        />
      </InputGroup>

      <Text mb={8}>
        Showing {farmers.length} of {initialFarmers.length} Farmer(s)
      </Text>

      {farmers.map((farmer, index) => (
        <ResponsiveRow bgGray={index % 2 !== 0} key={farmer?.farmerCode}>
          <div>
            <small>{farmer.farmerCode}</small>
            <Text fontSize="lg">{farmer.firstName}</Text>
          </div>
          <Box textAlign="right">
            <NextLink href={`create?feFarmerId=${farmer.id}`} passHref={true}>
              <Button as="a" variantColor="blue" rightIcon="arrow-forward">
                Continue
              </Button>
            </NextLink>
          </Box>
        </ResponsiveRow>
      ))}
    </>
  ) : (
    <Spinner />
  );
}
