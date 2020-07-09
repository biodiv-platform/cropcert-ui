import { List, ListIcon, ListItem } from "@chakra-ui/core";
import flat from "flat";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";

export default function ErrorSummery() {
  const { errors, isSubmitting } = useFormikContext();
  const [canShowErrors, setCanShowErrors] = useState<boolean>();

  useEffect(() => {
    isSubmitting && setCanShowErrors(true);
  }, [isSubmitting]);

  const readableError = (key, error) => {
    const capatalizedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
    return error.replace(key, `"${capatalizedKey}"`);
  };

  return (
    <List spacing={2} mb={4}>
      {canShowErrors &&
        Object.entries(flat(errors)).map(([key, error]) => (
          <ListItem className="fade" key={key}>
            <ListIcon icon="warning" color="red.500" />
            {readableError(key, error)}
          </ListItem>
        ))}
    </List>
  );
}
