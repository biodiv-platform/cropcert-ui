import { Accordion } from "@chakra-ui/core";
import Table from "@components/@core/table";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

const basicInfoDummy = {
  verification: "✔️",
  contract: "✔️",
};

export default function CertificationStatus() {
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

  return (
    <LotShowPanel title="Certification: Current Status" icon="🗃" isOpen={true}>
      <Table keyField="id" columns={basicInfoHeader} noHeader={true} data={[basicInfoDummy]} />
    </LotShowPanel>
  );
}
