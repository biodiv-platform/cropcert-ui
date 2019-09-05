import { removeUser } from "@utils/user.util";
import { navigate } from "gatsby";
import React, { useEffect } from "react";

export default function SignOutPage() {
  useEffect(() => {
    removeUser();
    navigate("/");
  }, []);

  return <div>Signing out...</div>;
}
