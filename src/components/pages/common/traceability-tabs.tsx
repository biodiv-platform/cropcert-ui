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
  const { user, union } = useGlobalState();
  const [tabs, setTabs] = useState<any>([]);
  const [reRenderTabs, setReRenderTabs] = useState(false);

  useEffect(() => {
    if (!union) return;

    const filteredTabs = TRACEABILITY_TABS.filter((tab) => {
      if (tab.tabIndex === "farmerProduce") return true;
      if (tab.tabIndex === "batch") return union.hasBatch;
      if (tab.tabIndex === "lot") return union.hasLot;
      if (tab.tabIndex === "container") return union.hasContainer;

      return false;
    });

    setTabs(filteredTabs);
  }, [union]);

  const fetchData = useCallback(async () => {
    if (!union) return;

    try {
      const res = await axGetGlobalCount(union.code);
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
  }, [union]);

  useEffect(() => {
    if (tabs.length > 0) {
      fetchData();
    }
  }, [fetchData, tabs.length]);

  useEffect(() => {
    if (reRenderTabs && union) {
      fetchData();
      setReRenderTabs(false);
    }
  }, [reRenderTabs, fetchData, union]);

  if (!union) {
    return null;
  }

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

export const useTraceability = () => {
  const context = useContext(TraceabilityContext);
  if (!context) {
    throw new Error("useTraceability must be used within a TraceabilityTabs provider.");
  }
  return context;
};

export default TraceabilityTabs;
