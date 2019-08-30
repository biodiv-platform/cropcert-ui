import { View16 } from "@carbon/icons-react";
import { Link } from "gatsby";
import React from "react";

export default function lotTableLink(id) {
  return (
    <span>
      {id}&nbsp;
      <Link to={`/lot/show?id=${id}`}>
        <View16 style={{ verticalAlign: "middle" }} />
      </Link>
    </span>
  );
}
