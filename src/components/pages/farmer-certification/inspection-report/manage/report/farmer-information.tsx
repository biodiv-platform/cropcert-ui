import Table from "@components/@core/table";
import LotShowPanel from "@components/pages/lot/show/panel";
import { axGetFarmerInfoByFarmerId } from "@services/certification.service";
import React, { useEffect, useState } from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";

const farmerMeta = [
  {
    name: "#",
    selector: (row) => row["farmerCode"],
  },
  {
    name: "Name",
    selector: (row) => row["name"],
  },
  {
    name: "Union",
    selector: (row) => row["unionName"],
  },
  {
    name: "Cooperative",
    selector: (row) => row["coName"],
  },
  {
    name: "Collection Center",
    selector: (row) => row["ccName"],
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
