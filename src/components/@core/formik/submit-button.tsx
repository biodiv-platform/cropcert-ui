import { Button } from "@chakra-ui/core";
import React, { useEffect } from "react";
import { useFormikContext } from "formik";

const SubmitButton = ({ children, leftIcon = undefined, isDisabled = false }) => {
  const { isValid, isSubmitting, validateForm } = useFormikContext();

  useEffect(() => {
    validateForm();
  }, []);

  return (
    <Button
      variantColor="blue"
      isLoading={isSubmitting}
      isDisabled={!isValid || isDisabled}
      leftIcon={leftIcon}
      type="submit"
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
