import { FormControl, FormLabel } from "@chakra-ui/core";
import { KEYS_TO_ROLES } from "@static/constants";
import React from "react";
import Skeleton from "tiny-skeleton-loader-react";

const AccesserLoading = ({ roles }) =>
  roles.slice(1).map(role => (
    <FormControl key={`${role}-s`} mb={4}>
      <FormLabel htmlFor={role}>Select {KEYS_TO_ROLES[role]}</FormLabel>
      <Skeleton height="38px" />
    </FormControl>
  ));

export default AccesserLoading;
