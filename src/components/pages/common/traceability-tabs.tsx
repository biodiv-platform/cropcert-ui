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

  const handleTabChange = (e) => {
    // const selectedPath = TRACEABILITY_TABS[index].path;
    const selectedPath = TRACEABILITY_TABS.map((tab) =>
      tab.tabIndex === e ? tab.path : null
    ).filter((path) => path !== null)[0]; // Extract the first non-null path
    console.warn("e", e);
    router.push(selectedPath);
  };

  return (
    <Tabs.Root
      size="lg"
      fitted
      variant="outline"
      p={4}
      onValueChange={(e) => handleTabChange(e.value)}
      height="100%"
      display="flex"
      flexDirection="column"
      value={selectedTab}
    >
      <Tabs.List flexShrink={0}>
        {TRACEABILITY_TABS.map((item) => (
          <Tabs.Trigger value={item.tabIndex} key={item.label} >
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
