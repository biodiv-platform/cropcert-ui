import { Tabs } from "@chakra-ui/react";
import React from "react";

interface ReportTabsProps {
  component;
  showCurrent: boolean;
  previousProps;
  currentProps?;
}

export default function ReportTabs({
  component: Component,
  showCurrent,
  previousProps,
  currentProps,
}: ReportTabsProps) {
  return showCurrent ? (
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger value="Current">Current</Tabs.Trigger>
        <Tabs.Trigger value="Previous">Previous</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="Current">
        <Component data={currentProps} />
      </Tabs.Content>
      <Tabs.Content value="Previous">
        <Component data={previousProps} />
      </Tabs.Content>
    </Tabs.Root>
  ) : (
    <Component data={previousProps} />
  );
}
