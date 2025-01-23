import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React from "react";

import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";

export default function AppUserQrModal({ qrUrl, projectName, isQrOpen, onQrClose }) {
  return (
    <>
      <DialogRoot size="md" open={isQrOpen} onOpenChange={onQrClose}>
        <DialogBackdrop />
        <DialogContent>
          <DialogHeader>{`${projectName} QR Code for ODK Collect app`}</DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            <Flex justifyContent="center">
              <Box mb={6}>
                <Image h="250px" src={qrUrl} alt="" />
              </Box>
            </Flex>
          </DialogBody>

          <DialogFooter>
            <Button colorPalette="blue" mr={3} onClick={onQrClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
}
