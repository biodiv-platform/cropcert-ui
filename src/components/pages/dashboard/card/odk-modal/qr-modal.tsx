import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

export default function AppUserQrModal({ qrUrl, projectName, isQrOpen, onQrClose }) {
  return (
    <>
      <Modal size="md" isOpen={isQrOpen} onClose={onQrClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`${projectName} QR Code for ODK Collect app`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="center">
              <Box mb={6}>
                <Image h="250px" src={qrUrl} alt="" />
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onQrClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
