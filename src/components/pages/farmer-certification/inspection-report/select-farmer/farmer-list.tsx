import { Box, Button, Text } from "@chakra-ui/core";
import ResponsiveRow from "@components/@core/layout/responsive-row";
import { STORE } from "@static/inspection-report";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { useIndexedDBStore } from "use-indexeddb";

const MIN_CHAR = 3;

export default function FarmerList({ query }) {
  const { openCursor } = useIndexedDBStore(STORE.FARMERS);
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    setFarmers([]);
    const results = [];

    if (query.length < MIN_CHAR) {
      return;
    }

    openCursor((e) => {
      if (results.length >= 10) {
        return;
      }
      const c = e.target.result;
      if (c) {
        if (c?.value?.firstName.toLowerCase().includes(query)) {
          results.push(c.value);
        }
        c.continue();
      } else {
        setFarmers(results);
      }
    });
  }, [query]);

  return (
    <>
      {farmers.map((farmer, index) => (
        <ResponsiveRow bgGray={index % 2 !== 0}>
          <div>
            <small>{farmer.farmerCode}</small>
            <Text fontSize="lg">{farmer.firstName}</Text>
          </div>
          <Box textAlign="right">
            <NextLink href={`create?farmerId=${farmer.id}`} passHref={true}>
              <Button as="a" variantColor="blue" rightIcon="arrow-forward">
                Continue
              </Button>
            </NextLink>
          </Box>
        </ResponsiveRow>
      ))}
      {farmers.length === 0 && query.length >= MIN_CHAR
        ? "No Farmer Found"
        : "Try entering 3 characters or more"}
    </>
  );
}
