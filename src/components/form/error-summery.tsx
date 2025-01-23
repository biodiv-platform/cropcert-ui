import { List } from "@chakra-ui/react";
import flat from "flat";
import React from "react";
import { useFormContext } from "react-hook-form";
import { LuTriangle } from "react-icons/lu"; // Warning triangle icon

export default function ErrorSummery() {
  const {
    formState: { errors },
  } = useFormContext();

  const readableError = (key, error) => {
    const capatalizedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
    return error && error.replace(key, `"${capatalizedKey}"`);
  };

  return (
    <List.Root gap={2} mb={4}>
      {Object.entries(flat(errors))
        .filter(([key]) => key.endsWith(".message"))
        .map(([key, error]) => (
          <List.Item className="fade" key={key}>
            {/* mr={2} */}
            <LuTriangle color="red.500" />
            <a href={`#${key.replace(".message", "")}`}>{readableError(key, error)}</a>
          </List.Item>
        ))}
    </List.Root>
  );
}
