import { hasAccess } from "@utils/auth.util";
import React from "react";

import Card from "./card";
import links from "./links";

export default function Dashboard() {
  const getLinks = (children): [object] => {
    return children.reduce(
      (acc, link, index) =>
        hasAccess(link.access) ? [...acc, <Card key={index} {...link} />] : acc,
      []
    );
  };

  const renderCardGroup = (cardGroup, index) => {
    const linkList = getLinks(cardGroup.children);
    return linkList.length > 0 ? (
      <React.Fragment key={index}>
        <h1>{cardGroup.title}</h1>
        <div className="bx--row">{linkList}</div>
      </React.Fragment>
    ) : null;
  };

  return <>{links.map(renderCardGroup)}</>;
}
