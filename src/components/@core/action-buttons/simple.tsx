import { IconButton } from "@chakra-ui/react";
import Tooltip from "@components/@core/tooltip";
import React from "react";

interface SimpleActionButtonProps {
  icon;
  title;
  onClick?;
  colorScheme?;
}

const SimpleActionButton = ({ icon, title, onClick, colorScheme }: SimpleActionButtonProps) => (
  //position bottom needs to be added
  <Tooltip title={title}>
    <IconButton
      size="lg"
      rounded={"full"}
      variant="ghost"
      bgColor={colorScheme || "blue"}
      aria-label={title}
      onClick={onClick}
    >
      {icon}
    </IconButton>
  </Tooltip>
);

export default SimpleActionButton;
