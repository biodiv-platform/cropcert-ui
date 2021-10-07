import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Button,
  Flex,
} from "@chakra-ui/react";
import { GENERIC } from "@static/messages";
import NextLink from "next/link";
import React from "react";

export default function Message({ success, message, backLink, backLinkTitle }: any) {
  const prop: Partial<AlertProps> = { status: success ? "success" : "error" };

  return (
    <>
      <Alert {...prop} variant="subtle" bg="transparent" flexDirection="column" textAlign="center">
        <AlertIcon boxSize="3.2rem" mr={0} />
        <AlertTitle mt={4} mb={2} fontSize="2xl">
          {success ? "Success" : "Error"}
        </AlertTitle>
        <AlertDescription>{success ? message : GENERIC.ERROR}</AlertDescription>
        <Flex mt={4}>
          <NextLink href={backLink}>
            <Button mr={4} colorScheme="blue">
              {backLinkTitle}
            </Button>
          </NextLink>
          <NextLink href="/dashboard">
            <Button colorScheme="blue" variant="outline">
              Go to Dashboard
            </Button>
          </NextLink>
        </Flex>
      </Alert>
    </>
  );
}
