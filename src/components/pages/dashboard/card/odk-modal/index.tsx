import { WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stat,
  StatHelpText,
  useDisclosure,
} from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import { axGetOdkProjectListBysUserIdForAppUser, axIsOdkWebUser } from "@services/odk.service";
import { ENDPOINT } from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import AppUserQrModal from "./qr-modal";

function SeeQrModal({ index, item, user }) {
  const { t } = useTranslation();

  const { isOpen: isQrOpen, onOpen: onQrOpen, onClose: onQrClose } = useDisclosure();

  return (
    <tr key={index}>
      <td>
        <Box userSelect="all" fontSize="sm" className="elipsis">
          {item.name}
        </Box>
      </td>
      <td>
        <Button variant="link" onClick={onQrOpen} leftIcon={<WarningIcon />}>
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

export default function OdkModal({ isOpen, onClose, odkLink }) {
  const { t } = useTranslation();

  const { user } = useGlobalState();

  const [isOdkWebUser, setIsOdkWebUser] = useState<any>();
  const [userAppProjectList, setUserAppProjectList] = useState([]);

  useEffect(() => {
    axGetOdkProjectListBysUserIdForAppUser(user.id).then(setUserAppProjectList);
    axIsOdkWebUser(user.id).then(({ data }) => setIsOdkWebUser(data));
  }, [user]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isOdkWebUser && (
              <Heading size="sm" mb={3}>
                {t("common:actions.odk.odkWebuser")}
                <Stat>
                  <StatHelpText fontSize="md" mb={0}>
                    <Link href={`${odkLink}#/login`}>{t("common:actions.odk.title")} &rarr;</Link>
                  </StatHelpText>
                </Stat>
              </Heading>
            )}

            <hr></hr>
            {userAppProjectList?.length > 0 && (
              <>
                <p style={{ minWidth: "550px", marginTop: "10px" }}>
                  <b>{t("common:actions.odk.odkAppuser")}</b>
                </p>
                <p>{t("common:actions.odk.qrCodeHelpText")}</p>

                <table
                  style={{ minWidth: "550px", marginTop: "10px" }}
                  className="table table-bordered"
                >
                  <thead>
                    <tr>
                      <th align="left">{t("common:action.project_title")}</th>
                      <th align="left">{t("common:actions.odk.qrCode")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userAppProjectList?.map((item, index) => (
                      <SeeQrModal item={item} index={index} user={user} />
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
