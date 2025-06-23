import { Button, Group } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import useGlobalState from "@hooks/use-global-state";
import { Batch } from "@interfaces/traceability";
import { CC_COLOR_MAPPING, RESOURCE_TYPE, ROLES } from "@static/constants";
import { generateBackBtnStr, getCurrentTimestamp } from "@utils/basic";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { LuArrowLeft } from "react-icons/lu";

import { DownloadButtonWithTooltip } from "@/components/@core/action-buttons/DownloadButtonWithTooltip";
import { AccordionRoot } from "@/components/ui/accordion";
import { axGetDataInCSV } from "@/services/traceability.service";
import { hasAccess } from "@/utils/auth";
import { sendFileFromResponse } from "@/utils/download";
import notification, { NotificationType } from "@/utils/notification";

import BatchFarmerMember from "./batch-farmerMember";
import BatchFarmerProduce from "./batch-farmerProduce";
import BatchInfo from "./batch-info";

interface IBatchShowProps {
  batch: Batch;
  farmerProduceArr;
  farmerArr;
  farmerLocationArr;
}

export default function BatchShowPageComponent({ show }: { show: IBatchShowProps }) {
  const router = useRouter();
  const { user } = useGlobalState();
  const { t } = useTranslation();
  const { previousPath, setPreviousPath } = useGlobalState();
  const { backButtonText, backLink } = generateBackBtnStr(previousPath, "Back to Batch List");

  if (!previousPath) {
    setPreviousPath("/traceability/batch");
  }

  // Function to go back to the previous page
  const handleGoBack = () => {
    router.push(backLink);
  };

  const handleOnDownloadData = async () => {
    const response = await axGetDataInCSV("batch", [show.batch._id]);

    if (response.success) {
      sendFileFromResponse(response.data, `batch_${getCurrentTimestamp()}.csv`);
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
        🧺 {show.batch.batchName}
      </PageHeading>
      <AccordionRoot multiple lazyMount defaultValue={["activity", "Batch(s)"]} pb={4} spaceY="4">
        <BatchInfo batch={show.batch} geojsonData={geojsonData} />
        {show.farmerProduceArr && <BatchFarmerProduce rows={show.farmerProduceArr} />}
        {show.farmerArr && <BatchFarmerMember rows={show.farmerArr} />}
        <Activity resourceId={show.batch.id} resourceType={RESOURCE_TYPE.BATCH} />
      </AccordionRoot>
    </Container>
  );
}
