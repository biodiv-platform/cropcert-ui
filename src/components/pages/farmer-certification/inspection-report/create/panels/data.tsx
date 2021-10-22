export const GI_PANEL = {
  title: "General Information",
  icon: "☑",
  keys: {
    chemicalsOnIntercrop: "Any application of chemicals on intercrop",
    chemicalsOnNonCoffeeField: "Chemical usage on non-coffee field",
    lastUsedChemicals: "Date of last use of chemicals on coffee field",
    cutivatationNotConductedWithin5mWaterSource:
      "Cultivation not conducted within 5m of water source",
    manure90DaysOrLossBeforeHarvest: "No application of manure 90 days or less before harvest",
    understandingOfOrganicFTStandards: "Farmers Understanding of Organic FT Standards",
    weedControlAdequate: "Weed Control Adequate",
    nonCoffeeTreesPlanted: "Non-Coffee Trees Planted",
    signsOfErosion: "Signs of Erosion",
    erosionControlAdequate: "Erosion Control Adequate",
    burningOfCropWaste: "Burning of crop waste",
    farmerHireLabour: "Does the farmer hire labour",
    isLabourFairlyTreated: "Is Labour Fairly Treated",
    isChildLabourImployed: "Child Labour",
    plasticDisposal: "Plastics Disposal",
    isOtherWasteDisposalAdequate: "Other waste disposal adequate",
    isHHMakingJointDecision: "HH-Making Joint decision",
    isHHTakingFarmingAsFamilyBusiness: "HH-taking farming as a Family Business",
    comments: "General comments",
  },
};

export const FARM_PANEL = {
  title: "Farm (all coffee plots)",
  icon: "🌄",
  keys: {
    id: "Farm ID",
    fieldName: "Field Name (similar on field map)",
    acres: "Acres",
    mainCrop: "Main crop",
    intercrops: "Intercrops",
    numberOfCoffeTrees: "Total No of coffee trees",
    yeildEstimate: "Yield estimate (kg) Coffee cherry",
    areaUnderCoffee: "Area under coffee (acre)",
    fieldSeparation: "Field separation",
    multipleOwnerWithOrganic:
      "In case of organic holding in field with multiple owners and no clear borders, all owners are organic.",
    isCoffeeTreeWellMaintained: "Coffee trees Well Maintained",
    pruining: "Pruning",
    numberOfPruinedCoffeeTrees: "Number of pruned coffee trees",
    stumping: "Stumping",
    numberOfStumpedTree: "Number of Stumped trees",
    plantingNewCoffeeSeedings: "Planting New Coffee Seedlings",
    lastUseOfNonAllowedChemicals: "Last use of non-allowed chemicals",
    interPlotBufferZones: "Inter-plot buffer Zones",
    summery: {
      numberOfCoffeeFields: "Total No Coffee Fields",
      areaUnderCoffee: "Total Area under coffee",
      productiveTrees: "Productive Trees",
      totalAreaOfFarm: "Total Area of Farm",
      knownToHarvestRipeCherries: "Farmers know to Harvest Ripe Cherries",
      practicesPostHarvestHandlling: "Farmer Practices Post Harvest Handling",
    },
  },
};

export const ANIMALS_PANEL = {
  title: "Animals",
  icon: "🐄",
  keys: {
    general: {
      hasLiveStock: "Farmer has Livestock",
      chemicalTreatmentOnLivestock: "Chemical Treatment on Livestock",
      livestockTreatmentConducted5mFromCoffee: "Livestock Treatment conducted 5m from coffee",
    },
    animals: {
      type: "Type of animal",
      number: "Number of animal",
      husbandryType: "Husbandry Type",
      medication: "Medication",
    },
  },
};

export const ADVICES_PANEL = {
  title: "Advices",
  icon: "💡",
  keys: {
    hasFarmerImplementedPreviousAdvice: "Has Farmer Implemented Previous Advice",
  },
};

export const CERT_PANEL = {
  title: "Certification Status",
  icon: "🗃",
  keys: {
    certificationStatus: "Certification Status",
    certificationVersion: "Certification Version",
  },
};
