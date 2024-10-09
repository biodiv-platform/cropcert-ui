import { FormControl, FormLabel, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

type Props = {
  isLocationVerified: boolean;
  setIsLocationVerified: (isVerified: boolean) => void;
};

export default function LocationEditAndVerifyForm({
  isLocationVerified,
  setIsLocationVerified,
}: Props) {
  const { t } = useTranslation();

  const handleChange = (value: string) => {
    setIsLocationVerified(value === "yes");
  };

  return (
    <FormControl display={"flex"}>
      <FormLabel>{t("traceability:location.location_verified_radio_btn_title")}</FormLabel>
      <RadioGroup
        onChange={handleChange}
        value={isLocationVerified ? "yes" : "no"}
        defaultValue="no"
      >
        <Stack direction="row">
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </Stack>
      </RadioGroup>
    </FormControl>
  );
}
