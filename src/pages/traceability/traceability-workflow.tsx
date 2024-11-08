import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { RestrictedAccess } from "@components/@core/layout";
import {
  DEFAULT_BATCH_FILTER,
  DEFAULT_FARMER_PRODUCE_FILTER,
  DEFAULT_LOT_FILTER,
  TabIndices,
  TabPaths,
} from "@static/constants";
import { useRouter } from "next/router";
import React, { lazy, startTransition, Suspense, useEffect, useMemo, useState } from "react";

const FarmerProduceListPageComponent = lazy(() => import("@components/pages/farmer-produce/list"));
const BatchListPageComponent = lazy(() => import("@components/pages/batch/list"));
const LotListPageComponent = lazy(() => import("@components/pages/lot/list"));
import { BatchFilterProvider } from "@components/pages/batch/list/use-batch-filter";
import { FarmerProduceFilterProvider } from "@components/pages/farmer-produce/list/use-farmer-produce-filter";
import { LotFilterProvider } from "@components/pages/lot/list/use-lot-filter";

const tabConfig = [
  {
    index: TabIndices.FARMER_PRODUCE,
    component: FarmerProduceListPageComponent,
    provider: FarmerProduceFilterProvider,
    defaultFilter: DEFAULT_FARMER_PRODUCE_FILTER,
    label: "🚜 Farmer Produce",
    path: TabPaths.FARMER_PRODUCE,
  },
  {
    index: TabIndices.BATCH,
    component: BatchListPageComponent,
    provider: BatchFilterProvider,
    defaultFilter: DEFAULT_BATCH_FILTER,
    label: "🧺 Batch(s)",
    path: TabPaths.BATCH,
  },
  {
    index: TabIndices.LOT,
    component: LotListPageComponent,
    provider: LotFilterProvider,
    defaultFilter: DEFAULT_LOT_FILTER,
    label: "📦 Lot(s)",
    path: TabPaths.LOT,
  },
];

function ShowTabs({ selectedTab: initialSelectedTab }) {
  const [selectedTab, setSelectedTab] = useState(initialSelectedTab);
  const router = useRouter();

  const pathToIndex = useMemo(
    () => Object.fromEntries(tabConfig.map((tab) => [tab.path, tab.index])),
    []
  );

  const indexToPath = useMemo(() => tabConfig.map((tab) => tab.path), []);

  useEffect(() => {
    const currentPath = router.asPath;
    const index = pathToIndex[currentPath];
    if (index !== undefined) {
      setSelectedTab(index);
    }
  }, [pathToIndex, router.asPath]);

  const handleTabChange = (index) => {
    startTransition(() => {
      setSelectedTab(index);
      const newPath = indexToPath[index];
      // Replace window.history.pushState with router.push
      router.push(newPath, undefined, { shallow: true });
    });
  };

  return (
    <RestrictedAccess>
      <Tabs
        isFitted
        variant="enclosed"
        p={4}
        onChange={handleTabChange}
        index={selectedTab}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
      >
        <TabList flexShrink={0}>
          {tabConfig.map(({ label }) => (
            <Tab key={label}>{label}</Tab>
          ))}
        </TabList>

        <TabPanels flexGrow={1}>
          {tabConfig.map(({ index, component: Component, provider: Provider, defaultFilter }) => (
            <TabPanel key={index} height={"100%"}>
              {selectedTab === index && (
                <Suspense fallback={<div>Loading...</div>}>
                  <Provider filter={defaultFilter}>
                    <Component />
                  </Provider>
                </Suspense>
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </RestrictedAccess>
  );
}

export default ShowTabs;
