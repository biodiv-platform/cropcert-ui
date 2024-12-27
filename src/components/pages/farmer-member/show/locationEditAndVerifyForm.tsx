import { Stack } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import { Field } from "@/components/ui/field";
import { Radio, RadioGroup } from "@/components/ui/radio";

type Props = {
  isLocationVerified: boolean;
  setIsLocationVerified: (isVerified: boolean) => void;
};

export default function LocationEditAndVerifyForm({
  isLocationVerified,
  setIsLocationVerified,
}: Props) {
  const { t } = useTranslation();

  const handleChange = (value) => {
    setIsLocationVerified(value === "yes");
  };

  return (
    <Field display={"flex"} label={t("traceability:location.location_verified_radio_btn_title")}>
      <RadioGroup
        onValueChange={handleChange}
        value={isLocationVerified ? "yes" : "no"}
        defaultValue="no"
      >
        <Stack direction="row">
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </Stack>
      </RadioGroup>
    </Field>
  );
}
