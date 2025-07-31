export interface Activity {
  id?: number;
  objectType?: string;
  objectId?: number;
  userId?: string;
  timestamp?: string;
  activityType?: string;
  activityValue?: string;
  note?: string;
  isDeleted?: boolean;
}

//  TODO: review batch and lot interfaces
export interface Batch {
  id: any;
  lotStatus: any;
  batchId: any;
  lastUpdatedAt: any;
  _id?: string;
  batchName?: string;
  ccCode?: number[];
  coCode?: number[];
  unionCode?: number;
  type?: "DRY" | "WET" | "FAQ";
  quantity?: number;
  amountPaidCalculate: number | null;
  date?: string;
  createdOn?: string;
  note?: string;
  startTime?: string;
  fermentationEndTime?: string;
  dryingEndTime?: string;
  perchmentQuantity?: number;
  isReadyForLot?: boolean;
  lotId?: number;
  batchStatus?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
  isDeleted?: boolean;
  createdAt?: string;
  modalFieldCombined?: {
    columnName: string;
    isOptional: boolean;
    fields: any;
    modalFieldId: string;
  }[];
}
export interface CoopActionData {
  id?: number;
  weightLeavingCooperative?: number;
  mcLeavingCooperative?: number;
  timeToFactory?: string;
  finalizeCoopStatus?: boolean;
}
export interface Cupping {
  id?: number;
  lotName?: string;
  date?: string;
  timestamp?: string;
  cfa?: string;
  ccName?: string;
  cupper?: string;
  sampleType?: string;
  fragranceAroma?: number;
  flavour?: number;
  acidity?: number;
  body?: number;
  afterTaste?: number;
  balance?: number;
  sweetness?: number;
  uniformity?: number;
  cleanCup?: number;
  overAll?: number;
  taint?: number;
  fault?: number;
  notes?: string;
  status?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
  isDeleted?: boolean;
}
export interface FactoryReport {
  id?: number;
  lotId?: number;
  date?: string;
  mcIn?: number;
  mcOut?: number;
  inputWeight?: number;
  spillPrivBatch?: number;
  spillCF?: number;
  netInputWeight?: number;
  gradeAA?: number;
  gradeAB?: number;
  gradeCAndPB?: number;
  highGradeWeight?: number;
  triage?: number;
  pods?: number;
  arabica1899?: number;
  sweeppingsOrSpillages?: number;
  lowGradeWeight?: number;
  blackBeansAA?: number;
  blackBeansAB?: number;
  blackBeansC?: number;
  totalBlackBeans?: number;
  stone?: number;
  preCleaner?: number;
  graderHusks?: number;
  wasteSubTotal?: number;
  handlingLoss?: number;
  dryingLoss?: number;
  otherLossSubTotal?: number;
  isDeleted?: boolean;
}
export interface GRNNumberData {
  id?: number;
  grnNumber?: string;
  grnTimestamp?: string;
  weightAtGrn?: number;
  mcAtGrn?: number;
  finalizeGrnStatus?: boolean;
}
export interface Lot {
  _id?: string;
  id?: number;
  lotName?: string;
  coCode?: number;
  unionCode?: number;
  quantity?: number;
  amountPaidCalculate?: number | null;
  type?: string;
  createdOn?: string;
  timeToFactory?: string;
  weightLeavingCooperative?: number;
  mcLeavingCooperative?: number;
  coopStatus?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
  weightArrivingFactory?: number;
  mcArrivingFactory?: number;
  millingTime?: string;
  weightLeavingFactory?: number;
  mcLeavingFactory?: number;
  outTurn?: number;
  millingStatus?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
  grnNumber?: string;
  grnTimestamp?: string;
  weightAtGrn?: number;
  mcAtGrn?: number;
  grnStatus?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
  factoryReportId?: number;
  factoryStatus?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
  greenAnalysisId?: number;
  greenAnalysisStatus?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
  cuppings?: Cupping[];
  lotStatus?:
    | "AT_COLLECTION_CENTER"
    | "AT_CO_OPERATIVE"
    | "IN_TRANSPORT"
    | "AT_FACTORY"
    | "AT_UNION";
  deleted?: boolean;
  lotCategory?: "lot" | "sub_lot" | "remaining_lot";
  isReadyForContainer: boolean;
  isSubLotCreated: boolean;
}
export interface LotList {
  id?: number;
  lotName?: string;
  coCode?: number;
  inputWeightInFactory?: number;
  highGradeWeight?: number;
  lotStatus?:
    | "AT_COLLECTION_CENTER"
    | "AT_CO_OPERATIVE"
    | "IN_TRANSPORT"
    | "AT_FACTORY"
    | "AT_UNION";
  qualityScores?: number /* float */[];
  grnNumber?: string;
  createdOn?: string;
  cooperativeName?: string;
  cooperativeFullName?: string;
  manager?: string;
  contact?: string;
}
export interface MillingActionData {
  id?: number;
  weightArrivingFactory?: number;
  weightLeavingFactory?: number;
  mcArrivingFactory?: number;
  mcLeavingFactory?: number;
  millingTime?: string;
  finalizeMillingStatus?: boolean;
  unionCode?: number;
}
export interface QualityReport {
  id?: number;
  lotId?: number;
  lotName?: string;
  date?: string;
  timestamp?: string;
  cfa?: string;
  ccName?: string;
  coffeeType?: string;
  overTurnPercentage?: number;
  mc?: number;
  gradeAA?: number;
  gradeA?: number;
  gradeB?: number;
  gradeAB?: number;
  gradeC?: number;
  gradePB?: number;
  gradeTriage?: number;
  fullBlack?: number;
  fullSour?: number;
  pods?: number;
  fungasDamaged?: number;
  em?: number;
  severeInsect?: number;
  partialBlack?: number;
  partialSour?: number;
  patchment?: number;
  floatersChalky?: number;
  immature?: number;
  withered?: number;
  shells?: number;
  brokenChipped?: number;
  husks?: number;
  pinHole?: number;
  percentageOutTurn?: number;
  isDeleted?: boolean;
}

