import { AccordionRoot, Button, Group } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import useGlobalState from "@hooks/use-global-state";
import { Cupping, Lot, QualityReport } from "@interfaces/traceability";
import { CC_COLOR_MAPPING, RESOURCE_TYPE, ROLES } from "@static/constants";
import { generateBackBtnStr, getCurrentTimestamp } from "@utils/basic";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { LuArrowLeft } from "react-icons/lu";

import { DownloadButtonWithTooltip } from "@/components/@core/action-buttons/DownloadButtonWithTooltip";
import { axGetDataInCSV } from "@/services/traceability.service";
import { hasAccess } from "@/utils/auth";
import { sendFileFromResponse } from "@/utils/download";
import notification, { NotificationType } from "@/utils/notification";

import LotBatches from "./lot-batches";
import LotFarmerMember from "./lot-farmerMember";
import LotFarmerProduce from "./lot-farmerProduce";
import LotInfo from "./lot-info";

interface ILotShowProps {
  lot: Lot;
  cupping_report: Cupping[];
  quality_report: QualityReport[];
  users: any[];
  batches: any[];
  farmerProduceArr: any[];
  farmerLocationArr: any[];
  farmerArr: any[];
}

export default function LotShowPageComponent({ show }: { show: ILotShowProps }) {
  const router = useRouter();
  const { user } = useGlobalState();
  const { t } = useTranslation();
  const { previousPath, setPreviousPath } = useGlobalState();
  const { backButtonText, backLink } = generateBackBtnStr(previousPath, "Back to Lot List");

  if (!previousPath) {
    setPreviousPath("/traceability/lot");
  }

  // Function to go back to the previous page
  const handleGoBack = () => {
    router.push(backLink);
  };

  const handleOnDownloadData = async () => {
    const response = await axGetDataInCSV("lot", [show.lot._id]);
    if (response.success) {
      sendFileFromResponse(response.data, `lot_${getCurrentTimestamp()}.csv`);
    } else {
      notification(t("traceability:download.download_error"), NotificationType.Error);
    }
  };

  const ActionButtons = () => {
    return (
      <Group gap={4}>
        <Button onClick={handleGoBack} variant="subtle" rounded="md">
          <LuArrowLeft />
          {backButtonText}
        </Button>
        <DownloadButtonWithTooltip
          disabled={!hasAccess([ROLES.ADMIN, ROLES.UNION, ROLES.COOPERATIVE], user)}
          onClick={handleOnDownloadData}
        />
      </Group>
    );
  };

  const geojsonData = show.farmerLocationArr?.map((loc) => ({
    ...loc,
    properties: {
      ...loc.properties,
      color: CC_COLOR_MAPPING[loc.properties.cc],
    },
  }));

  return (
    <Container>
      <PageHeading actions={<ActionButtons />} floatHeader={true}>
        📦 {show.lot.lotName}
      </PageHeading>
      <AccordionRoot defaultValue={["Information", "activity"]} multiple pb={4} spaceY="4">
        <LotInfo lot={show.lot} geojsonData={geojsonData} />
        {show.batches && <LotBatches rows={show.batches} />}
        {show.farmerProduceArr && <LotFarmerProduce rows={show.farmerProduceArr} />}
        {show.farmerArr && <LotFarmerMember rows={show.farmerArr} />}
        <Activity resourceId={show.lot.id} resourceType={RESOURCE_TYPE.LOT} />
      </AccordionRoot>
    </Container>
  );
}
