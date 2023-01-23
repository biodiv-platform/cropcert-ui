import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { SwitchField } from "@components/form/switch";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

import AddAppUserForm from "./app-user-form";
import ProjectTable from "./app-user-list";

export default function AppUser({ user, projectList, userProjectList, setUserProjectList }) {
  const { t } = useTranslation();
  const [project, setProject] = useState(userProjectList);

  const [isCreate, setIsCreate] = useState(false);

  const handleProjectUpdate = (value) => {
    setProject(value);
    setUserProjectList(value);
  };
  return (
    <Accordion allowToggle={true}>
      <AccordionItem
        mb={8}
        bg="white"
        border="1px solid var(--chakra-colors-gray-300)"
        borderRadius="md"
      >
        <AccordionButton _expanded={{ bg: "gray.100" }}>
          <Box flex={1} textAlign="left" fontSize="lg">
            🛂 {t("common:action.odk_permission")}
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel p={4}>
          <SwitchField mt={4} name="odkWebUserEnabled" label={t("common:action.enable_web_user")} />
          {isCreate ? (
            <AddAppUserForm
              user={user}
              project={project}
              setIsCreate={setIsCreate}
              projectList={projectList}
              handleProjectChange={handleProjectUpdate}
            />
          ) : (
            <ProjectTable
              project={project}
              user={user}
              handleProjectChange={handleProjectUpdate}
              setIsCreate={setIsCreate}
            />
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
