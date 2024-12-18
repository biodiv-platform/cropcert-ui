import { Box, Tab, TabIndicator, TabList, Tabs } from "@chakra-ui/react";
import { TRACEABILITY_TABS } from "@static/constants";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const TraceabilityTabs = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const activeTab = TRACEABILITY_TABS.findIndex((tab) => tab.path === router.pathname);
    setSelectedTab(activeTab !== -1 ? activeTab : 0);
  }, [router.pathname]);

  const handleTabChange = (index: number) => {
    const selectedPath = TRACEABILITY_TABS[index].path;
    router.push(selectedPath);
  };

  return (
    <Tabs
      isFitted
      variant="unstyled"
      px={4}
      onChange={handleTabChange}
      index={selectedTab}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <TabList flexShrink={0}>
        {TRACEABILITY_TABS.map(({ label }) => (
          <Tab key={label}>{label}</Tab>
        ))}
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="2px" />
      <Box flex="1" overflowY="auto">
        {children}
      </Box>
    </Tabs>
  );
};

export default TraceabilityTabs;
