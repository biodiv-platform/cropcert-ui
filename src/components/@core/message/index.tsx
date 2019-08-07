import { MESSAGE } from "@utils/constants";
import { Link } from "gatsby";
import React from "react";

import ErrorSVG from "./error-svg";
import SuccessSVG from "./success-svg";

export default function Message({
  success,
  message,
  backLink,
  backLinkTitle,
}: any) {
  return (
    <div className="eco--message-container">
      {success ? <SuccessSVG /> : <ErrorSVG />}
      <h2 className="mx-4">{success ? message : MESSAGE.ERROR}</h2>
      <Link to={backLink}>{backLinkTitle}</Link>
      &emsp;|&emsp;
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
}
