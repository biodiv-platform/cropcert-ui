import React from "react";

import { AccordionRoot } from "@/components/ui/accordion";

import AggroforestryFilter from "./aggroforestry";
import CoffeeAcerageFilter from "./coffee-acerage";
import DateOfBirthFilter from "./dob";
import EducationFilter from "./education";
import EnumeratorFilter from "./enumerator";
import OtherEnterpriesFilter from "./farm-enterprises";
import FarmerDataValidatedFilter from "./farmer-data-validated";
import FarmerIdFilter from "./farmer-id";
import FarmerNameFilter from "./farmer-name";
import LandAcerageFilter from "./land-acerage";
import LocationVerifiedFilter from "./location-verified";
import NationalIdentityNumberFilter from "./national-identity";
import NoOfCoffeeTreesFilter from "./no-of-coffee-trees";
import NoOfDependentsFilter from "./no-of-dependents";
import NoOfFarmPlotsFilter from "./no-of-farm-plots";
import PhoneNumberFilter from "./phone";
import SexTypeFilter from "./sex-type";
import TimeFilter from "./time";
import VillageFilter from "./village";
import YearOfFirstPlantingFilter from "./year-of-first-planting";

export default function FiltersList() {
  return (
    <AccordionRoot multiple={true} lazyMount>
      <FarmerIdFilter />
      <FarmerNameFilter />
      <SexTypeFilter />
      <DateOfBirthFilter />
      <PhoneNumberFilter />
      <NationalIdentityNumberFilter />
      <EducationFilter />
      <VillageFilter />
      <LandAcerageFilter />
      <CoffeeAcerageFilter />
      <NoOfCoffeeTreesFilter />
      <NoOfDependentsFilter />
      <YearOfFirstPlantingFilter />
      <NoOfFarmPlotsFilter />
      <OtherEnterpriesFilter />
      <AggroforestryFilter />
      <EnumeratorFilter />
      <LocationVerifiedFilter />
      <FarmerDataValidatedFilter />
      <TimeFilter />
    </AccordionRoot>
  );
}
