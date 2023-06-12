import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { DEFAULT_PASSWORD_LENGTH } from "@static/constants";
import { generatePassword } from "@utils/basic";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

export default function WebUser({ user, setIsCreateWebUser, setPassword }) {
  const { t } = useTranslation();

  const [password] = useState(generatePassword(DEFAULT_PASSWORD_LENGTH));

  useEffect(() => {
    setPassword(password);
  }, [password]);

  const defaultValues = {
    // for show purpose concatination of user id is done in backend
    userName: user.userName + "-suser" + user.id,
    email: user.email,
    sUserId: user.id,
    password: password,
  };

  const projectForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        password: Yup.string().min(10).required(),
      })
    ),
    defaultValues,
  });

  return (
    <FormProvider {...projectForm}>
      <form className="fade">
        <Button
          mb={4}
          type="button"
          size="sm"
          onClick={() => setIsCreateWebUser(false)}
          leftIcon={<ArrowBackIcon />}
        >
          {t("common:prev")}
        </Button>
        <TextBoxField name="sUserId" label={t("user:id")} disabled={true} hidden={true} />
        <TextBoxField name="userName" label={t("user:name")} disabled={true} />
        <TextBoxField name="email" label={t("user:email")} disabled={true} />
        <TextBoxField
          name="password"
          label={t("user:password")}
          type="text"
          autoComplete="new-password"
          hidden={true}
        />
      </form>
    </FormProvider>
  );
}
