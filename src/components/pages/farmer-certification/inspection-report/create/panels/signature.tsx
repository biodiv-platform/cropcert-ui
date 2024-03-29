import { GeolocationInputField } from "@components/form/geolocation";
import { SignatureInputField } from "@components/form/signature";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

export default function Signature() {
  return (
    <LotShowPanel title="Signature" icon="✍️" isOpen={true}>
      <GeolocationInputField name="geoLocation" label="Geo Location" mb={8} />
      {/* <DropzoneInputField name="farmer.path" label="Farmer Photo" type="Farmer" mb={8} /> */}
      <SignatureInputField
        name="farmer.path"
        label="Farmer Signature"
        declaration="I, the Farmer, confirm that the above information is correct."
        mb={8}
        personName=""
      />
      <SignatureInputField
        name="fieldCoordinator.path"
        label="Inspector Signature"
        declaration="I, the Inspector, confirm that the above information is correct."
        mb={8}
        personName=""
      />
    </LotShowPanel>
  );
}
