import { Box, Tabs } from "@chakra-ui/react";
import { TRACEABILITY_TABS } from "@static/constants";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const TraceabilityTabs = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("farmerProduce");

  useEffect(() => {
    const activeTab = TRACEABILITY_TABS.find((tab) => tab.path === router.pathname)?.tabIndex;
    setSelectedTab(activeTab ?? "farmerProduce");
  }, [router.pathname]);

  const handleTabChange = (index) => {
    const selectedPath = TRACEABILITY_TABS[index].path;
    router.push(selectedPath);
  };

  return (
    <Tabs.Root
      fitted
      variant="enclosed"
      p={4}
      onChange={handleTabChange}
      height="100%"
      display="flex"
      flexDirection="column"
      defaultValue={selectedTab}
    >
      <Tabs.List flexShrink={0}>
        {TRACEABILITY_TABS.map((item) => (
          <Tabs.Trigger value={TRACEABILITY_TABS[item.tabIndex].tabIndex} key={item.label}>
            {item.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Box flex="1" overflowY="auto">
        {children}
      </Box>
    </Tabs.Root>
  );
};

export default TraceabilityTabs;
