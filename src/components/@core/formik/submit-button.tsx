import { Button } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";

interface SubmitButtonProps {
  children;
  leftIcon?;
  isDisabled?;
}

const SubmitButton = ({ children, leftIcon, isDisabled }: SubmitButtonProps) => {
  const { isValid, isSubmitting, validateForm } = useFormikContext();

  useEffect(() => {
    validateForm();
  }, []);

  return (
    <Button
      colorScheme="blue"
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
