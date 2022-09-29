import {
  Box,
  ButtonGroup,
  chakra,
  Flex,
  Image,
  Stack,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import FacebookIcon from "@icons/facebook";
import GithubIcon from "@icons/github";
import MailIcon from "@icons/mail";
import { SITE_TITLE } from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import packagejson from "../../../../package.json";
import Container from ".";

const SocialButton = ({ children, label, href }) => (
  <chakra.button
    bg="gray.200"
    rounded="full"
    w={10}
    h={10}
    cursor="pointer"
    as="a"
    href={href}
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    transition="background 0.3s ease"
    _hover={{ bg: "gray.300" }}
    fontSize="xl"
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </chakra.button>
);

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box bg="gray.100">
      <Container as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
        <Stack spacing={{ base: "4", md: "5" }}>
          <Stack justify="space-between" direction="row" align="center">
            <Flex gap={6}>
              <Image alt={SITE_TITLE} src={SITE_CONFIG.SITE.ICON} />
              <Image src="/eu.svg" />
            </Flex>
            <ButtonGroup variant="ghost" spacing={4}>
              <SocialButton
                label="Mail"
                href={SITE_CONFIG.FOOTER.SOCIAL.MAIL.URL}
                children={<MailIcon />}
              />
              <SocialButton
                label="Facebook"
                href={SITE_CONFIG.FOOTER.SOCIAL.FACEBOOK.URL}
                children={<FacebookIcon />}
              />
              <SocialButton
                label="GitHub"
                href={SITE_CONFIG.FOOTER.SOCIAL.GITHUB.URL}
                children={<GithubIcon />}
              />
            </ButtonGroup>
          </Stack>
          <Text fontSize="sm" color="subtle">
            {t("common:license")} (v{packagejson.version})
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
