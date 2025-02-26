import { Box, Tabs } from "@chakra-ui/react";
import { TRACEABILITY_TABS } from "@static/constants";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

import useGlobalState from "@/hooks/use-global-state";
import { axGetGlobalCount } from "@/services/traceability.service";

const TraceabilityContext = createContext<
  Partial<{ setReRenderTabs: React.Dispatch<React.SetStateAction<boolean>> }>
>({});

const TraceabilityTabs = ({ children }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("farmerProduce");
  const [tabs, setTabs] = useState(TRACEABILITY_TABS);
  const [reRenderTabs, setReRenderTabs] = useState<boolean>(false);
  const { user } = useGlobalState();

  const fetchData = async () => {
    const res = await axGetGlobalCount(user.unionCode);
    if (res.success) {
      const updatedTabs = TRACEABILITY_TABS.map((tab) => {
        let count = "";
        switch (tab.tabIndex) {
          case "batch":
            count = res.data.count.batchCount;
            break;
          case "farmerProduce":
            count = res.data.count.farmerProduceCount;
            break;
          case "container":
            count = res.data.count.containerCount;
            break;
          case "lot":
            count = res.data.count.lotCount;
            break;
          default:
            break;
        }
        return {
          ...tab,
          label: `${tab.label.split("(")[0]}(${count ?? 0})`, // Update label with count
        };
      });
      setTabs(updatedTabs); // Update state to trigger re-render
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [reRenderTabs]);

  useEffect(() => {
    const activeTab = tabs.find((tab) => tab.path === router.pathname)?.tabIndex;
    setSelectedTab(activeTab ?? "farmerProduce");
  }, [router.pathname, tabs]);

  const handleTabChange = (e) => {
    const selectedPath = tabs.find((tab) => tab.tabIndex === e)?.path;
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
export const useTraceability = () => useContext(TraceabilityContext);

export default TraceabilityTabs;
