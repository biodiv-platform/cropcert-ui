import { Box, Button, Flex, FormControl, FormHelperText, FormLabel } from "@chakra-ui/core";
import { formattedTimeStamp, local2utc, utc2local } from "@utils/basic.util";
import { useField } from "formik";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

import ErrorMessage from "./common/error-message";

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
  hint?: boolean;
  mb?: number;
  defaultBlank?: boolean;
  nowDisabled?: boolean;
  isNow?: boolean;
  format?: string;
  min?;
  max?;
  [x: string]: any;
}

const DateTimeInputField = ({
  name,
  label,
  hint,
  mb = 4,
  defaultBlank,
  nowDisabled,
  isNow,
  format = "dd-MM-yyyy H:mm",
  min,
  max,
  ...props
}: DateTimeInputFieldProps) => {
  const [field, meta, helpers] = useField(name);

  const minDate = min ? utc2local(min) : undefined;
  const maxDate = max ? utc2local(max) : new Date();

  const hintText = hintMessage(props);

  const defaultParsed = utc2local(field.value);

  const [dateTimeValue, setDateTimeValue] = useState(
    field.value ? defaultParsed : !defaultBlank ? defaultParsed : undefined
  );

  const handleNow = () => {
    setDateTimeValue(utc2local(field.value));
  };

  useEffect(() => {
    helpers.setValue(dateTimeValue ? local2utc(dateTimeValue).getTime() : null);
    setTimeout(() => {
      helpers.setTouched(true);
      field.onBlur(name);
    }, 500);
  }, [dateTimeValue]);

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false} mb={mb} id={field.name}>
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <Flex>
        <Box flex={1}>
          <DateTimePicker
            {...props}
            placeholder={label}
            format={format}
            minDate={minDate}
            maxDate={maxDate}
            onChange={setDateTimeValue}
            value={dateTimeValue}
            autoComplete={false}
          />
        </Box>
        {isNow && (
          <Button
            ml={4}
            aria-label="Now"
            isDisabled={nowDisabled || props.disabled}
            leftIcon="repeat-clock"
            onClick={handleNow}
          >
            Now
          </Button>
        )}
      </Flex>
      <ErrorMessage error={meta.error} name={field.name} label={label} />
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default DateTimeInputField;
