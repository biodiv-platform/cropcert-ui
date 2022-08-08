import useGlobalState from "@hooks/use-global-store";
import { LOT_FLAGS } from "@static/constants";
import { hasAccess, hierarchicalRoles } from "@utils/auth.util";
import { useEffect, useState } from "react";

const VARIANT_MAPPING = {
  ADD: "blue",
  EDIT: "orange",
  DONE: "green",
};

const WRITE_PERMISSIONS = {
  ADD: true,
  EDIT: true,
  DONE: false,
  NOTAPPLICABLE: false,
};

export default function useActionProps(lotStatus, role) {
  const { user } = useGlobalState();
  const [canWrite, setCanWrite] = useState(false);
  const [colorScheme, setcolorScheme] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setCanWrite(WRITE_PERMISSIONS[lotStatus] && hasAccess(hierarchicalRoles(role), user));
    setcolorScheme(VARIANT_MAPPING[lotStatus]);
    setShow(lotStatus !== LOT_FLAGS.NOTAPPLICABLE);
  }, [lotStatus, role]);

  return { canWrite, colorScheme, show };
}
