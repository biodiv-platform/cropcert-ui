import { Box, Tabs } from "@chakra-ui/react";
import { TRACEABILITY_TABS } from "@static/constants";
import { useRouter } from "next/router";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import useGlobalState from "@/hooks/use-global-state";
import { axGetGlobalCount } from "@/services/traceability.service";

const TraceabilityContext = createContext<{
  setReRenderTabs: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const TraceabilityTabs = ({ children }) => {
  const router = useRouter();
  const { user } = useGlobalState();
  const [tabs, setTabs] = useState(() =>
    user.unionCode !== 5
      ? TRACEABILITY_TABS.filter((tab) => tab.tabIndex !== "container")
      : TRACEABILITY_TABS
  );
  const [reRenderTabs, setReRenderTabs] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await axGetGlobalCount(user.unionCode);
      if (res.success) {
        setTabs((prevTabs) =>
          prevTabs.map((tab) => ({
            ...tab,
            label: `${tab.label.split("(")[0]}(${res.data.count[`${tab.tabIndex}Count`] ?? 0})`,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching global count:", error);
    }
  }, [user.unionCode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (reRenderTabs) {
      fetchData();
      setReRenderTabs(false);
    }
  }, [reRenderTabs, fetchData]);

  const selectedTab = tabs.find((tab) => tab.path === router.pathname)?.tabIndex || "farmerProduce";

  const handleTabChange = (tabIndex) => {
    const selectedPath = tabs.find((tab) => tab.tabIndex === tabIndex)?.path;
    if (selectedPath) router.push(selectedPath);
  };

  return (
    <TraceabilityContext.Provider value={{ setReRenderTabs }}>
      <Tabs.Root
        size="lg"
        fitted
        variant="line"
        px={4}
        onValueChange={(e) => handleTabChange(e.value)}
        height="100%"
        display="flex"
        flexDirection="column"
        value={selectedTab}
      >
        <Tabs.List flexShrink={0}>
          {tabs.map((item) => (
            <Tabs.Trigger value={item.tabIndex} key={item.tabIndex}>
              {item.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Box flex="1" overflowY="auto">
          {children}
        </Box>
      </Tabs.Root>
    </TraceabilityContext.Provider>
  );
};

// Custom hook to access setReRenderTabs
export const useTraceability = () => {
  const context = useContext(TraceabilityContext);
  if (!context) {
    throw new Error("useTraceability must be used within a TraceabilityTabs provider.");
  }
  return context;
};

export default TraceabilityTabs;
