import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { RestrictedAccess } from "@components/@core/layout";
import BatchListPageComponent from "@components/pages/batch/list";
import { BatchFilterProvider } from "@components/pages/batch/list/use-batch-filter";
import FarmerListPageComponent from "@components/pages/farmer-produce/list";
import { FarmerProduceFilterProvider } from "@components/pages/farmer-produce/list/use-farmer-produce-filter";
import LotListPageComponent from "@components/pages/lot/list";
import { LotFilterProvider } from "@components/pages/lot/list/use-lot-filter";
import {
  DEFAULT_BATCH_FILTER,
  DEFAULT_FARMER_PRODUCE_FILTER,
  DEFAULT_LOT_FILTER,
} from "@static/constants";
import React, { useEffect, useState } from "react";

function ShowTabs() {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    // Retrieve the stored selected tab index from localStorage
    const storedIndex = localStorage.getItem("selectedTab");

    // If a stored index exists, set it as the selected tab index
    if (storedIndex !== null) {
      setSelectedTab(parseInt(storedIndex));
    }
  }, []);

  const handleTabChange = (index) => {
    // Update the selected tab index in state and localStorage
    setSelectedTab(index);
    localStorage.setItem("selectedTab", index);
  };

  return (
    <RestrictedAccess>
      <Tabs isFitted variant="enclosed" p={4} onChange={handleTabChange} index={selectedTab}>
        <TabList>
          <Tab>🚜 Farmer Produce</Tab>
          <Tab>🧺 Batch(s)</Tab>
          <Tab>📦 Lot(s)</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <FarmerProduceFilterProvider filter={DEFAULT_FARMER_PRODUCE_FILTER}>
              <FarmerListPageComponent key={selectedTab} />
            </FarmerProduceFilterProvider>
          </TabPanel>
          <TabPanel>
            <BatchFilterProvider filter={DEFAULT_BATCH_FILTER}>
              <BatchListPageComponent key={selectedTab} />
            </BatchFilterProvider>
          </TabPanel>
          <TabPanel>
            <LotFilterProvider filter={DEFAULT_LOT_FILTER}>
              <LotListPageComponent key={selectedTab} />
            </LotFilterProvider>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </RestrictedAccess>
  );
}

export default ShowTabs;
