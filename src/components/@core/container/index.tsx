import "@styles/theme.scss";
// tslint:disable-next-line: ordered-imports
import "@styles/index.scss";

import { hasAccess } from "@utils/auth.util";
import { BACKGROUND } from "@utils/constants";
import React from "react";

import Navbar from "../navmenu";

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
  return hasAccess(roles) ? (
    <>
      <Navbar />
      <div style={{ background, minHeight: "calc(100vh - 48px)" }}>
        <div className="bx--grid eco--grid pt-2">{children}</div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Container;
