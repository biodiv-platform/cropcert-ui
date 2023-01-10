import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import AddIcon from "@icons/add";
import { axDeleteAppUser } from "@services/odk.service";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const GroupRulesTable = ({ user, project, handleProjectChange, setIsCreate }) => {
  const { t } = useTranslation();

  const removeGroupRules = async (projectId) => {
    const { success } = await axDeleteAppUser({
      userName: `${user.userName}-${user.id}`,
      projectId,
    });
    if (success) {
      handleProjectChange(project.filter((item) => item.id !== projectId));
      notification(t("group:rules.remove.success"), NotificationType.Success);
    } else {
      notification(t("group:rules.remove.failure"), NotificationType.Error);
    }
  };

  return (
    <Box fontSize="lg" w="full" overflowX="auto" className="fade">
      <table style={{ minWidth: "750px" }} className="table table-bordered">
        <thead>
          <tr>
            <th align="left">{t("Project Name")}</th>
            <th align="left">{t("Action")}</th>
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
                  variant="link"
                  colorScheme="red"
                  leftIcon={<DeleteIcon />}
                >
                  {t("common:delete")}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ButtonGroup spacing={4} mt={4}>
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => setIsCreate(true)}
          leftIcon={<AddIcon />}
        >
          {t("Create App User")}
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default GroupRulesTable;
