import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

import AddAppUserForm from "./app-user-form";
import ProjectTable from "./app-user-list";
import WebUser from "./web-user-form";

export default function AppUser({
  user,
  projectList,
  userProjectList,
  setUserProjectList,
  isWebUser,
  setPassword,
}) {
  const { t } = useTranslation();
  const [project, setProject] = useState(userProjectList);

  const [isCreate, setIsCreate] = useState(false);

  const [isCreateWebUser, setIsCreateWebUser] = useState(false);

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
          {isCreate ? (
            <AddAppUserForm
              user={user}
              project={project}
              setIsCreate={setIsCreate}
              projectList={projectList}
              handleProjectChange={handleProjectUpdate}
            />
          ) : isCreateWebUser ? (
            <WebUser
              user={user}
              setIsCreateWebUser={setIsCreateWebUser}
              setPassword={setPassword}
            />
          ) : (
            <ProjectTable
              project={project}
              user={user}
              handleProjectChange={handleProjectUpdate}
              setIsCreate={setIsCreate}
              setIsCreateWebUser={setIsCreateWebUser}
              isWebUser={isWebUser}
            />
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
