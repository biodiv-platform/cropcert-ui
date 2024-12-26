import { Box, Button, Flex } from "@chakra-ui/react";
import { formattedTimeStamp, local2utc, utc2local } from "@utils/basic";
import { namedFormErrorMessage } from "@utils/field";
import React, { useEffect, useMemo, useState } from "react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import { useController } from "react-hook-form";
import { LuRotateCcw } from "react-icons/lu";

import { Field } from "../ui/field";

const r = (v) => formattedTimeStamp(utc2local(v));

const hintMessage = (props) => {
  if (props?.min && props?.max) {
    return `Between ${r(props.min)} to ${r(props.max)}`;
  } else if (props?.max) {
    return `Maximum ${r(props.max)}`;
  } else if (props?.min) {
    return `Minimum ${r(props.min)}`;
  }
  return "";
};

interface DateTimeInputFieldProps {
  name;
  label?;
  title?;
  hint?: boolean;
  mb?: number;
  defaultBlank?: boolean;
  nowDisabled?: boolean;
  isNow?: boolean;
  format?: string;
  min?;
  max?;
  className?: string;
  [x: string]: any;
}

export const DateTimeInputField = ({
  name,
  title,
  label,
  hint,
  mb = 4,
  defaultBlank,
  nowDisabled,
  isNow,
  format = "dd-MM-yyyy H:mm",
  min,
  max,
  className,
  ...props
}: DateTimeInputFieldProps) => {
  const { field, fieldState } = useController({ name });

  const [minDate, maxDate, hintText, defaultDateTimeValue] = useMemo(() => {
    const defaultParsed = utc2local(field.value);

    return [
      min ? utc2local(min) : undefined,
      max ? utc2local(max) : new Date(),
      hintMessage(props),
      field.value ? defaultParsed : !defaultBlank ? defaultParsed : undefined,
    ];
  }, [min, max, props]);

  const [dateTimeValue, setDateTimeValue] = useState(defaultDateTimeValue);

  const handleNow = () => {
    setDateTimeValue(utc2local(field.value));
  };

  useEffect(() => {
    field.onChange(dateTimeValue ? local2utc(dateTimeValue).getTime() : null);
  }, [dateTimeValue]);

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, label)}
      mb={mb}
      id={field.name}
    >
      {label && <Field htmlFor={field.name}>{label}</Field>}
      <Flex>
        <Box flex={1}>
          <DateTimePicker
            {...props}
            {...field}
            placeholder={label}
            format={format}
            minDate={minDate}
            maxDate={maxDate}
            onChange={setDateTimeValue}
            value={dateTimeValue}
            autoComplete={false}
            className={className}
          />
        </Box>
        {isNow && (
          <Button
            ml={4}
            aria-label="Now"
            disabled={nowDisabled || props.disabled}
            onClick={handleNow}
          >
            {<LuRotateCcw />}
            Now
          </Button>
        )}
      </Flex>
      {hint && <Field helperText={hintText}>{hintText}</Field>}
    </Field>
  );
};
