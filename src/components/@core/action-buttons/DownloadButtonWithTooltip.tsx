import useTranslation from "next-translate/useTranslation";
import React from "react";
import { LuDownload } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

type DownloadButtonWithTooltipProps = {
  disabled?: boolean;
  onClick?: () => void;
};

export const DownloadButtonWithTooltip: React.FC<DownloadButtonWithTooltipProps> = ({
  disabled,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <Tooltip content={t("traceability:download.download_data")}>
      <Button variant="surface" disabled={disabled} onClick={onClick}>
        <LuDownload />
      </Button>
    </Tooltip>
  );
};
