import Container from "@components/@core/container";
import BatchCreate from "@components/batch/create";
import { ROLES } from "@utils/constants";
import React from "react";

const BatchCreatePage = () => {
  return (
    <Container
      roles={[
        ROLES.COLLECTION_CENTER,
        ROLES.COOPERATIVE,
        ROLES.UNION,
        ROLES.ADMIN,
      ]}
    >
      <h1 className="eco--title">Create Batch</h1>
      <BatchCreate />
    </Container>
  );
};

export default BatchCreatePage;