export interface Location {
  type: string;
  coordinates: number[];
}

export interface FarmerMember {
  id: any;
  _id?: string;
  product: string;
  farmerId: string;
  farmerName: string;
  gender: string;
  dateOfBirth: Date;
  formatDate?: string;
  contactNumber?: string;
  nationalIdentityNumber?: string;
  levelOfEducation?: string;
  noOfDependents?: number;
  village: string;
  cc: string;
  landAcreage: number;
  coffeeAcreage: number;
  noOfCoffeeTrees: number;
  otherFarmEnterprises?: string[];
  agroforestry?: "YES" | "NO";
  farmLocation?: any;
  photoOfFarm?: string;
  ccCode: number;
  coCode: number;
  unionCode: number;
  instanceID: string;
  instanceName?: string;
  entity?: any;
  submittedOnODK: Date;
  submitterName: string;
  formVersion: string;
  reviewState?: string;
  edits: string;
  location: Location;
  farmerProduceIds?: any[];
  isFarmerDataValidated: boolean;
  createdAt: Date;
  lastUpdatedAt: Date;
  isDeleted: boolean;
}

export interface FarmerProduce {
  _id: string;
  id: any;
  product: string;
  farmerProduceId: string;
  farmerId?: string;
  farmerName: string;
  contactNo?: string;
  produceType: string;
  quantity: number;
  noOfBags?: number;
  deduction?: number;
  deductionReason?: string;
  netCollection?: number;
  pricePerKg?: number;
  amountPaidCalculate?: number | null;
  millingCharge?: number;
  dateOfCollection?: Date;
  collectorName?: string;
  collectorSubstr?: string;
  calculateGrn?: string;
  location?: object; // You might want to define a more specific type for this object
  grnReceipt?: string;
  farmerEID: string;
  instanceID?: string;
  instanceName?: string;
  submittedOnODK?: Date;
  submitterName?: string;
  formVersion?: string;
  reviewState?: string;
  edits?: number;
  batchId?: string;
  batchIdMongo?: string;
  ccCode?: number;
  coCode?: number;
  unionCode?: number;
  createdAt: Date;
  lastUpdatedAt: Date;
  needsReview: boolean;
  isDeleted: boolean;
}

export interface Container {
  id: any;
  _id: string;
  productId: string;
  containerName: string;
  type: string;
  coCode: number[];
  ccCode: number[];
  unionCode: number;
  quantity: number;
  amountPaidCalculate: number | null;
  containerStatus: string;
  modalFieldCombined: Array<{
    lastUpdatedAt: string;
    columnStatus: "ADD" | "EDIT" | "DONE" | "NOTAPPLICABLE";
    modalFieldId: any;
    columnName: string;
    isOptional: boolean;
    fields: [name: string, value: any];
  }>;
  containerId: string;
  lotIds: string[];
  batchIds: string[];
  farmerProduceIds: string[];
  flag: boolean;
  flagReason: string[];
  createdAt: Date;
  lastUpdatedAt: Date;
  isDeleted: boolean;
  note: string | null;
}
