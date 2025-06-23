import { AccordionRoot, Button, Group } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import useGlobalState from "@hooks/use-global-state";
import { FarmerMember, FarmerProduce } from "@interfaces/traceability";
import { RESOURCE_TYPE, ROLES } from "@static/constants";
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

import FarmerProduceInfo from "./farmer-produce-info";
import GrnReceiptInfo from "./grn-receip";

interface IFarmerProduceShowProps {
  farmerProduces: FarmerProduce;
  farmer: FarmerMember;
}

export default function FarmerProduceShowPageComponent({
  show,
}: {
  show: IFarmerProduceShowProps;
}) {
  const router = useRouter();
  const { user } = useGlobalState();
  const { t } = useTranslation();
  const { previousPath, setPreviousPath } = useGlobalState();
  const { backButtonText, backLink } = generateBackBtnStr(previousPath, "Back to Produce List");

  if (!previousPath) {
    setPreviousPath("/traceability/farmer-produce");
  }

  // Function to go back to the previous page
  const handleGoBack = () => {
    router.push(backLink);
  };

  const handleOnDownloadData = async () => {
    const response = await axGetDataInCSV("produce", [show.farmerProduces._id]);
    if (response.success) {
      sendFileFromResponse(response.data, `produce_${getCurrentTimestamp()}.csv`);
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

  return (
    show?.farmer && (
      <Container>
        <PageHeading actions={<ActionButtons />} floatHeader={true}>
          🧑‍🌾 {show.farmerProduces.farmerName}
        </PageHeading>
        <AccordionRoot
          spaceY="4"
          defaultValue={["Produce Information", "activity"]}
          multiple
          pb={4}
        >
          <FarmerProduceInfo farmerProduces={show.farmerProduces} />
          {show?.farmerProduces?.grnReceipt && (
            <GrnReceiptInfo farmerProduces={show.farmerProduces} />
          )}
          <Activity
            resourceId={show.farmerProduces.id}
            resourceType={RESOURCE_TYPE.FARMER_PRODUCE}
          />
        </AccordionRoot>
      </Container>
    )
  );
}
