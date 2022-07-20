import { SignatureInputField } from "@components/form/signature";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

export default function ICSSignature() {
  return (
    <LotShowPanel title="Signature" icon="✍️" isOpen={true}>
      <SignatureInputField
        name="ics.path"
        label="ICS Manager Signature"
        declaration="I, The ICS Manager, declare that this information is correct and that I have understood the conditions for organic production. I have also received a copy of the farmer’s organic contract and internal organic standard"
        mb={8}
        personName=""
      />
    </LotShowPanel>
  );
}
