import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

export default function WebUser({ user, setIsCreateWebUser, setPassword }) {
  const { t } = useTranslation();

  const defaultValues = {
    // for show purpose concatination of user id is done in backend
    userName: user.userName + "-" + user.id,
    email: user.email,
    sUserId: user.id,
  };

  const projectForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        password: Yup.string().min(8).required(),
      })
    ),
    defaultValues,
  });

  const handleChange = async (values) => {
    setPassword(values.password);
  };

  return (
    <FormProvider {...projectForm}>
      <form onChange={projectForm.handleSubmit(handleChange)} className="fade">
        <Button
          mb={4}
          type="button"
          size="sm"
          onClick={() => setIsCreateWebUser(false)}
          leftIcon={<ArrowBackIcon />}
        >
          {t("common:prev")}
        </Button>
        <TextBoxField name="sUserId" label={t("User Id")} disabled={true} hidden={true} />
        <TextBoxField name="userName" label={t("User name")} disabled={true} />
        <TextBoxField name="email" label={t("Email address")} disabled={true} />
        <TextBoxField
          name="password"
          label={t("user:password")}
          type="password"
          autoComplete="new-password"
        />
      </form>
    </FormProvider>
  );
}
