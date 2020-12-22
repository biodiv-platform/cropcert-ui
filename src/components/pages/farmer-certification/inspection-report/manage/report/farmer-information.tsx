import Table from "@components/@core/table";
import LotShowPanel from "@components/pages/lot/show/panel";
import { axGetFarmerInfoByFarmerId } from "@services/certification.service";
import React, { useEffect, useState } from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";

const farmerMeta = [
  {
    name: "#",
    selector: "id",
  },
  {
    name: "Name",
    selector: "firstName",
  },
  {
    name: "Union",
    selector: "unionName",
  },
  {
    name: "Cooperative",
    selector: "coName",
  },
  {
    name: "Collection Center",
    selector: "ccName",
  },
];

export default function FarmerInformation({ farmerId }) {
  const [farmer, setFarmer] = useState<any>();

  useEffect(() => {
    axGetFarmerInfoByFarmerId(farmerId)
      .then(({ success, data }) => success && setFarmer(data))
      .catch(console.error);
  }, [farmerId]);

  return (
    <LotShowPanel title="Farmer Information" icon="ℹ️" isOpen={true}>
      {farmer ? <Table data={[farmer]} columns={farmerMeta} /> : <SkeletonLoader height="104px" />}
    </LotShowPanel>
  );
}
