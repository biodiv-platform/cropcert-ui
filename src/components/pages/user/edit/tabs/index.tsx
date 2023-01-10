import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { axIsOdkWebUser } from "@services/odk.service";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import NotificationsTab from "./notifications";
import ChangePasswordTab from "./password";
import PermissionsTab from "./permissions";
import UserAboutTab from "./user-about";

export default function UserEditTabs({ user, isAdmin }) {
  const { t } = useTranslation();
  const [isWebUser, setIsWebUser] = useState<boolean>();

  useEffect(() => {
    axIsOdkWebUser(user.id).then((item) => setIsWebUser(item.data));
  }, []);

  return (
    <Box gridColumn={{ md: "2/5" }} mb={4}>
      <div className="white-box">
        <Tabs isLazy={true}>
          <TabList>
            <Tab>👤 {t("user:about")}</Tab>
            <Tab>🔑 {t("user:change_password")}</Tab>
            <Tab>🔔 {t("user:notifications")}</Tab>
            {isAdmin && <Tab>🛡️ {t("user:permissions")}</Tab>}
          </TabList>
          <TabPanels>
            <TabPanel>
              <UserAboutTab user={user} isAdmin={isAdmin} />
            </TabPanel>
            <TabPanel>
              <ChangePasswordTab userId={user.id} />
            </TabPanel>
            <TabPanel>
              <NotificationsTab user={user} />
            </TabPanel>
            {isAdmin && (
              <TabPanel>
                <PermissionsTab user={user} isWebUser={isWebUser} />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </div>
    </Box>
  );
}
