import { Map32 } from "@carbon/icons-react";
import { axGetCCById } from "@services/cc.service";
import React, { useEffect, useState } from "react";
import FarmerListTable from "@components/farmer/list";

const CCShow = ({ ccId }) => {
  const [cc, setCC] = useState({ success: false, data: {} as any });

  useEffect(() => {
    axGetCCById(ccId).then(data => setCC(data));
  }, []);

  return cc.success ? (
    <>
      <h1>
        <a
          style={{ float: "right" }}
          target="_blank"
          href={`https://maps.google.com/?q=${cc.data.latitude},${
            cc.data.longitude
          }`}
        >
          <Map32 />
        </a>
        #{cc.data.ccCode}. {cc.data.ccName} ({cc.data.village})
      </h1>
      <FarmerListTable ccId={ccId} />
    </>
  ) : (
    <></>
  );
};

export default CCShow;
