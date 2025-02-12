export const calculateFormValues = (v) => ({
  netInputWeight: Number(v.inputWeight) - (Number(v.spillPrivBatch) + Number(v.spillCF)),
  highGradeWeight: Number(v.highGradeWeight),
  lowGradeWeight: Number(v.triage) + Number(v.pods) + Number(v.sweeppingsOrSpillages),
  wasteSubTotal: Number(v.stone) + Number(v.preCleaner) + Number(v.graderHusks),
  totalBlackBeans: Number(v.totalBlackBeans),
  otherLossSubTotal: Number(v.handlingLoss) + Number(v.dryingLoss),
});
