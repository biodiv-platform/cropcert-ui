import Container from "@components/@core/container";
import BatchCreate from "@components/batch/create";
import { hierarchicalRoles } from "@utils/auth.util";
import { ROLES } from "@utils/constants";
import React from "react";

const BatchCreatePage = () => {
  return (
    <Container roles={hierarchicalRoles(ROLES.COLLECTION_CENTER)}>
      <h1 className="eco--title">Create Batch</h1>
      <BatchCreate />
    </Container>
  );
};

export default BatchCreatePage;
