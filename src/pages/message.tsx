import Container from "@components/@core/container";
import MessageComponent from "@components/@core/message";
import { isBrowser, OPERATION_MESSAGES, ROLES } from "@utils/constants";
import { parse } from "query-string";
import React from "react";

export default function MessagePage() {
  const { success, mcode, id } = isBrowser
    ? parse(location.search, { parseBooleans: true })
    : { success: "false", mcode: "NA", id: -1 };

  return (
    <Container roles={[ROLES.AUTHORIZED]}>
      <MessageComponent
        success={success === "false" ? false : true}
        message={OPERATION_MESSAGES[mcode].MESSAGE.replace("##id##", id)}
        backLink={OPERATION_MESSAGES[mcode].BACK_LINK}
        backLinkTitle={OPERATION_MESSAGES[mcode].BACK_TITLE}
      />
    </Container>
  );
}
