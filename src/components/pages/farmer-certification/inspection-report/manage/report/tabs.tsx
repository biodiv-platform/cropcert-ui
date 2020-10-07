import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core";
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
    <Tabs>
      <TabList>
        <Tab>Current</Tab>
        <Tab>Previous</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Component data={currentProps} />
        </TabPanel>
        <TabPanel>
          <Component data={previousProps} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  ) : (
    <Component data={previousProps} />
  );
}
