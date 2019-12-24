import { LOT_FLAGS } from "@static/constants";
import { hasAccess, hierarchicalRoles } from "@utils/auth.util";
import { useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";

const VARIANT_MAPPING = {
  ADD: "blue",
  EDIT: "orange",
  DONE: "green"
};

const WRITE_PERMISSIONS = {
  ADD: true,
  EDIT: true,
  DONE: false,
  NOTAPPLICABLE: false
};

export default function useActionProps(lotStatus, role) {
  const user = useStoreState(state => state.user);
  const [canWrite, setCanWrite] = useState(false);
  const [variantColor, setVariantColor] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setCanWrite(WRITE_PERMISSIONS[lotStatus] && hasAccess(hierarchicalRoles(role), user));
    setVariantColor(VARIANT_MAPPING[lotStatus]);
    setShow(lotStatus !== LOT_FLAGS.NOTAPPLICABLE);
  }, [lotStatus, role]);

  return { canWrite, variantColor, show };
}
