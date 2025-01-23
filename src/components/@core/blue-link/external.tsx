import { LinkProps } from "@chakra-ui/react";
import React, { forwardRef } from "react";

import BlueLink from ".";

// check external link
const ExternalBlueLink = forwardRef((props: LinkProps, ref) => (
  <BlueLink {...props} wordBreak="break-word" ref={ref}>
    {props?.children || (props.href && decodeURIComponent(props.href))}
  </BlueLink>
));

export default ExternalBlueLink;
