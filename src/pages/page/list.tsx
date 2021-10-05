import { RestrictedAccess } from "@components/@core/layout";
import { ROLES } from "@static/constants";
import dynamic from "next/dynamic";
import React from "react";

const PageList = () => {
  const LazyPageListComponent = dynamic(() => import("@components/pages/page/list"));

  return (
    <RestrictedAccess to={ROLES.ADMIN}>
      <LazyPageListComponent />
    </RestrictedAccess>
  );
};

export default PageList;
