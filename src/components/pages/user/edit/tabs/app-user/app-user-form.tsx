import { Button } from "@chakra-ui/react";
import { SelectInputField } from "@components/form/select";
import { yupResolver } from "@hookform/resolvers/yup";
import notification from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LuArrowLeft } from "react-icons/lu";
import * as Yup from "yup";

export default function AppAppUser({ setIsCreate, projectList, setProjectId }) {
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
      notification(t("common:action.project_select"));
      return;
    }
    setProjectId(projectForm.getValues("projectId"));
  };

  const mapProjectList = (projectList) =>
    projectList.map((item) => ({ label: item.name, value: item.id }));

  return (
    <FormProvider {...projectForm}>
      <form className="fade">
        <Button mb={4} type="button" size="sm" onClick={() => setIsCreate(false)}>
          <LuArrowLeft />
          {t("common:prev")}
        </Button>
        <SelectInputField
          isRequired={true}
          name="projectId"
          options={mapProjectList(projectList)}
          label={t("common:select_project")}
          shouldPortal={true}
          onChangeCallback={projectForm.handleSubmit(handleFormSubmit)}
        />
      </form>
    </FormProvider>
  );
}
