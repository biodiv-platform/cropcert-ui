import {
  dateTimeInput,
  numberInput,
  textInput,
} from "@components/@core/formik";
import { axCreateGreenReport } from "@services/report.service";
import { local2utc, messageRedirect, nonZeroFalsy } from "@utils/basic.util";
import { Button } from "carbon-components-react";
import { Field, Formik } from "formik";
import React, { Component } from "react";
import * as Yup from "yup";

import QualityGradingSummery from "./quality-grading-summery";

interface IProps {
  id;
  lotName;
  type;
  outTurn;
  weightLeavingFactory;
  quantity;
  grnNumber;
  grnTimestamp;
  cooperativeName;
  ccNames;
  report;
}

export default class GreenReport extends Component<IProps> {
  report = this.props.report;
  getOutTurn = () => {
    return (
      (this.props.weightLeavingFactory * 100) /
      this.props.quantity
    ).toFixed(2);
  };

  greenForm = {
    validationSchema: Yup.object().shape({
      lotName: Yup.string().required(),
      lotId: Yup.string().required(),
      date: Yup.number().required(),
      cfa: Yup.string().required(),
      ccName: Yup.string().required(),

      coffeeType: Yup.string().required(),
      overTurnPercentage: Yup.number().required(),
      mc: Yup.number().required(),
      grnNumber: Yup.string().required(),

      // Grades
      ...(this.props.type === "WET"
        ? {
            gradeAA: Yup.number().required(),
            gradeA: Yup.number().required(),
            gradeB: Yup.number().required(),
            gradeAB: Yup.number().required(),
            gradeC: Yup.number().required(),
            gradePB: Yup.number().required(),
            gradeTriage: Yup.number().required(),
          }
        : {}),

      // Severe defects
      fullBlack: Yup.number().required(),
      fullSour: Yup.number().required(),
      pods: Yup.number().required(),
      fungasDamaged: Yup.number().required(),
      em: Yup.number().required(),
      severeInsect: Yup.number().required(),

      // Less Severe defects
      partialBlack: Yup.number().required(),
      partialSour: Yup.number().required(),
      patchment: Yup.number().required(),
      floatersChalky: Yup.number().required(),
      immature: Yup.number().required(),
      withered: Yup.number().required(),
      shells: Yup.number().required(),
      brokenChipped: Yup.number().required(),
      husks: Yup.number().required(),
      pinHole: Yup.number().required(),
    }),
    initialValues: {
      lotName: this.props.lotName,
      lotId: this.props.id,
      date: this.props.grnTimestamp,
      timestamp: local2utc(),
      cfa: this.props.cooperativeName,
      ccName: this.props.ccNames.toString(),

      coffeeType: this.props.type,
      overTurnPercentage: this.getOutTurn(),
      mc: nonZeroFalsy(this.report.mc),
      grnNumber: this.props.grnNumber,

      // Grades
      gradeAA: nonZeroFalsy(this.report.gradeAA),
      gradeA: nonZeroFalsy(this.report.gradeA),
      gradeB: nonZeroFalsy(this.report.gradeB),
      gradeAB: nonZeroFalsy(this.report.gradeAB),
      gradeC: nonZeroFalsy(this.report.gradeC),
      gradePB: nonZeroFalsy(this.report.gradePB),
      gradeTriage: nonZeroFalsy(this.report.gradeTriage),

      // Severe defects
      fullBlack: this.report.fullBlack || 0,
      fullSour: this.report.fullSour || 0,
      pods: this.report.pods || 0,
      fungasDamaged: this.report.fungasDamaged || 0,
      em: this.report.em || 0,
      severeInsect: this.report.severeInsect || 0,

      // Less Severe defects
      partialBlack: this.report.partialBlack || 0,
      partialSour: this.report.partialSour || 0,
      patchment: this.report.patchment || 0,
      floatersChalky: this.report.floatersChalky || 0,
      immature: this.report.immature || 0,
      withered: this.report.withered || 0,
      shells: this.report.shells || 0,
      brokenChipped: this.report.brokenChipped || 0,
      husks: this.report.husks || 0,
      pinHole: this.report.pinHole || 0,
    },
  };

  qualityGrading = v => {
    const t =
      v.gradeAA +
      v.gradeA +
      v.gradeB +
      v.gradeAB +
      v.gradeC +
      v.gradePB +
      v.gradeTriage;
    return v.coffeeType === "WET" ? (typeof t === "number" ? t : "0") : 100;
  };

  severeDefectsTotal = v => {
    const t =
      v.fullBlack +
      v.fullSour +
      v.pods +
      v.fungasDamaged +
      v.em +
      v.severeInsect;
    return typeof t === "number" ? t : "0";
  };

  lessSevereDefectsTotal = v => {
    const t =
      v.partialBlack +
      v.partialSour +
      v.patchment +
      v.floatersChalky +
      v.immature +
      v.withered +
      v.shells +
      v.brokenChipped +
      v.husks +
      v.pinHole;
    return typeof t === "number" ? t : "0";
  };

  outTurnFAQ = v => {
    const qualityGrading = this.qualityGrading(v);
    const severeDefectsTotal = this.severeDefectsTotal(v);
    const lessSevereDefectsTotal = this.lessSevereDefectsTotal(v);
    if (
      typeof qualityGrading === "number" &&
      typeof severeDefectsTotal === "number" &&
      typeof lessSevereDefectsTotal === "number" &&
      severeDefectsTotal + lessSevereDefectsTotal <= qualityGrading
    ) {
      return (
        ((qualityGrading - (severeDefectsTotal + lessSevereDefectsTotal)) /
          qualityGrading) *
        100
      ).toFixed(2);
    }
    return -1;
  };

