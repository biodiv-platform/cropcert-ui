import { List, ListIcon, ListItem } from "@chakra-ui/core";
import flat from "flat";
import { useFormikContext } from "formik";
import React from "react";

export default function ErrorSummery() {
  const { errors } = useFormikContext();

  const readableError = (key, error) => {
    const capatalizedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
    return error && error.replace(key, `"${capatalizedKey}"`);
  };

  return (
    <List spacing={2} mb={4}>
      {Object.entries(flat(errors)).map(([key, error]) => (
        <ListItem className="fade" key={key}>
          <ListIcon icon="warning" color="red.500" />
          {readableError(key, error)}
        </ListItem>
      ))}
    </List>
  );
}
