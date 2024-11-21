import { Accordion } from "@chakra-ui/react";
import React from "react";

import AmountPaidCalculateFilter from "./amount-paid-calculate";
import BatchStatusFilter from "./batch-status";
import CalculateGrnFilter from "./calculate-grn";
import CollectorNameFilter from "./collector-name";
import CollectorSubstrFilter from "./collector-substr";
import DeductionFilter from "./deduction";
import DeductionReasonFilter from "./deduction-reason";
import FarmerIdFilter from "./farmer-id";
import FarmerNameFilter from "./farmer-name";
import FarmerProduceIdFilter from "./farmer-produce-id";
import MillingChargeFilter from "./milling-charge";
import NetCollectionFilter from "./net-collection";
import NoOfBagsFilter from "./no-of-bags";
import PhoneNumberFilter from "./phone";
import PricePerKgFilter from "./price-per-kg";
import ProductTypeFilter from "./product-type";
import QuantityFilter from "./quantity";
import TimeFilter from "./time";

export default function FiltersList() {
  return (
    <Accordion allowMultiple={true}>
      <FarmerProduceIdFilter />
      <FarmerIdFilter />
      <FarmerNameFilter />
      <PhoneNumberFilter />
      <BatchStatusFilter />
      <ProductTypeFilter />
      <QuantityFilter />
      <NoOfBagsFilter />
      <DeductionFilter />
      <DeductionReasonFilter />
      <NetCollectionFilter />
      <PricePerKgFilter />
      <AmountPaidCalculateFilter />
      <MillingChargeFilter />
      <CalculateGrnFilter />
      <CollectorNameFilter />
      <CollectorSubstrFilter />
      <TimeFilter />
    </Accordion>
  );
}
