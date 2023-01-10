import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { SelectInputField } from "@components/form/select";
import { yupResolver } from "@hookform/resolvers/yup";
// import useGlobalState from "@hooks/use-global-state";
import CheckIcon from "@icons/check";
import { axCreateOdkUser } from "@services/odk.service";
import notification from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

export default function AppAppUser({
  user,
  project,
  handleProjectChange,
  setIsCreate,
  projectList,
}) {
  const { t } = useTranslation();

  const projectForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        projectId: Yup.string().required(),
      })
    ),
  });

  const handleFormSubmit = async () => {
    if (!projectForm.getValues("projectId")) {
      notification(t("Please select a project to create App user"));
      return;
    }
    const payload = {
      sUserId: user.id,
      email: user.email,
      username: user.userName,
      projectId: projectForm.getValues("projectId"),
    };
    const { success, data }: any = await axCreateOdkUser(payload);
    if (success && data) {
      const projectData = projectList.find(
        (item) => (item.id = projectForm.getValues("projectId"))
      );
      handleProjectChange([...project, { name: projectData.name, id: projectData.id }]);
      setIsCreate(false);
    } else {
      notification(t("Unable to create App user"));
    }
  };

  return (
    <FormProvider {...projectForm}>
      <form onSubmit={projectForm.handleSubmit(handleFormSubmit)} className="fade">
        <Button
          mb={4}
          type="button"
          size="sm"
          onClick={() => setIsCreate(false)}
          leftIcon={<ArrowBackIcon />}
        >
          {t("back")}
        </Button>
        <SelectInputField
          isRequired={true}
          name="projectId"
          options={projectList.map((item) => ({ label: item.name, value: item.id }))}
          label={t("Select Project")}
          shouldPortal={true}
        />
        <Button
          colorScheme="blue"
          size="sm"
          onClick={handleFormSubmit}
          mb={0}
          leftIcon={<CheckIcon />}
        >
          {t("Create")}
        </Button>{" "}
      </form>
    </FormProvider>
  );
}
