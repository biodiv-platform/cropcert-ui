import { getToday, messageRedirect } from "@utils/basic.util";
import { Button } from "carbon-components-react";
import { Field, Formik } from "formik";
import React, { Component } from "react";
import * as Yup from "yup";

import { textInput } from "@components/@core/formik";
import { axCreateGreenReport } from "@services/report.service";

interface IProps {
  id;
  lotName;
  type;
  outTurn;
  quantity;
  grnNumber;
  coOperativeName;
  ccNames;
}

export default class GreenReport extends Component<IProps> {
  getOutTurn = () => {
    return ((this.props.outTurn * 100) / this.props.quantity).toFixed(2);
  };

  greenForm = {
    validationSchema: Yup.object().shape({
      lotName: Yup.string().required(),
      lotId: Yup.string().required(),
      date: Yup.date().required(),
      cfa: Yup.string().required(),
      ccName: Yup.string().required(),

      coffeeType: Yup.string().required(),
      overTurnPercentage: Yup.string().required(),
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
      date: getToday(),
      cfa: this.props.coOperativeName,
      ccName: this.props.ccNames.toString(),

      coffeeType: this.props.type,
      overTurnPercentage: this.getOutTurn(),
      mc: "",
      grnNumber: this.props.grnNumber,

      // Grades
      gradeAA: "",
      gradeA: "",
      gradeB: "",
      gradeAB: "",
      gradeC: "",
      gradePB: "",
      gradeTriage: "",

      // Severe defects
      fullBlack: 0,
      fullSour: 0,
      pods: 0,
      fungasDamaged: 0,
      em: 0,
      severeInsect: 0,

      // Less Severe defects
      partialBlack: 0,
      partialSour: 0,
      patchment: 0,
      floatersChalky: 0,
      immature: 0,
      withered: 0,
      shells: 0,
      brokenChipped: 0,
      husks: 0,
      pinHole: 0,
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
      typeof lessSevereDefectsTotal === "number"
    ) {
      return (
        ((qualityGrading - (severeDefectsTotal + lessSevereDefectsTotal)) /
          qualityGrading) *
        100
      ).toFixed(2);
    }
    return "";
  };

  handleSubmit = (values, actions) => {
    const { grnNumber, ...v } = actions;
    actions.setSubmitting(false);
    axCreateGreenReport({
      ...v,
      percentageOutTurn: this.outTurnFAQ(values),
      timestamp: new Date().getTime(),
    }).then(response =>
      messageRedirect({ ...response, mcode: "GREEN_REPORT_CREATED" })
    );
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
            component={textInput}
            type="date"
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
            component={textInput}
            type="number"
            readOnly={true}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Moisture Content"
            name="mc"
            component={textInput}
            type="number"
          />
        </div>
      </div>

      {this.props.type === "WET" && (
        <>
          <h3 className="eco--form-title">
            Quality Grading - {this.qualityGrading(values)}
          </h3>
          <div className="bx--row">
            <div className="bx--col-lg-3 bx--col-sm-12">
              <Field
                label="AA"
                name="gradeAA"
                component={textInput}
                type="number"
              />
            </div>
            <div className="bx--col-lg-3 bx--col-sm-12">
              <Field
                label="A"
                name="gradeA"
                component={textInput}
                type="number"
              />
            </div>
            <div className="bx--col-lg-3 bx--col-sm-12">
              <Field
                label="B"
                name="gradeB"
                component={textInput}
                type="number"
              />
            </div>
            <div className="bx--col-lg-3 bx--col-sm-12">
              <Field
                label="AB"
                name="gradeAB"
                component={textInput}
                type="number"
              />
            </div>
            <div className="bx--col-lg-3 bx--col-sm-12">
              <Field
                label="C"
                name="gradeC"
                component={textInput}
                type="number"
              />
            </div>
            <div className="bx--col-lg-3 bx--col-sm-12">
              <Field
                label="PB"
                name="gradePB"
                component={textInput}
                type="number"
              />
            </div>
            <div className="bx--col-lg-3 bx--col-sm-12">
              <Field
                label="Triage"
                name="gradeTriage"
                component={textInput}
                type="number"
              />
            </div>
          </div>
        </>
      )}

      <h3 className="eco--form-title">
        Severe Defects - {this.severeDefectsTotal(values)}
      </h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Full Black"
            name="fullBlack"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Full Sour"
            name="fullSour"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="Pods" name="pods" component={textInput} type="number" />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Fungas Damaged"
            name="fungasDamaged"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="E M" name="em" component={textInput} type="number" />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Severe Insect"
            name="severeInsect"
            component={textInput}
            type="number"
          />
        </div>
      </div>

      <h3 className="eco--form-title">
        Less Severe Defects - {this.lessSevereDefectsTotal(values)}
      </h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Partial Black"
            name="partialBlack"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Partial Sour"
            name="partialSour"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Patchment"
            name="patchment"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Floaters/Chalky"
            name="floatersChalky"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Immature"
            name="immature"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Withered"
            name="withered"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Shells"
            name="shells"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Broken/Chipped"
            name="brokenChipped"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Husks"
            name="husks"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Pin Hole"
            name="pinHole"
            component={textInput}
            type="number"
          />
        </div>
      </div>

      <h3 className="eco--form-title">
        {this.props.type === "DRY" ? "Out turn FAQ " : "Out turn "} &rarr;
        {this.outTurnFAQ(values)}%
      </h3>

      <Button type="submit" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );

  render() {
    return (
      <Formik
        {...this.greenForm}
        onSubmit={this.handleSubmit}
        render={this.renderGreenForm}
      />
    );
  }
}
