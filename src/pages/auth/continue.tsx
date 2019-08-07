import { axGetUser, axPingAll } from "@services/auth.service";
import { ENDPOINT } from "@utils/constants";
import { setUser } from "@utils/user.util";
import React, { useEffect } from "react";

function ContinuePage() {
  useEffect(() => {
    axPingAll().finally(() => {
      axGetUser().then(user => {
        setUser(user);
        window.location.assign(ENDPOINT.ROOT + "dashboard");
      });
    });
  }, []);

  return <>Loading...</>;
}

export default ContinuePage;
