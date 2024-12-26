import { Button, Center, Text } from "@chakra-ui/react";
import Container from "@components/@core/container";
import useGlobalState from "@hooks/use-global-state";
import { ROLES } from "@static/constants";
import { hasAccess } from "@utils/auth";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";

export default function EmptyPageComponent() {
  const { t } = useTranslation();
  const { user } = useGlobalState();

  const [canCreate, setCanCreate] = useState(false);

  useEffect(() => {
    setCanCreate(hasAccess([ROLES.ADMIN], user));
  }, []);

  return (
    <Container mt={6}>
      <Center textAlign="center" height="calc(100vh - var(--heading-height))">
        <div>
          <Text fontSize="xl" mb={4}>
            {t("page:empty")}
          </Text>
          {canCreate && (
            <Link passHref={true} href="/page/create" legacyBehavior>
              <Button as="a" colorScheme="blue">
                {<LuArrowRight />}
                {t("page:create.title")}
              </Button>
            </Link>
          )}
        </div>
      </Center>
    </Container>
  );
}
