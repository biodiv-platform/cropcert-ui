import "react-datepicker/dist/react-datepicker.css";

import { Box, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

type DateTimeProps = {
  control: any;
  name: string;
  label?: string;
  error?: any;
  format?: string;
  maxDate?: Date;
  disabled?: boolean;
};

const DateTime = ({
  control,
  name,
  label,
  error,
  format = "Pp",
  maxDate = new Date(),
  disabled = false,
}: DateTimeProps) => {
  return (
    <FormControl isInvalid={error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Flex>
        <Box flex={1} width={"full"}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => {
              return (
                <DatePicker
                  placeholderText="Select date"
                  onChange={(date) => field.onChange(new Date(date))}
                  selected={field.value ? new Date(field.value) : null}
                  maxDate={maxDate}
                  dateFormat={format}
                  className="react-dateTimePicker"
                  disabled={disabled}
                />
              );
            }}
          />
        </Box>
      </Flex>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </FormControl>
  );
};

export default DateTime;
