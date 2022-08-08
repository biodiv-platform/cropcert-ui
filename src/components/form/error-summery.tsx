import { WarningIcon } from "@chakra-ui/icons";
import { List, ListItem } from "@chakra-ui/react";
import flat from "flat";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function ErrorSummery() {
  const {
    formState: { errors },
  } = useFormContext();

  const readableError = (key, error) => {
    const capatalizedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
    return error && error.replace(key, `"${capatalizedKey}"`);
  };

  return (
    <List spacing={2} mb={4}>
      {Object.entries(flat(errors))
        .filter(([key]) => key.endsWith(".message"))
        .map(([key, error]) => (
          <ListItem className="fade" key={key}>
            <WarningIcon mr={2} color="red.500" />
            <a href={`#${key.replace(".message", "")}`}>{readableError(key, error)}</a>
          </ListItem>
        ))}
    </List>
  );
}
