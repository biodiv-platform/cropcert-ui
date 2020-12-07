import Table from "@components/@core/table";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

const basicInfoDummy = {
  verification: "01-01-1995",
  contract: "01-01-1995",
};

export default function CertificationStatus({ farmer }) {
  const basicInfoHeader = [
    {
      name: "Verification",
      selector: "verification",
    },
    {
      name: "Farmer Contract",
      selector: "contract",
    },
  ];
  console.debug(farmer);

  return (
    <LotShowPanel title="Certification: Current Status" icon="🗃" isOpen={true}>
      <Table keyField="id" columns={basicInfoHeader} noHeader={true} data={[basicInfoDummy]} />
    </LotShowPanel>
  );
}
