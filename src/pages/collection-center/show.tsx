import Container from "@components/@core/container";
import CCShow from "@components/collection-center/show";
import withLocation from "@components/withLocation";
import React from "react";

const CCShowPage = ({ query }) => {
  return <Container>{query.id && <CCShow ccId={query.id} />}</Container>;
};

export default withLocation(CCShowPage);
