import { MESSAGE } from "@utils/constants";
import React from "react";

const FactoryReportError = ({ diff }) => (
  <>
    {diff !== 0 && (
      <div className="eco--divider mb-4" style={{ color: "#da1e28" }}>
        {`${MESSAGE.ERROR_FACTORY_REPORT} Total `}
        <strong>
          {diff > 0 ? "Over" : "Under"} by {Math.abs(diff)} KG(s)
        </strong>
      </div>
    )}
  </>
);

export default FactoryReportError;
