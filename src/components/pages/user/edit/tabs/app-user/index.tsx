import { Box } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";

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
  setProjectId,
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
    <AccordionRoot p={4} collapsible>
      <AccordionItem
        mb={8}
        bg="white"
        border="1px solid var(--chakra-colors-gray-300)"
        borderRadius="md"
        value="odk"
      >
        <AccordionItemTrigger _expanded={{ bg: "gray.100" }}>
          <Box flex={1} textAlign="left" fontSize="lg" pl={4}>
            🛂 {t("common:action.odk_permission")}
          </Box>
        </AccordionItemTrigger>

        <AccordionItemContent p={4}>
          {isCreate ? (
            <AddAppUserForm
              setIsCreate={setIsCreate}
              projectList={projectList}
              setProjectId={setProjectId}
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
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
