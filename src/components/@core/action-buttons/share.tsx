import ShareIcon from "@icons/share"; // Import the created icon
import React from "react";
import { RWebShare } from "react-web-share";

import SimpleActionButton from "./simple";

export default function ShareActionButton({ text, title }) {
  return (
    <RWebShare data={{ text, title }}>
      <SimpleActionButton icon={<ShareIcon />} title={title} colorPalette="orange" />
    </RWebShare>
  );
}
