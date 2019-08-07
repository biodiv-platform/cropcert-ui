import { axSignOut } from "@services/auth.service";
import { ENDPOINT } from "@utils/constants";
import { removeUser } from "@utils/user.util";
import React, { useEffect } from "react";

export default function SignOutPage() {
  useEffect(() => {
    axSignOut().finally(() => {
      removeUser();
      window.location.assign(ENDPOINT.ROOT);
    });
  }, []);

  return <div>Signing out...</div>;
}
