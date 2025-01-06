import { Box, Button } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import { axUserSearch } from "@services/auth.service";
import { ACTIVITY_UPDATED } from "@static/events";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { emit } from "react-gbus";
import { Mention, MentionsInput } from "react-mentions";

import { Field } from "@/components/ui/field";

export default function Comment({ resourceId, resourceType, focusRef, commentFunc }) {
  const [text, setText] = useState("");
  const { t } = useTranslation();
  const { languageId } = useGlobalState();

  const onMentionQuery = (q, callback) => {
    if (!q) {
      return;
    }
    axUserSearch(q).then(({ data }) => callback(data));
  };

  const onTextChange = (e, value) => {
    setText(value);
  };

  const handleOnComment = async () => {
    const { success } = await commentFunc({
      body: text,
      languageId: languageId,
      rootHolderId: resourceId,
      rootHolderType: resourceType,
      subRootHolderId: null,
      subRootHolderType: null,
    });
    if (success) {
      notification("Comment Added", NotificationType.Success);
      setText("");
      emit(ACTIVITY_UPDATED, resourceId);
      focusRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <Box>
      <Field invalid={false} mb={4} htmlFor="comment" label={t("form:comments.add_comment")}>
        <MentionsInput
          id="comment"
          className="textarea"
          name="comment"
          height="100px"
          value={text}
          allowSpaceInQuery={true}
          onChange={onTextChange}
        >
          <Mention trigger="@" data={onMentionQuery} />
        </MentionsInput>
      </Field>
      <Button colorPalette="blue" onClick={handleOnComment}>
        {t("form:comments.post")}
      </Button>
    </Box>
  );
}
