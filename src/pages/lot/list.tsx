import { RestrictedAccess } from "@components/@core/layout";
import LotListPageComponent from "@components/pages/lot/list";
import { axListUnion } from "@services/entities.service";
import React from "react";

function LotListPage() {
  return (
    <RestrictedAccess>
      <LotListPageComponent />
    </RestrictedAccess>
  );
}

LotListPage.getInitialProps = async () => {
  const { data } = await axListUnion();
  return { unions: data.map((u) => ({ label: u.name, value: u.code, ...u })) };
};

export default LotListPage;
