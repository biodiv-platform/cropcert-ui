import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import NextLink from "next/link";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import SignUpForm from "./form";

function RegisterComponent() {
  const { t } = useTranslation();

  return (
    <Container>
      <Flex align="center" justify="center" pt={6}>
        <Box maxW="xl" width="full" pb={6}>
          <NextSeo title={t("user:sign_up")} />
          <PageHeading>{t("user:sign_up")}</PageHeading>
          <Text mb={4}>
            {t("user:existing_user")}{" "}
            <NextLink href="/login" legacyBehavior>
              <BlueLink>
                {t("auth:sign_in")}
                <ChevronRightIcon />
              </BlueLink>
            </NextLink>
          </Text>
          <SignUpForm />
        </Box>
      </Flex>
    </Container>
  );
}

export default RegisterComponent;
