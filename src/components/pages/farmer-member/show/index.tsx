import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import { Accordion, Box, Button, Tooltip } from "@chakra-ui/react";
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
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { emit } from "react-gbus";

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
  const { user, previousPath } = useGlobalState();
  const { backButtonText, backLink } = generateBackBtnStr(previousPath);

  const hasEditDeleteAccess = hasAccess(hierarchicalRoles(ROLES.UNION), user);

  // Function to go back to the previous page
  const handleGoBack = () => {
    if (previousPath.includes("/traceability")) {
      router.push(backLink);
    } else {
      router.back();
      setTimeout(() => window.location.reload(), 300); // workaround to reload pages which are not reloading due to filter query param in url.
    }
  };

  const ActionButtons = ({ hasEditDeleteAccess }) => {
    return (
      <Box display={"flex"}>
        <Button
          onClick={handleGoBack}
          leftIcon={<ArrowBackIcon />}
          variant="solid"
          rounded="md"
          colorScheme="gray"
        >
          {backButtonText}
        </Button>
        <Tooltip label="Edit Farmer" hasArrow>
          <Box
            paddingY={2}
            paddingX={3}
            rounded="full"
            color={"green.500"}
            _hover={{ bg: "green.50", cursor: "pointer" }}
            onClick={() =>
              emit(FARMER_EDIT, { farmer: show.farmer, hasAccess: hasEditDeleteAccess })
            }
          >
            <NextLink href={`/farmer/edit/${show?.farmer?._id}`} passHref={true}>
              <EditIcon boxSize={5} />
            </NextLink>
          </Box>
        </Tooltip>
        <Tooltip label="Delete Farmer" hasArrow>
          <Box
            paddingY={2}
            paddingX={3}
            color={"red.500"}
            rounded="full"
            _hover={{ bg: "red.50", cursor: "pointer" }}
            onClick={() =>
              emit(FARMER_DELETE, { farmerId: show.farmer._id, hasAccess: hasEditDeleteAccess })
            }
          >
            <DeleteIcon boxSize={5} />
          </Box>
        </Tooltip>
      </Box>
    );
  };

  return (
    show?.farmer && (
      <Container>
        <PageHeading
          actions={
            hasEditDeleteAccess && <ActionButtons hasEditDeleteAccess={hasEditDeleteAccess} />
          }
          floatHeader={true}
        >
          🧑‍🌾 {show.farmer.farmerName}
        </PageHeading>
        <Accordion defaultIndex={[0]} allowMultiple>
          <FarmerInfo farmer={show.farmer} />
          {show.farmerProduces && <FarmerProduce rows={show.farmerProduces} />}
          {show.batches && <FarmerBatches rows={show.batches} />}
          {show.lots && <FarmerLots rows={show.lots} />}
          <Activity resourceId={show.farmer.id} resourceType={RESOURCE_TYPE.FARMER} />
        </Accordion>
        <DeleteFarmerModal />
      </Container>
    )
  );
}
