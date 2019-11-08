import "@styles/theme.scss";
// tslint:disable-next-line: ordered-imports
import "@styles/index.scss";

import { hasAccess } from "@utils/auth.util";
import { BACKGROUND } from "@utils/constants";
import React, { useEffect, useState } from "react";

import Navbar from "../navmenu";
import Loading from "./loading";
import Unauthorized from "./unauthorized";

interface IProps {
  children;
  roles?: string[];
  background?: string;
}

const Container = ({
  children,
  roles,
  background = BACKGROUND.WHITE,
}: IProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Navbar />
      {hasAccess(roles) ? (
        <div style={{ background, minHeight: "calc(100vh - 48px)" }}>
          <div className="bx--grid eco--grid pt-2">{children}</div>
        </div>
      ) : loading ? (
        <Loading />
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default Container;
