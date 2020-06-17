import React, { useState } from "react";
import { PageHeading, CoreGrid } from "@components/@core/layout";
import Accesser from "@components/@core/accesser";
import { ROLES } from "@static/constants";
import { InputGroup, InputLeftElement, Icon, Input } from "@chakra-ui/core";
import IndexedDBProvider from "use-indexeddb";
import { DB_CONFIG } from "@static/inspection-report";
import { debounce } from "ts-debounce";
import FarmerList from "./farmer-list";

export default function SelectFarmerComponent() {
  const [query, setQuery] = useState("");

  const onFilterChange = debounce(
    (e) => {
      setQuery(e.target.value.toLowerCase());
    },
    300,
    { isImmediate: true }
  );

  return (
    <div>
      <PageHeading>👨‍🌾 Select Farmer</PageHeading>

      <InputGroup my={8} size="lg" maxW="25rem">
        <InputLeftElement children={<Icon name="search" color="gray.300" />} />
        <Input
          type="text"
          placeholder="Find Farmer"
          borderColor="gray.400"
          onChange={onFilterChange}
        />
      </InputGroup>

      <IndexedDBProvider config={DB_CONFIG}>
        <FarmerList query={query} />
      </IndexedDBProvider>
    </div>
  );
}
