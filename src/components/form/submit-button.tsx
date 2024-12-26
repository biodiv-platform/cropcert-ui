import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "../ui/button";

interface ISubmitButtonProps {
  children;
  leftIcon?;
  rightIcon?;
  isDisabled?;
  colorScheme?;
  mb?;
  w?;
  mt?;
}

export const SubmitButton = ({
  children,
  isDisabled,
  colorScheme = "blue",
  mb = 0,
  ...rest
}: ISubmitButtonProps) => {
  const { formState } = useFormContext();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(isDisabled);
  }, [isDisabled]);

  return (
    <Button
      loading={formState.isSubmitting}
      type="submit"
      disabled={disabled}
      mb={mb}
      {...rest}
      bgColor={colorScheme}
    >
      {children}
    </Button>
  );
};
