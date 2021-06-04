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
export interface Batch {
    id?: number; // int64
    batchName?: string;
    ccCode?: number; // int64
    type?: "DRY" | "WET";
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
export interface Lot {
    id?: number; // int64
    lotName?: string;
    coCode?: number; // int64
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
    grnStatus?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
    factoryReportId?: number; // int64
    factoryStatus?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
    greenAnalysisId?: number; // int64
    greenAnalysisStatus?: "NOTAPPLICABLE" | "ADD" | "EDIT" | "DONE";
    cuppings?: Cupping[];
    unionCode?: number;
    lotStatus?: "AT_COLLECTION_CENTER" | "AT_CO_OPERATIVE" | "IN_TRANSPORT" | "AT_FACTORY" | "AT_UNION";
    deleted?: boolean;
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
