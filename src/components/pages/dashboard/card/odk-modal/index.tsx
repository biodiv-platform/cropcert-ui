import { Box, Button, Heading, Link, useDisclosure } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import { axGetOdkProjectListBysUserIdForAppUser, axIsOdkWebUser } from "@services/odk.service";
import { ENDPOINT } from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { LuCircleAlert } from "react-icons/lu";

import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogRoot,
} from "@/components/ui/dialog";
import { StatHelpText, StatRoot } from "@/components/ui/stat";

import AppUserQrModal from "./qr-modal";

function SeeQrModal({ index, item, user }) {
  const { t } = useTranslation();

  const { open: isQrOpen, onOpen: onQrOpen, onClose: onQrClose } = useDisclosure();

  return (
    <tr key={index}>
      <td>
        <Box userSelect="all" fontSize="sm" className="elipsis">
          {item.name}
        </Box>
      </td>
      <td>
        <Button onClick={onQrOpen} variant={"plain"}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="20px"
            h="20px"
            borderRadius="full"
            bg="gray.500"
            color="white"
          >
            <LuCircleAlert />
          </Box>
          {t("common:action.see_code")}
        </Button>
      </td>
      <AppUserQrModal
        key={index}
        projectName={item.name}
        qrUrl={`${ENDPOINT.ODK}/app-user/qr-code/${user.userName}-suser${user.id}/${item.id}`}
        isQrOpen={isQrOpen}
        onQrClose={onQrClose}
      />
    </tr>
  );
}

export default function OdkModal({ open, onClose, odkLink }) {
  const { t } = useTranslation();
  const { user } = useGlobalState();
  const [isOdkWebUser, setIsOdkWebUser] = useState<any>();
  const [userAppProjectList, setUserAppProjectList] = useState([]);

  useEffect(() => {
    if (open) {
      axGetOdkProjectListBysUserIdForAppUser(user.id).then(setUserAppProjectList);
      axIsOdkWebUser(user.id).then(({ data }) => setIsOdkWebUser(data));
    }
  }, [user, open]);

  return (
    <Box>
      <DialogRoot open={open} onOpenChange={onClose}>
        <DialogBackdrop />
        <DialogContent>
          <DialogCloseTrigger />
          <DialogBody pt={4}>
            {isOdkWebUser && (
              <Heading size="md" mb={3}>
                {t("common:actions.odk.odkWebuser")}
                <StatRoot>
                  <StatHelpText fontSize="md" mb={0}>
                    <Link href={`${odkLink}#/login`}>{t("common:actions.odk.title")} &rarr;</Link>
                  </StatHelpText>
                </StatRoot>
              </Heading>
            )}

            <hr></hr>
            {userAppProjectList?.length > 0 && (
              <>
                <p style={{ minWidth: "550px", marginTop: "10px" }}>
                  <Heading size="md">{t("common:actions.odk.odkAppuser")}</Heading>
                </p>
                <p>{t("common:actions.odk.qrCodeHelpText")}</p>

                <table
                  style={{ minWidth: "650px", marginTop: "10px" }}
                  className="table table-bordered"
                >
                  <thead>
                    <tr>
                      <th align="left">
                        <Heading size="md"> {t("common:action.project_title")}</Heading>
                      </th>
                      <th align="left">
                        <Heading size="md">{t("common:actions.odk.qrCode")}</Heading>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userAppProjectList?.map((item, index) => (
                      <SeeQrModal key={index} item={item} index={index} user={user} />
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </DialogBody>

          <DialogFooter>
            <Button colorPalette="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