  handleSubmit = (values, actions) => {
    const { grnNumber, ...v } = values;
    actions.setSubmitting(false);
    axCreateGreenReport({
      ...v,
      id: this.report.id || -1,
      percentageOutTurn: this.outTurnFAQ(values),
    }).then(response =>
      messageRedirect({ ...response, mcode: "GREEN_REPORT_CREATED" })
    );
  };

  defectsTotalError = v => {
    const qualityGrading = this.qualityGrading(v);
    const severeDefectsTotal = this.severeDefectsTotal(v);
    const lessSevereDefectsTotal = this.lessSevereDefectsTotal(v);
    if (
      typeof qualityGrading === "number" &&
      typeof severeDefectsTotal === "number" &&
      typeof lessSevereDefectsTotal === "number" &&
      severeDefectsTotal + lessSevereDefectsTotal > qualityGrading
    ) {
      return (
        <>
          <span className="btn-danger">
            Severe and Less Severe Defects should be less then {qualityGrading}
          </span>
        </>
      );
    }
  };

  renderGreenForm = ({ handleSubmit, isValid, values }) => (
    <form className="bx--form" onSubmit={handleSubmit}>
      <h3 className="eco--form-title">Lot Information</h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="GRN Number"
            name="grnNumber"
            component={textInput}
            readOnly={true}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Lot Name"
            name="lotName"
            component={textInput}
            readOnly={true}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Lot Reception Date"
            name="date"
            component={dateTimeInput}
            disabled={true}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Cooperative Name"
            name="cfa"
            component={textInput}
            readOnly={true}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Collection Center Name(s)"
            name="ccName"
            component={textInput}
            readOnly={true}
          />
        </div>

        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Coffee Type"
            name="coffeeType"
            component={textInput}
            readOnly={true}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Outturn Percentage"
            name="overTurnPercentage"
            component={numberInput}
            readOnly={true}
          />
        </div>
      </div>
      <h3 className="eco--form-title">Report</h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Report Time"
            name="timestamp"
            component={dateTimeInput}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="Moisture Content" name="mc" component={numberInput} />
        </div>
      </div>
      {this.props.type === "WET" && (
        <>
          <h3 className="eco--form-title">
            Quality Grading - {this.qualityGrading(values)}g
          </h3>
          <div className="bx--row">
            <div className="bx--col-lg-3 bx--col-sm-12">
              <Field label="AA" name="gradeAA" component={numberInput} />
            </div>
            <div className="bx--col-lg-3 bx--col-sm-12">
              <Field label="A" name="gradeA" component={numberInput} />
            </div>
            <div className="bx--col-lg-3 bx--col-sm-12">
              <Field label="B" name="gradeB" component={numberInput} />
            </div>
            <div className="bx--col-lg-3 bx--col-sm-12">
              <Field label="AB" name="gradeAB" component={numberInput} />
            </div>
            <div className="bx--col-lg-3 bx--col-sm-12">
              <Field label="C" name="gradeC" component={numberInput} />
            </div>
            <div className="bx--col-lg-3 bx--col-sm-12">
              <Field label="PB" name="gradePB" component={numberInput} />
            </div>
            <div className="bx--col-lg-3 bx--col-sm-12">
              <Field
                label="Triage"
                name="gradeTriage"
                component={numberInput}
              />
            </div>
          </div>
          <h3 className="eco--form-title">Quality Grading Summery</h3>
          <QualityGradingSummery values={values} />
        </>
      )}
      <h3 className="eco--form-title">
        Severe Defects - {this.severeDefectsTotal(values)}&emsp;
        {this.defectsTotalError(values)}
      </h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="Full Black" name="fullBlack" component={numberInput} />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="Full Sour" name="fullSour" component={numberInput} />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="Pods" name="pods" component={numberInput} />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Fungas Damaged"
            name="fungasDamaged"
            component={numberInput}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="E M" name="em" component={numberInput} />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Severe Insect"
            name="severeInsect"
            component={numberInput}
          />
        </div>
      </div>
      <h3 className="eco--form-title">
        Less Severe Defects - {this.lessSevereDefectsTotal(values)}&emsp;
        {this.defectsTotalError(values)}
      </h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Partial Black"
            name="partialBlack"
            component={numberInput}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Partial Sour"
            name="partialSour"
            component={numberInput}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="Patchment" name="patchment" component={numberInput} />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Floaters/Chalky"
            name="floatersChalky"
            component={numberInput}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="Immature" name="immature" component={numberInput} />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="Withered" name="withered" component={numberInput} />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="Shells" name="shells" component={numberInput} />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Broken/Chipped"
            name="brokenChipped"
            component={numberInput}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="Husks" name="husks" component={numberInput} />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="Pin Hole" name="pinHole" component={numberInput} />
        </div>
      </div>
      <h3 className="eco--form-title">
        {this.props.type === "DRY" ? "Out turn FAQ " : "Out turn "} &rarr;
        {this.outTurnFAQ(values)}%
      </h3>
      <Button
        type="submit"
        disabled={!(isValid && this.outTurnFAQ(values) >= 0)}
      >
        Submit
      </Button>
    </form>
  );

  render() {
    return (
      <Formik {...this.greenForm} onSubmit={this.handleSubmit}>
        {this.renderGreenForm}
      </Formik>
    );
  }
}
