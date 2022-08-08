export const CuppingReportExpand = [
  {
    title: "Qualities",
    items: [
      { name: "Fragrance Aroma", key: "fragranceAroma" },
      { name: "Flavour", key: "flavour" },
      { name: "Acidity", key: "acidity" },
      { name: "Body", key: "body" },
      { name: "After Taste", key: "afterTaste" },
      { name: "Balance", key: "balance" },
      { name: "Sweetness", key: "sweetness" },
      { name: "Uniformity", key: "uniformity" },
      { name: "Clean Cup", key: "cleanCup" },
      { name: "Overall", key: "overAll" },
    ],
  },
  {
    title: "Problems",
    items: [
      { name: "Taint", key: "taint" },
      { name: "Fault", key: "fault" },
    ],
  },
];

export const GreenReportExpand = [
  {
    title: "More Info",
    items: [
      { name: "OutTurn Percentage", key: "percentageOutTurn" },
      { name: "OverTurn Percentage", key: "overTurnPercentage" },
      { name: "Moisture Content", key: "mc" },
    ],
  },
  {
    title: "Quality Grading",
    items: [
      { name: "AA", key: "gradeAA" },
      { name: "A", key: "gradeA" },
      { name: "B", key: "gradeB" },
      { name: "AB", key: "gradeAB" },
      { name: "C", key: "gradeC" },
      { name: "PB", key: "gradePB" },
      { name: "Triage", key: "gradeTriage" },
    ],
  },
  {
    title: "Severe Defects",
    items: [
      { name: "Full Black", key: "fullBlack" },
      { name: "Full Sour", key: "fullSour" },
      { name: "Pods", key: "pods" },
      { name: "Fungas Damaged", key: "fungasDamaged" },
      { name: "E M", key: "em" },
      { name: "Severe Insect", key: "severeInsect" },
    ],
  },
  {
    title: "Less Severe Defects",
    items: [
      { name: "Partial Black", key: "partialBlack" },
      { name: "Partial Sour", key: "partialSour" },
      { name: "Patchment", key: "patchment" },
      { name: "Floaters Chalky", key: "floatersChalky" },
      { name: "Immature", key: "immature" },
      { name: "Withered", key: "withered" },
      { name: "Shells", key: "shells" },
      { name: "Broken Chipped", key: "brokenChipped" },
      { name: "Husks", key: "husks" },
      { name: "Pin Hole", key: "pinHole" },
    ],
  },
];

export const CuppingReportHeader = [
  {
    name: "Report ID",
    selector: (row) => row["id"],
  },
  {
    name: "cupper",
    selector: (row) => row["cupper"],
  },
  {
    name: "Timestamp",
    selector: (row) => row["id"],
  },
  {
    name: "Note",
    selector: (row) => row["notes"],
  },
];

export const GreenReportHeader = [
  {
    name: "Report ID",
    selector: (row) => row["id"],
  },
  {
    name: "Over Turn Percentage",
    selector: (row) => row["overTurnPercentage"],
  },
  {
    name: "Moisture Content",
    selector: (row) => row["mc"],
  },
];
