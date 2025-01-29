import { KEYS_TO_ROLES } from "@static/constants";
import React from "react";
import Skeleton from "tiny-skeleton-loader-react";

import { Field } from "@/components/ui/field";

const AccesserLoading = ({ roles }) =>
  roles.slice(1).map((role) => (
    <Field key={`${role}-s`} mb={4}>
      <Field htmlFor={role}>Select {KEYS_TO_ROLES?.[role]?.toLowerCase()}</Field>
      <Skeleton height="38px" />
    </Field>
  ));

export default AccesserLoading;
