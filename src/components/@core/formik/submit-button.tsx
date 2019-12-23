import { Button } from "@chakra-ui/core";
import React from "react";

const SubmitButton = ({ props, children, leftIcon = undefined, isDisabled = false }) => (
  <Button
    variantColor="blue"
    isLoading={props.isSubmitting}
    isDisabled={!props.isValid || isDisabled}
    leftIcon={leftIcon}
    type="submit"
  >
    {children}
  </Button>
);

export default SubmitButton;
