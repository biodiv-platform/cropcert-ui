import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import useGlobalState from "@hooks/use-global-state";
import DeleteIcon from "@icons/delete";
import { FarmerMember } from "@interfaces/traceability";
import { RESOURCE_TYPE, ROLES } from "@static/constants";
import { FARMER_DELETE, FARMER_EDIT } from "@static/events";
import { hasAccess, hierarchicalRoles } from "@utils/auth";
import { generateBackBtnStr } from "@utils/basic";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { emit } from "react-gbus";
import { LuArrowLeft } from "react-icons/lu";

import Tooltip from "@/components/@core/tooltip";
import { AccordionRoot } from "@/components/ui/accordion";
import EditIcon from "@/icons/edit";

import FarmerBatches from "./farmer-batches";
import FarmerInfo from "./farmer-info";
import FarmerLots from "./farmer-lots";
import FarmerProduce from "./farmer-produce";
import DeleteFarmerModal from "./modals/delete-farmer";
interface IFarmerShowProps {
  lots: any[];
  batches: any[];
  farmerProduces: any[];
  farmer: FarmerMember;
  activityArr?: any[];
}

export default function FarmerShowPageComponent({ show }: { show: IFarmerShowProps }) {
  const router = useRouter();
  const { user, previousPath, setPreviousPath } = useGlobalState();
  const { backButtonText, backLink } = generateBackBtnStr(previousPath, "Back to Farmer List");

  if (!previousPath) {
    setPreviousPath("/farmer/list");
  }

  const hasEditDeleteAccess = hasAccess(hierarchicalRoles(ROLES.UNION), user);

  // Function to go back to the previous page
  const handleGoBack = () => {
    router.push(backLink);
  };

  const ActionButtons = ({ hasEditDeleteAccess }) => {
    return (
      <Box display={"flex"}>
        <Button onClick={handleGoBack} variant="subtle" rounded="md" colorPalette="gray">
          {<LuArrowLeft />}
          {backButtonText}
        </Button>
        <Tooltip content="Edit Farmer" showArrow>
          <Box
            paddingY={2}
            paddingX={3}
            rounded="full"
            _hover={{ color: "yellow.500", bg: "yellow.50", cursor: "pointer" }}
            onClick={() =>
              emit(FARMER_EDIT, { farmer: show.farmer, hasAccess: hasEditDeleteAccess })
            }
          >
            <Link href={`/farmer/edit/${show?.farmer?._id}`} passHref={true} legacyBehavior>
              <EditIcon />
            </Link>
          </Box>
        </Tooltip>
        <Tooltip content="Delete Farmer" showArrow>
          <Box
            paddingY={2}
            paddingX={3}
            rounded="full"
            _hover={{ color: "red.500", bg: "red.50", cursor: "pointer" }}
            onClick={() =>
              emit(FARMER_DELETE, { farmerId: show.farmer._id, hasAccess: hasEditDeleteAccess })
            }
          >
            <DeleteIcon />
          </Box>
        </Tooltip>
      </Box>
    );
  };

  return show?.farmer ? (
    <Container>
      <PageHeading
        actions={hasEditDeleteAccess && <ActionButtons hasEditDeleteAccess={hasEditDeleteAccess} />}
        floatHeader={true}
      >
        🧑‍🌾 {show.farmer.farmerName}
      </PageHeading>
      <AccordionRoot multiple defaultValue={["Information", "activity"]} spaceY="4" pb={4}>
        <FarmerInfo farmer={show.farmer} />
        {show.farmerProduces && <FarmerProduce rows={show.farmerProduces} />}
        {show.batches && <FarmerBatches rows={show.batches} />}
        {show.lots && <FarmerLots rows={show.lots} />}
        <Activity resourceId={show.farmer.id} resourceType={RESOURCE_TYPE.FARMER} />
      </AccordionRoot>
      <DeleteFarmerModal />
    </Container>
  ) : (
    <Flex justifyContent={"center"} alignItems={"center"} pt={20}>
      <Text fontSize="lg">
        The farmer you are trying to access has been deleted or does not exist.
      </Text>
    </Flex>
  );
}
