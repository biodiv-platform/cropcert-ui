import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { RestrictedAccess } from "@components/@core/layout";
import BatchListPageComponent from "@components/pages/batch/list";
import FarmerListPageComponent from "@components/pages/farmer/list";
import FarmerMemberPageComponent from "@components/pages/farmerMember/list";
import LotListPageComponent from "@components/pages/lot/list";
import { axListUnion } from "@services/union.service";
import React from "react";

function ShowTabs({ unions }) {
  return (
    <RestrictedAccess>
      <Tabs isFitted variant="enclosed" p={4}>
        <TabList>
          <Tab>🧑‍🌾 Farmer Member(s)</Tab>
          <Tab>🚜 Farmer Collection(s)</Tab>
          <Tab>🧺 Batch(s)</Tab>
          <Tab>📦 Lot(s)</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Container>
              <FarmerMemberPageComponent />
            </Container>
          </TabPanel>
          <TabPanel>
            <Container>
              <FarmerListPageComponent />
            </Container>
          </TabPanel>
          <TabPanel>
            <Container>
              <BatchListPageComponent />
            </Container>
          </TabPanel>
          <TabPanel>
            <LotListPageComponent unions={unions} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </RestrictedAccess>
  );
}

ShowTabs.getInitialProps = async () => {
  const { data } = await axListUnion();
  return { unions: data.map((u) => ({ label: u.name, value: u.code })) };
};

export default ShowTabs;
