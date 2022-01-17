const columnsRaw = {
  id: "Id",
  userName: "User Name",
  firstName: "First Name",
  lastName: "Last Name",
  dateOfBirth: "BirthDate",
  gender: "Gender",
  cellNumber: "Cell Number",
  email: "EMail",
  village: "Village",
  subCountry: "Sub Country",
  membershipId: "Membership Id",
  numCoffeePlots: "Coffee Plots",
  numCoffeeTrees: "Coffee Trees",
  farmArea: "Farm Area",
  coffeeArea: "Coffee Area",
  farmerCode: "Farmer Code",
  ccName: "Collection Center Name",
  coName: "Cooperative Name",
  unionName: "Union Name",
  fieldCoOrdinator: "Field Co-ordinator",
  version: "Version",
  subVersion: "Sub-version",
  inspectorName: "Inspector Name",
  inspection_id: "Inspection Id",
  inspection_inspectorId: "Inspector Id",
  inspection_date: "Last Inspection Date",
  inspection_verificationDate: "Inspection Verification Date",
  inspection_farmerContract: "Farmer Contract",
  inspection_lastUsedChemicals: "Last Used Chemicals",
  inspection_chemicalsOnIntercrop: "Chemicals on Intercrop",
  inspection_chemicalsOnNonCoffeeField: "Chemicals on Non-coffee Field",
  inspection_cutivatationNotConductedWithin5mWaterSource:
    "Cutivatation Not Conducted Within 5m Water Source",
  inspection_manure90DaysOrLossBeforeHarvest: "Manure 90 Days or Loss Before Harvest",
  inspection_understandingOfOrganicFTStandards: "Understanding of Organic FT Standards",
  inspection_weedControlAdequate: "Weed Control Adequate",
  inspection_nonCoffeeTreesPlanted: "Non-Coffee Trees Planted",
  inspection_signsOfErosion: "Signs of Erosion",
  inspection_erosionControlAdequate: "Erosion Control Adequate",
  inspection_burningOfCropWaste: "Burning of Crop Waste",
  inspection_farmerHireLabour: "Farmer Hire Labour",
  inspection_isLabourFairlyTreated: "Labour Fairly Treated",
  inspection_isChildLabourImployed: "Child Labour Employed",
  inspection_plasticDisposal: "Plastic Disposal",
  inspection_isOtherWasteDisposalAdequate: "Other Waste Disposal Adequate",
  inspection_isHHMakingJointDecision: "HH Making Joint Decision",
  inspection_isHHTakingFarmingAsFamilyBusiness: "HH Taking Farming as Family Business",
  inspection_comments: "Inspection Comments",
  inspection_farms: "Farms",
  inspection_numberOfCoffeeFields: "Number of Coffee Fields",
  inspection_areaUnderCoffee: "Area Under Coffee",
  inspection_productiveTrees: "Productive Trees",
  inspection_totalAreaOfFarm: "Total Area of Farm",
  inspection_knownToHarvestRipeCherries: "Known to Harvest Ripe Cherries",
  inspection_practicesPostHarvestHandlling: "Practices Post-Harvest Handlling",
  inspection_hasLiveStock: "Has LiveStock",
  inspection_chemicalTreatmentOnLivestock: "Chemical Treatment on Livestock",
  inspection_livestockTreatmentConducted5mFromCoffee:
    "Livestock Treatment Conducted 5m from Coffee",
  inspection_animals: "Animals",
  inspection_hasFarmerImplementedPreviousAdvice: "Has Farmer Implemented Previous Advice",
  inspection_advices: "Advices",
  inspection_madeSeriousViolation: "Made Serious Violation",
  inspection_violationDate: "Violation Date",
  inspection_isRecommendedOrganicCertificatation: "Recommended Organic Certificatation",
  inspection_boardAGMMinutesKept: "Board AGM Minutes Kept",
  inspection_membershipListsAndSharesUpdated: "Membership Lists and Shares Updated",
  inspection_isAnnualBudgetAndAuditedAccounts: "Annual Budget and Audited Accounts",
  inspection_isFairTradePremiumBudgetAndWorkplan: "Fair Trade Premium Budget and Workplan",
  inspection_isEnvirnmentCommitteAndItsWorkplan: "Envirnment Committe and its Workplan",
  inspection_isFTContractPersonAppointed: "FTContract Person Appointed",
  inspection_certificationStatus: "Certification Status",
  inspection_certificationVersion: "Certification Version",
  inspection_geoLocation: "Geo Location",
};

export const columns = Object.entries(columnsRaw).map(([key, name]) => ({
  name,
  selector: (row) => row[key],
  label: name,
  value: key,
}));
