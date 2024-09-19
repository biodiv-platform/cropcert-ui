import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { RestrictedAccess } from "@components/@core/layout";
import BatchListPageComponent from "@components/pages/batch/list";
import FarmerListPageComponent from "@components/pages/farmer-produce/list";
import { FarmerFilterProvider } from "@components/pages/farmer-produce/list/use-farmer-produce-filter";
import LotListPageComponent from "@components/pages/lot/list";
import { DEFAULT_FARMER_PRODUCE_FILTER } from "@static/constants";
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
            <FarmerFilterProvider filter={DEFAULT_FARMER_PRODUCE_FILTER}>
              <FarmerListPageComponent key={selectedTab} />
            </FarmerFilterProvider>
          </TabPanel>
          <TabPanel>
            <BatchListPageComponent key={selectedTab} />
          </TabPanel>
          <TabPanel>
            <LotListPageComponent key={selectedTab} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </RestrictedAccess>
  );
}

export default ShowTabs;
