export interface Activity {
  id?: number; // int64
  objectType?: string;
  objectId?: number; // int64
  userId?: string;
  timestamp?: string; // date-time
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
  _id?: string; // int64
  batchName?: string;
  ccCode?: number[]; // int64
  coCode?: number[]; // int64
  unionCode?: number; // int64
  type?: "DRY" | "WET" | "FAQ";
  quantity?: number; // float
  date?: string; // date-time
  createdOn?: string; // date-time
  note?: string;
  startTime?: string; // date-time
  fermentationEndTime?: string; // date-time
  dryingEndTime?: string; // date-time
  perchmentQuantity?: number; // float
  isReadyForLot?: boolean;
  lotId?: number; // int64
  batchStatus?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
  isDeleted?: boolean;
  createdAt?: string; // date-time
  modalFieldCombined?: {
    columnName: string;
    isOptional: boolean;
    fields: any;
    modalFieldId: string;
  }[];
}
export interface CoopActionData {
  id?: number; // int64
  weightLeavingCooperative?: number; // float
  mcLeavingCooperative?: number; // float
  timeToFactory?: string; // date-time
  finalizeCoopStatus?: boolean;
}
export interface Cupping {
  id?: number; // int64
  lotName?: string;
  date?: string; // date-time
  timestamp?: string; // date-time
  cfa?: string;
  ccName?: string;
  cupper?: string;
  sampleType?: string;
  fragranceAroma?: number; // float
  flavour?: number; // float
  acidity?: number; // float
  body?: number; // float
  afterTaste?: number; // float
  balance?: number; // float
  sweetness?: number; // float
  uniformity?: number; // float
  cleanCup?: number; // float
  overAll?: number; // float
  taint?: number; // float
  fault?: number; // float
  notes?: string;
  status?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
  isDeleted?: boolean;
}
export interface FactoryReport {
  id?: number; // int64
  lotId?: number; // int64
  date?: string; // date-time
  mcIn?: number; // float
  mcOut?: number; // float
  inputWeight?: number; // float
  spillPrivBatch?: number; // float
  spillCF?: number; // float
  netInputWeight?: number; // float
  gradeAA?: number; // float
  gradeAB?: number; // float
  gradeCAndPB?: number; // float
  highGradeWeight?: number; // float
  triage?: number; // float
  pods?: number; // float
  arabica1899?: number; // float
  sweeppingsOrSpillages?: number; // float
  lowGradeWeight?: number; // float
  blackBeansAA?: number; // float
  blackBeansAB?: number; // float
  blackBeansC?: number; // float
  totalBlackBeans?: number; // float
  stone?: number; // float
  preCleaner?: number; // float
  graderHusks?: number; // float
  wasteSubTotal?: number; // float
  handlingLoss?: number; // float
  dryingLoss?: number; // float
  otherLossSubTotal?: number; // float
  isDeleted?: boolean;
}
export interface GRNNumberData {
  id?: number; // int64
  grnNumber?: string;
  grnTimestamp?: string; // date-time
  weightAtGrn?: number; // float
  mcAtGrn?: number; // float
  finalizeGrnStatus?: boolean;
}
export interface Lot {
  id?: number; // int64
  lotName?: string;
  coCode?: number; // int64
  unionCode?: number; // int64
  quantity?: number; // float
  type?: string;
  createdOn?: string; // date-time
  timeToFactory?: string; // date-time
  weightLeavingCooperative?: number; // float
  mcLeavingCooperative?: number; // float
  coopStatus?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
  weightArrivingFactory?: number; // float
  mcArrivingFactory?: number; // float
  millingTime?: string; // date-time
  weightLeavingFactory?: number; // float
  mcLeavingFactory?: number; // float
  outTurn?: number; // float
  millingStatus?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
  grnNumber?: string;
  grnTimestamp?: string; // date-time
  weightAtGrn?: number; // float
  mcAtGrn?: number; // float
  grnStatus?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
  factoryReportId?: number; // int64
  factoryStatus?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
  greenAnalysisId?: number; // int64
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
  id?: number; // int64
  lotName?: string;
  coCode?: number; // int64
  inputWeightInFactory?: number; // float
  highGradeWeight?: number; // float
  lotStatus?:
    | "AT_COLLECTION_CENTER"
    | "AT_CO_OPERATIVE"
    | "IN_TRANSPORT"
    | "AT_FACTORY"
    | "AT_UNION";
  qualityScores?: number /* float */[];
  grnNumber?: string;
  createdOn?: string; // date-time
  cooperativeName?: string;
  cooperativeFullName?: string;
  manager?: string;
  contact?: string;
}
export interface MillingActionData {
  id?: number; // int64
  weightArrivingFactory?: number; // float
  weightLeavingFactory?: number; // float
  mcArrivingFactory?: number; // float
  mcLeavingFactory?: number; // float
  millingTime?: string; // date-time
  finalizeMillingStatus?: boolean;
  unionCode?: number; // int64
}
export interface QualityReport {
  id?: number; // int64
  lotId?: number; // int64
  lotName?: string;
  date?: string; // date-time
  timestamp?: string; // date-time
  cfa?: string;
  ccName?: string;
  coffeeType?: string;
  overTurnPercentage?: number; // float
  mc?: number; // float
  gradeAA?: number; // float
  gradeA?: number; // float
  gradeB?: number; // float
  gradeAB?: number; // float
  gradeC?: number; // float
  gradePB?: number; // float
  gradeTriage?: number; // float
  fullBlack?: number; // float
  fullSour?: number; // float
  pods?: number; // float
  fungasDamaged?: number; // float
  em?: number; // float
  severeInsect?: number; // float
  partialBlack?: number; // float
  partialSour?: number; // float
  patchment?: number; // float
  floatersChalky?: number; // float
  immature?: number; // float
  withered?: number; // float
  shells?: number; // float
  brokenChipped?: number; // float
  husks?: number; // float
  pinHole?: number; // float
  percentageOutTurn?: number; // float
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
  amountPaidCalculate?: number;
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
