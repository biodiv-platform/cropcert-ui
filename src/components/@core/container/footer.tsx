import {
  Box,
  chakra,
  Container,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import GithubIcon from "@icons/github";
import MailIcon from "@icons/mail";
import TwitterIcon from "@icons/twitter";
import { SITE_TITLE } from "@static/constants";
import { containerMaxW } from "@static/navmenu";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import packagejson from "../../../../package.json";

const SocialButton = ({ children, label, href }) => (
  <Link href={href} key={label}>
    <chakra.button
      bg="blackAlpha.100"
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{ bg: "blackAlpha.200" }}
      rel="noreferrer noopener"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  </Link>
);

export default function Footer() {
  const { t } = useTranslation();
  const { pages } = useGlobalState();

  return (
    <Box bg="gray.100" color="gray.700" className="no-print">
      <Container as={Stack} maxW={containerMaxW} py={20}>
        <SimpleGrid templateColumns={{ md: "4fr 2fr" }} gap={8}>
          <Stack gap={4}>
            <Flex gap={6}>
              <Image
                alt={SITE_TITLE}
                src={SITE_CONFIG.SITE.ICON}
                height={{ base: "30px", md: "40px" }}
              />
              <Image
                src="/eu.svg"
                alt="european union logo"
                height={{ base: "30px", md: "40px" }}
              />
            </Flex>
            <Text fontSize="sm" color="subtle">
              {t("common:license")} (v{packagejson.version})
            </Text>
          </Stack>
          <Stack gap={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              {pages
                .filter((page) => page.showInFooter !== false)
                .map((page) => (
                  <Link href={`/page/show/${page.id}`} key={page.id}>
                    {page.title}
                  </Link>
                ))}
            </SimpleGrid>

            <Stack direction="row" gap={6}>
              <SocialButton
                label="Mail"
                href={SITE_CONFIG.FOOTER.SOCIAL.MAIL.URL}
                children={<MailIcon />}
              />
              <SocialButton
                label="Twitter"
                href={SITE_CONFIG.FOOTER.SOCIAL.TWITTER.URL}
                children={<TwitterIcon />}
              />
              <SocialButton
                label="GitHub"
                href={SITE_CONFIG.FOOTER.SOCIAL.GITHUB.URL}
                children={<GithubIcon />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
