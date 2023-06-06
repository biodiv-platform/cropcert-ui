import { RestrictedAccess } from "@components/@core/layout";
import LotListPageComponent from "@components/pages/lot/list";
import { axListUnion } from "@services/union.service";
import React from "react";

function LotListPage({ unions }) {
  console.log("unions");
  console.log(unions);

  return (
    <RestrictedAccess>
      <LotListPageComponent unions={unions} />
    </RestrictedAccess>
  );
}

LotListPage.getInitialProps = async () => {
  const { data } = await axListUnion();
  return { unions: data.map((u) => ({ label: u.name, value: u.code })) };
};

export default LotListPage;
