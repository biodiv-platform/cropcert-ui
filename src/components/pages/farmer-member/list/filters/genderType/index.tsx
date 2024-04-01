import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import useFarmerMemberFilter from "@components/pages/farmer-member/common/use-farmer-member-filter";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function GenderFilter() {
  const { filter, addFilter, removeFilter } = useFarmerMemberFilter();
  const defaultValue = filter?.gender ? filter?.gender?.split(",") : [];
  const { t } = useTranslation();

  const handleOnChange = (v) => {
    if (v.length > 0) {
      addFilter("gender", v.toString());
    } else {
      removeFilter("gender");
    }
  };

  return (
    <CheckboxGroup defaultValue={defaultValue} onChange={handleOnChange}>
      <Stack>
        <Checkbox value="male">Male</Checkbox>
        <Checkbox value="female">Female</Checkbox>
      </Stack>
    </CheckboxGroup>
  );
}
