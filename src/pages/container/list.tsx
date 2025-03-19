import { RestrictedAccess } from "@components/@core/layout";
import ContainerListPageComponent from "@components/pages/container/list";
import { axListUnion } from "@services/entities.service";
import React from "react";

function ContainerListPage() {
  return (
    <RestrictedAccess>
      <ContainerListPageComponent />
    </RestrictedAccess>
  );
}

ContainerListPage.getInitialProps = async () => {
  const { data } = await axListUnion();
  return { unions: data.map((u) => ({ label: u.name, value: u.code, ...u })) };
};

export default ContainerListPage;
