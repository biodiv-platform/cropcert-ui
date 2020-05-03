import { RestrictedAccess } from "@components/@core/layout";
import { ROLES } from "@static/constants";
import React from "react";
import dynamic from "next/dynamic";

const PageList = () => {
  const LazyPageListComponent = dynamic(() => import("@components/pages/page/list"));

  return (
    <RestrictedAccess to={ROLES.ADMIN}>
      <LazyPageListComponent />
    </RestrictedAccess>
  );
};

export default PageList;
