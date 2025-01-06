// import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Group } from "@chakra-ui/react";
import AddIcon from "@icons/add";
import { axDeleteAppUser } from "@services/odk.service";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import DeleteIcon from "@/icons/delete";

const GroupRulesTable = ({
  user,
  project,
  handleProjectChange,
  setIsCreate,
  setIsCreateWebUser,
  isWebUser,
}) => {
  const { t } = useTranslation();

  const removeGroupRules = async (projectId) => {
    const { success } = await axDeleteAppUser({
      userName: `${user.userName}-suser${user.id}`,
      projectId,
    });
    if (success) {
      handleProjectChange(project.filter((item) => item.id !== projectId));
      notification(t("common:action.project_delete_sucess"), NotificationType.Success);
    } else {
      notification(t("common:action.project_delete_fail"), NotificationType.Error);
    }
  };

  return (
    <Box fontSize="lg" w="full" overflowX="auto" className="fade">
      <Group gridRowGap={4} mt={4} mb={4}>
        {!isWebUser && (
          <Button colorPalette="blue" size="sm" onClick={() => setIsCreateWebUser(true)}>
            <AddIcon />
            {t("common:action.create_web_user")}
          </Button>
        )}
        <Button colorPalette="blue" size="sm" onClick={() => setIsCreate(true)}>
          <AddIcon />
          {t("common:action.create_app_user")}
        </Button>
      </Group>
      {project.length > 0 && (
        <table style={{ minWidth: "750px" }} className="table table-bordered">
          <thead>
            <tr>
              <th align="left">{t("common:action.project_title")}</th>
              <th align="left">{t("common:actions.title")}</th>
            </tr>
          </thead>
          <tbody style={{ marginTop: "40px" }}>
            {project.map((item, index) => (
              <tr key={index}>
                <td>
                  <Box userSelect="all" fontSize="sm" className="elipsis">
                    {item.name}
                  </Box>
                </td>
                <td>
                  <Button
                    onClick={() => removeGroupRules(item.id)}
                    // variant="link"
                    colorPalette="red"
                  >
                    <DeleteIcon />
                    {t("common:delete")}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Box>
  );
};

export default GroupRulesTable;
