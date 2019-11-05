export const calculateFormValues = v => ({
  netInputWeight:
    Number(v.inputWeight) - (Number(v.spillPrivBatch) + Number(v.spillCF)),
  lowGradeWeight:
    Number(v.triage) + Number(v.pods) + Number(v.sweeppingsOrSpillages),
  wasteSubTotal: Number(v.stone) + Number(v.preCleaner) + Number(v.graderHusks),
  otherLossSubTotal: Number(v.handlingLoss) + Number(v.dryingLoss),
});
