import SignatureInputField from "@components/@core/formik/signature";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

export default function Signature() {
  return (
    <LotShowPanel title="Signature" icon="✍️" isOpen={true}>
      <SignatureInputField
        name="farmer.path"
        label="Farmer Signature"
        declaration="I, The farmer, declare that this information is correct and that I have understood the conditions for organic production. I have also received a copy of the farmer’s organic contract and internal organic standard"
        mb={8}
        personName="John Doe"
      />
      <SignatureInputField
        name="fieldCoordinator.path"
        label="Field Coordinator Signature"
        declaration="I, the field coordinator, confirm that the above information is correct."
        mb={8}
        personName="John Doe"
      />
      <SignatureInputField
        name="icsManager.path"
        label="ICS Manager/Supervisor Signature"
        declaration="I, the ICS Manager/Supervisor confirm that the above information is correct"
        mb={8}
        personName="John Doe"
      />
      <SignatureInputField
        name="chairPerson.path"
        label="Chairperson Signature"
        declaration="Approved by Chairperson Certification committee "
        personName=""
      />
    </LotShowPanel>
  );
}
