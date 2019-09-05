import Container from "@components/@core/container";
import LotShow from "@components/lot/show";
import withLocation from "@components/withLocation";
import React from "react";

function LotShowPage({ query }) {
  return (
    <Container>
      <LotShow lotId={query.id} />
    </Container>
  );
}

export default withLocation(LotShowPage);
