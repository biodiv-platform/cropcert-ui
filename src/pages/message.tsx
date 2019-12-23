import MessageComponent from "@components/pages/message";
import { OPERATIONAL } from "@static/messages";
import React from "react";

const MessagePage = ({ query }) => {
  const { success = "false", mcode = "NA", id = -1 } = query;

  return (
    <MessageComponent
      success={success === "false" ? false : true}
      message={OPERATIONAL[mcode].MESSAGE.replace("##id##", id)}
      backLink={OPERATIONAL[mcode].BACK_LINK}
      backLinkTitle={OPERATIONAL[mcode].BACK_TITLE}
    />
  );
};

MessagePage.getInitialProps = async ({ query }) => ({ query });

export default MessagePage;
