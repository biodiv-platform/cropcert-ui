import {
  Box,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import Tooltip from "@components/@core/tooltip";
import useDebouncedState from "@hooks/use-debounced-effect";
import React, { useEffect, useMemo, useState } from "react";

import useBatchFilter from "../../use-batch-filter";

const Slider = ({ value, index }) => (
  <Tooltip label={value} placement="top" hasArrow={true}>
    <RangeSliderThumb boxSizing="border-box" bg="blue.500" index={index} />
  </Tooltip>
);

const NumInput = (props) => (
  <NumberInput {...props}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
);

export function NumberFilter({ filterKey }) {
  const { addFilter, removeFilter, batchListAggregationData } = useBatchFilter();

  const values = useMemo(() => {
    const data = batchListAggregationData?.aggregationData?.[filterKey] || {};

    return {
      defaultValue: [data.min ?? 0, data.max ?? 10000],
      min: data.min ?? 0,
      max: data.max ?? 10000,
    };
  }, [filterKey, batchListAggregationData]);

  if (!values.max) {
    return <i>No Data</i>;
  }

  const [rState, setRState] = useState(values.defaultValue);

  const debouncedRState = useDebouncedState(rState, 300);

  const handleOnChange = (value) => {
    if (value[0] === values.min && value[1] === values.max) {
      removeFilter(filterKey);
      return;
    }
    addFilter(filterKey, value.join("-"));
  };

  useEffect(() => {
    handleOnChange(rState);
  }, [debouncedRState]);

  return (
    <Box py={3}>
      <Box pr={3}>
        <RangeSlider
          aria-label={["min", "max"]}
          value={rState}
          min={values.min}
          max={values.max}
          onChange={setRState}
        >
          <RangeSliderTrack bg="gray.300">
            <RangeSliderFilledTrack bg="blue.500" />
          </RangeSliderTrack>
          <Slider value={rState[0]?.toString()} index={0} />
          <Slider value={rState[1]?.toString()} index={1} />
        </RangeSlider>
      </Box>
      <HStack mt={4} spacing={4}>
        <NumInput
          name={`${filterKey}.0`}
          value={rState[0]}
          onChange={(v) => setRState([Number(v), rState[1]])}
          min={values.min}
          max={values.max}
        />
        <NumInput
          name={`${filterKey}.1`}
          value={rState[1]}
          onChange={(v) => setRState([rState[0], Number(v)])}
          min={values.min}
          max={values.max}
        />
      </HStack>
    </Box>
  );
}
