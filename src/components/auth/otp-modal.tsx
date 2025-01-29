import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { axRegenerateOTP, axValidateUser } from "@services/auth.service";
import { setCookies } from "@utils/auth";
import notification, { NotificationType } from "@utils/notification";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LuArrowRight } from "react-icons/lu";
import * as Yup from "yup";

import { DialogBackdrop, DialogContent, DialogFooter, DialogRoot } from "../ui/dialog";
import OTPIcon from "./otp-icon";

export default function OTPModal({ isOpen, onClose, user }) {
  const { t } = useTranslation();
  const router = useRouter();

  const otpForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(
      Yup.object().shape({
        otp: Yup.string().required(),
      })
    ),
  });

  const handleOtpFormSubmit = async (values) => {
    const { success, data, message } = await axValidateUser({
      id: user.id,
      otp: values.otp,
    });

    if (success) {
      setCookies(data);
      router.push("/");
      notification(t(message), NotificationType.Success);
    } else {
      notification(t(message));
    }
  };

  const handleRegenerate = async () => {
    const { id } = user;

    const payload = {
      id,
      action: 0,
    };

    const { success, data } = await axRegenerateOTP(payload);
    notification(t(data), success ? NotificationType.Success : NotificationType.Error);
  };

  return (
    <DialogRoot placement={"top"} size="sm" open={isOpen} onOpenChange={onClose}>
      <DialogBackdrop className="fade">
        <DialogContent className="fadeInUp" borderRadius="md">
          <FormProvider {...otpForm}>
            <form onSubmit={otpForm.handleSubmit(handleOtpFormSubmit)}>
              <DialogContent pt={8}>
                <Flex direction="column" align="center" mb={8} mt={4}>
                  <OTPIcon />
                </Flex>
                <Heading mb={2} size="lg">
                  {t("auth:otp.title")}
                </Heading>
                <Text mb={2} color="gray.600">
                  {t("auth:otp.description")} {user?.vt}
                </Text>
                <TextBoxField mb={0} name="otp" label={t("auth:otp.form.otp")} />
              </DialogContent>

              <DialogFooter justifyContent="space-between">
                <Link as="button" type="button" onClick={handleRegenerate}>
                  {t("auth:otp.resend")}
                </Link>
                <SubmitButton rightIcon={<LuArrowRight />}>
                  {t("auth:otp.form.submit")}
                </SubmitButton>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </DialogBackdrop>
    </DialogRoot>
  );
}
