export const calculateFormValues = v => ({
  netInputWeight:
    Number(v.inputWeight) - (Number(v.spillPrivBatch) + Number(v.spillCF)),
  highGradeWeight:
    Number(v.gradeAA) + Number(v.gradeAB) + Number(v.gradeCAndPB),
  lowGradeWeight:
    Number(v.triage) +
    Number(v.pods) +
    Number(v.arabica1899) +
    Number(v.sweeppingsOrSpillages),
  totalBlackBeans:
    Number(v.blackBeansAA) + Number(v.blackBeansAB) + Number(v.blackBeansC),
  wasteSubTotal: Number(v.stone) + Number(v.preCleaner) + Number(v.graderHusks),
  otherLossSubTotal: Number(v.handlingLoss) + Number(v.dryingLoss),
});
