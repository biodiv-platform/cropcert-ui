import SITE_CONFIG from "@configs/site-config";
import React from "react";
import ReCaptcha from "react-google-recaptcha";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";

interface IRecaptchaProps {
  name: string;
  label?: string;
  mb?: number;
  hint?: string;
}

export const RecaptchaField = ({ name, label, hint, mb = 4, ...props }: IRecaptchaProps) => {
  const { field, fieldState } = useController({ name, defaultValue: null });

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={fieldState?.error?.message}
      mb={mb}
      htmlFor={field.name}
      label={label}
      {...props}
    >
      <ReCaptcha
        sitekey={SITE_CONFIG.TOKENS.RECAPTCHA}
        onExpired={field.onChange}
        onChange={field.onChange}
      />
      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
