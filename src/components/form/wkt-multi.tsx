import { Box, Tabs } from "@chakra-ui/react";
import WKT, { WKTProps } from "@components/@core/WKT";
import GmapsWktLocationPicker from "@components/@core/WKT/gmaps-wkt";
import WKTDrawViewer from "@components/@core/WKT/wkt-draw-viewer";
import WKTList from "@components/@core/WKT/wkt-list";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";

interface WKTInputProps extends Omit<WKTProps, "onSave"> {
  isMultiple?;
  canDraw?;
  gMapTab: boolean;
}

export default function WKTFieldMulti(props: WKTInputProps) {
  const { t } = useTranslation();
  const { field, fieldState } = useController({ name: props.name });
  const [value, setValue] = useState(field.value || []);
  const [isDisabled, setIsdisabled] = useState<boolean>(false);
  const Viewer = props.canDraw ? WKTDrawViewer : WKT;

  const handleOnSave = (o) => {
    setValue([...value, o]);
  };

  const handleOnDelete = (index) => {
    setValue(value.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setIsdisabled(!props.isMultiple && value.length >= 1);
    field.onChange(value);
  }, [value]);

  return (
    <Field invalid={!!fieldState.error} errorText={JSON.stringify(fieldState?.error?.message)}>
      <Box mb={props.mb || 4} width={"full"}>
        <Field>{props.label}</Field>
        <Box borderWidth="1px" borderColor="gray.300" bg="white" borderRadius="md">
          <Tabs.Root defaultValue="draw" lazyMount={true} variant={"line"}>
            <Tabs.List>
              <Tabs.Trigger value="draw">{t("form:gmaps")}</Tabs.Trigger>
              <Tabs.Trigger value="search">{t("form:search_point")}</Tabs.Trigger>
            </Tabs.List>
            <Box>
              {value.length > 0 && (
                <Box>
                  <Box px={4} pt={2} pb={2}>
                    {t("form:selected_places")}
                  </Box>
                  <WKTList list={value} onDelete={handleOnDelete} {...props} />
                </Box>
              )}
            </Box>
            <Box p={4}>
              <Tabs.Content value="draw">
                <Viewer {...props} disabled={isDisabled} onSave={handleOnSave} />
              </Tabs.Content>
              <Tabs.Content value="search">
                <GmapsWktLocationPicker
                  {...props}
                  label={t("form:coverage.place")}
                  disabled={isDisabled}
                  onSave={handleOnSave}
                />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Box>
      </Box>
    </Field>
  );
}
