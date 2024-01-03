import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import { Accordion, Box, Button, Tooltip } from "@chakra-ui/react";
import DeleteActionButton from "@components/@core/action-buttons/delete";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import useGlobalState from "@hooks/use-global-state";
import DeleteIcon from "@icons/delete";
import { axDeleteFarmerById } from "@services/farmer.service";
import { ROLES } from "@static/constants";
import { FARMER_DELETE, FARMER_EDIT } from "@static/events";
import { hasAccess, hierarchicalRoles } from "@utils/auth";
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
  farmer: any; //TODO: add farmer interface
}

export default function FarmerShowPageComponent({ show }: { show: IFarmerShowProps }) {
  const router = useRouter();
  const { user } = useGlobalState();

  const hasEditDeleteAccess = hasAccess(hierarchicalRoles(ROLES.UNION), user);

  // Function to go back to the previous page
  const goBack = () => {
    router.back();
  };

  const ActionButtons = ({ hasEditDeleteAccess }) => {
    return (
      <Box display={"flex"}>
        <Button
          onClick={goBack}
          leftIcon={<ArrowBackIcon />}
          variant="solid"
          rounded="md"
          colorScheme="gray"
        >
          Back to List
        </Button>
        <Tooltip label="Edit Farmer" hasArrow>
          <Box
            padding={2}
            rounded="full"
            _hover={{ bg: "yellow.200", cursor: "pointer" }}
            onClick={() =>
              emit(FARMER_EDIT, { farmer: show.farmer, hasAccess: hasEditDeleteAccess })
            }
          >
            <NextLink href={`/farmer/edit/${show.farmer._id}`} passHref={true}>
              <EditIcon boxSize={6} />
            </NextLink>
          </Box>
        </Tooltip>
        <Tooltip label="Delete Farmer" hasArrow>
          <Box
            paddingY={2}
            paddingX={3}
            color={"red.400"}
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
        >
          🧑‍🌾 {show.farmer.farmerName}
        </PageHeading>
        <Accordion defaultIndex={[0]} allowMultiple>
          <FarmerInfo farmer={show.farmer} hasEditDeleteAccess={hasEditDeleteAccess} />
          {show.farmerProduces && <FarmerProduce rows={show.farmerProduces} />}
          {show.batches && <FarmerBatches rows={show.batches} />}
          {show.lots && <FarmerLots rows={show.lots} />}
        </Accordion>
        <DeleteFarmerModal />
      </Container>
    )
  );
}
