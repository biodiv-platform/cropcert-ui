import { dateTimeInput, textInput } from "@components/@core/formik";
import { MESSAGE } from "@utils/constants";
import { Button, InlineNotification } from "carbon-components-react";
import { Field } from "formik";
import React from "react";

import { calculateFormValues } from "./factory-wet-utils";

export const renderFactoryReportWetForm = ({
  handleSubmit,
  isValid,
  values: v,
}) => {
  const cv = calculateFormValues(v);

  const calcPersentage = num =>
    `${((num * 100) / cv.netInputWeight).toFixed(2) || 0}%`;

  const isValidTotal =
    cv.highGradeWeight +
      cv.lowGradeWeight +
      cv.totalBlackBeans +
      cv.wasteSubTotal +
      cv.otherLossSubTotal ===
    cv.netInputWeight;

  return (
    <form className="bx--form mb-4" onSubmit={handleSubmit}>
      <h3 className="eco--form-title">Basic Information</h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="GRN Number" name="grnNumber" component={textInput} />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="Date" name="date" component={dateTimeInput} />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="MC In" name="mcIn" component={textInput} />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="MC Out" name="mcOut" component={textInput} />
        </div>
      </div>
      <h3 className="eco--form-title">Input</h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="+ Input Weight"
            name="inputWeight"
            component={textInput}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="- Add Spill. Priv. Batch"
            name="spillPrivBatch"
            component={textInput}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="- Less Spill C/F"
            name="spillCF"
            component={textInput}
          />
        </div>
      </div>
      <div className="eco--divider">Net Input: {cv.netInputWeight} KG(s)</div>

      <h3 className="eco--form-title">High Grades</h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Grade AA"
            name="gradeAA"
            component={textInput}
            helperText={calcPersentage(v.gradeAA)}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Grade AB"
            name="gradeAB"
            component={textInput}
            helperText={calcPersentage(v.gradeAB)}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Grade C &amp; PB"
            name="gradeCAndPB"
            component={textInput}
            helperText={calcPersentage(v.gradeCAndPB)}
          />
        </div>
      </div>
      <div className="eco--divider">Sub Total: {cv.highGradeWeight} KG(s)</div>

      <h3 className="eco--form-title">Low Grades</h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Triage"
            name="triage"
            component={textInput}
            helperText={calcPersentage(v.triage)}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Pods"
            name="pods"
            component={textInput}
            helperText={calcPersentage(v.pods)}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Arabica 1899"
            name="arabica1899"
            component={textInput}
            helperText={calcPersentage(v.arabica1899)}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Sweeppings or Spillages"
            name="sweeppingsOrSpillages"
            component={textInput}
            helperText={calcPersentage(v.sweeppingsOrSpillages)}
          />
        </div>
      </div>
      <div className="eco--divider">Sub Total: {cv.lowGradeWeight} KG(s)</div>

      <h3 className="eco--form-title">Colour Sorter Rejects</h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Black Beans AA"
            name="blackBeansAA"
            component={textInput}
            helperText={calcPersentage(v.blackBeansAA)}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Black Beans AB"
            name="blackBeansAB"
            component={textInput}
            helperText={calcPersentage(v.blackBeansAB)}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Black Beans C"
            name="blackBeansC"
            component={textInput}
            helperText={calcPersentage(v.blackBeansC)}
          />
        </div>
      </div>
      <div className="eco--divider">Sub Total: {cv.totalBlackBeans} KG(s)</div>

      <h3 className="eco--form-title">Wastes</h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Stone"
            name="stone"
            component={textInput}
            helperText={calcPersentage(v.stone)}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Pre Cleaner"
            name="preCleaner"
            component={textInput}
            helperText={calcPersentage(v.preCleaner)}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Grader Husks"
            name="graderHusks"
            component={textInput}
            helperText={calcPersentage(v.graderHusks)}
          />
        </div>
      </div>
      <div className="eco--divider">Sub Total: {cv.wasteSubTotal} KG(s)</div>

      <h3 className="eco--form-title">Other Loses</h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Handling Loss"
            name="handlingLoss"
            component={textInput}
            helperText={calcPersentage(v.handlingLoss)}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Drying Loss"
            name="dryingLoss"
            component={textInput}
            helperText={calcPersentage(v.dryingLoss)}
          />
        </div>
      </div>
      <div className="eco--divider">
        Sub Total: {cv.otherLossSubTotal} KG(s)
      </div>

      {isValid && !isValidTotal && (
        <InlineNotification
          kind="error"
          lowConstrast={true}
          role="alert"
          title={MESSAGE.ERROR_FACTORY_REPORT}
        />
      )}
      <Button type="submit" disabled={!(isValid && isValidTotal)}>
        Submit
      </Button>
    </form>
  );
};
