import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/core";
import { formattedTimeStamp, local2utc, utc2local } from "@utils/basic.util";
import { useField } from "formik";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

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

const DateTimeInputField = ({
  name,
  label = null,
  hint = false,
  mb = 4,
  defaultBlank = false,
  nowDisabled = false,
  isNow = false,
  format = "dd-MM-yyyy H:mm",
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  const minDate = props.hasOwnProperty("min") ? utc2local(props.min) : undefined;
  const maxDate = props.hasOwnProperty("max") ? utc2local(props.max) : new Date();

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
    }, 300);
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
      <FormErrorMessage>{meta.error && meta.error.replace(field.name, label)}</FormErrorMessage>
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default DateTimeInputField;
