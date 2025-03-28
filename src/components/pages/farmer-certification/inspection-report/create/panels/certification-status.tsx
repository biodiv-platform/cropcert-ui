import { Box } from "@chakra-ui/react";
import Table from "@components/@core/table";
import { RadioInputField } from "@components/form/radio";
import GridRow from "@components/pages/farmer-certification/row";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

import { CERT_STATUS_OPTIONS, CERT_VERSION_OPTIONS } from "../options";
import { CERT_PANEL } from "./data";

const basicInfoDummy = {
  verification: "01-01-1995",
  contract: "01-01-1995",
};

export default function CertificationStatus({ farmer }) {
  const basicInfoHeader = [
    {
      name: "Verification",
      selector: (row) => row["verification"],
    },
    {
      name: "Farmer Contract",
      selector: (row) => row["contract"],
    },
  ];
  console.debug(farmer);

  return (
    <LotShowPanel title={CERT_PANEL.title} icon={CERT_PANEL.icon} isOpen={true}>
      <Box mb={4}>
        <Table keyField="id" columns={basicInfoHeader} noHeader={true} data={[basicInfoDummy]} />
      </Box>

      <GridRow
        label={CERT_PANEL.keys.certificationStatus}
        previous={farmer?.inspection?.certificationStatus}
        field={RadioInputField}
        name="certificationStatus"
        options={CERT_STATUS_OPTIONS}
      />

      <GridRow
        mb={0}
        label={CERT_PANEL.keys.certificationVersion}
        previous={farmer?.inspection?.certificationVersion}
        field={RadioInputField}
        name="certificationVersion"
        options={CERT_VERSION_OPTIONS}
      />
    </LotShowPanel>
  );
}
