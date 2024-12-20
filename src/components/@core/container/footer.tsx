import {
  Box,
  chakra,
  Container,
  Flex,
  Image,
  Link,
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
import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import packagejson from "../../../../package.json";

const SocialButton = ({ children, label, href }) => (
  <chakra.button
    bg="blackAlpha.100"
    rounded="full"
    w={8}
    h={8}
    cursor="pointer"
    as="a"
    href={href}
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    transition="background 0.3s ease"
    _hover={{ bg: "blackAlpha.200" }}
    target="_blank"
    rel="noreferrer noopener"
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </chakra.button>
);

export default function Footer() {
  const { t } = useTranslation();
  const { pages } = useGlobalState();

  return (
    <Box bg="gray.100" color="gray.700" className="no-print">
      <Container as={Stack} maxW={containerMaxW} py={4}>
        <SimpleGrid templateColumns={{ md: "4fr 2fr" }} spacing={8}>
          <Stack spacing={4}>
            <Flex gap={6}>
              <Image
                alt={SITE_TITLE}
                src={SITE_CONFIG.SITE.ICON}
                height={{ base: "30px", md: "40px" }}
              />
              <Image src="/eu.svg" height={{ base: "30px", md: "40px" }} />
            </Flex>
            <Text fontSize="sm" color="subtle">
              {t("common:license")} (v{packagejson.version})
            </Text>
          </Stack>
          <Stack spacing={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {pages
                .filter((page) => page.showInFooter !== false)
                .map((page) => (
                  <NextLink href={`/page/show/${page.id}`} key={page.id}>
                    <Link>{page.title}</Link>
                  </NextLink>
                ))}
            </SimpleGrid>

            <Stack direction="row" spacing={6}>
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
