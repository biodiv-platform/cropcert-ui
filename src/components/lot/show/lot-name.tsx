import { Tag } from "carbon-components-react";
import React from "react";

export default function lotName({ name, status }) {
  return (
    <h1 className="eco--title mb-0">
      {name}
      <Tag className="eco--tag-heading" type="cyan">
        {status}
      </Tag>
    </h1>
  );
}
