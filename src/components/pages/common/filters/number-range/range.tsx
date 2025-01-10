import { Box, HStack } from "@chakra-ui/react";
import useDebouncedState from "@hooks/use-debounced-effect";
import React, { useEffect, useMemo, useState } from "react";

import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input";
import { Slider } from "@/components/ui/slider";

const NumInput = (props) => (
  <NumberInputRoot {...props}>
    <NumberInputField />
  </NumberInputRoot>
);

export function NumberFilter({ useIndexFilter, filterKey, min, max }) {
  const { filter, addFilter, removeFilter } = useIndexFilter();

  const values = useMemo(() => {
    const v = filter[filterKey];
    const [_min, _max] = v ? v.split("-").map(Number) : [null, null];

    // Ensure valid ranges or fall back to defaults
    return {
      defaultValue: [_min ?? min, _max ?? max],
      min,
      max,
    };
  }, [filter, filterKey, min, max]);

  const [rState, setRState] = useState(() => values.defaultValue);

  useEffect(() => {
    // Reset rState if the filter changes and does not include the filterKey
    if (!filter[filterKey]) {
      setRState([values.min, values.max]);
    }
  }, [filter, filterKey, values.min, values.max]);

  const debouncedRState = useDebouncedState(rState, 300);

  const handleOnChange = (value) => {
    if (value[0] === values.min && value[1] === values.max) {
      removeFilter(filterKey);
      return;
    }
    addFilter(filterKey, value.join("-"));
  };

  useEffect(() => {
    handleOnChange(debouncedRState);
  }, [debouncedRState]);

  if (!values.max) {
    return <i>No Data</i>;
  }

  return (
    <Box py={3}>
      <Box pl={4} pr={4}>
        <Slider value={[min, max]} min={min} max={max}  colorPalette={"blue"}/>
      </Box>
      <HStack mt={4} gap={4}>
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
