import { dateTimeInput, textInput } from "@components/@core/formik";
import { Button } from "carbon-components-react";
import { Field } from "formik";
import React from "react";

import FactoryReportError from "../error";
import { calculateFormValues } from "./factory-dry-utils";

export const renderFactoryReportDryForm = ({
  handleSubmit,
  isValid,
  values: v,
}) => {
  const cv = calculateFormValues(v);

  const calcPersentage = num =>
    `${((num * 100) / cv.netInputWeight).toFixed(2) || 0}%`;

  const totalDiff =
    cv.highGradeWeight +
    cv.lowGradeWeight +
    cv.totalBlackBeans +
    cv.wasteSubTotal +
    cv.otherLossSubTotal -
    cv.netInputWeight;

  return (
    <form className="bx--form mb-4" onSubmit={handleSubmit}>
      <h3 className="eco--form-title">Basic Information</h3>
      <div className="bx--row">
        <div className="bx--col-md">
          <Field label="GRN Number" name="grnNumber" component={textInput} />
        </div>
        <div className="bx--col-md">
          <Field label="Date" name="date" component={dateTimeInput} />
        </div>
        <div className="bx--col-md">
          <Field label="MC In" name="mcIn" component={textInput} />
        </div>
        <div className="bx--col-md">
          <Field label="MC Out" name="mcOut" component={textInput} />
        </div>
      </div>

      <h3 className="eco--form-title">Input</h3>
      <div className="bx--row">
        <div className="bx--col-md bx--col-lg-3">
          <Field
            label="+ Input Weight"
            name="inputWeight"
            component={textInput}
          />
        </div>
        <div className="bx--col-md bx--col-lg-3">
          <Field
            label="- Add Spill. Priv. Batch"
            name="spillPrivBatch"
            component={textInput}
          />
        </div>
        <div className="bx--col-md bx--col-lg-3">
          <Field
            label="- Less Spill C/F"
            name="spillCF"
            component={textInput}
          />
        </div>
      </div>
      <div className="eco--divider mb-4">
        Net Input: {cv.netInputWeight} KG(s)
      </div>

      <div className="bx--row eco--report-factory-grades mb-4">
        <div className="bx--col-md">
          <h3 className="eco--form-title">High Grades</h3>
          <div>
            <Field
              label="Clean DRUGAR"
              name="highGradeWeight"
              component={textInput}
              helperText={calcPersentage(v.highGradeWeight)}
            />
          </div>
          <div className="eco--divider">
            Sub Total: {v.highGradeWeight} KG(s)
          </div>
        </div>

        <div className="bx--col-md">
          <h3 className="eco--form-title">Low Grades</h3>
          <div>
            <Field
              label="Triage"
              name="triage"
              component={textInput}
              helperText={calcPersentage(v.triage)}
            />
            <Field
              label="Pods"
              name="pods"
              component={textInput}
              helperText={calcPersentage(v.pods)}
            />
            <Field
              label="Sweeppings or Spillages"
              name="sweeppingsOrSpillages"
              component={textInput}
              helperText={calcPersentage(v.sweeppingsOrSpillages)}
            />
          </div>
          <div className="eco--divider">
            Sub Total: {cv.lowGradeWeight} KG(s)
          </div>
        </div>

        <div className="bx--col-md">
          <h3 className="eco--form-title">Colour Sorter Rejects</h3>
          <div>
            <Field
              label="Black Beans"
              name="totalBlackBeans"
              component={textInput}
              helperText={calcPersentage(v.totalBlackBeans)}
            />
          </div>
          <div className="eco--divider">
            Sub Total: {v.totalBlackBeans} KG(s)
          </div>
        </div>

        <div className="bx--col-md">
          <h3 className="eco--form-title">Wastes</h3>
          <div>
            <Field
              label="Stone"
              name="stone"
              component={textInput}
              helperText={calcPersentage(v.stone)}
            />
            <Field
              label="Pre Cleaner"
              name="preCleaner"
              component={textInput}
              helperText={calcPersentage(v.preCleaner)}
            />
            <Field
              label="Grader Husks"
              name="graderHusks"
              component={textInput}
              helperText={calcPersentage(v.graderHusks)}
            />
          </div>
          <div className="eco--divider">
            Sub Total: {cv.wasteSubTotal} KG(s)
          </div>
        </div>

        <div className="bx--col-md">
          <h3 className="eco--form-title">Other Loses</h3>
          <div>
            <Field
              label="Handling Loss"
              name="handlingLoss"
              component={textInput}
              helperText={calcPersentage(v.handlingLoss)}
            />
            <Field
              label="Drying Loss"
              name="dryingLoss"
              component={textInput}
              helperText={calcPersentage(v.dryingLoss)}
            />
          </div>
          <div className="eco--divider">
            Sub Total: {cv.otherLossSubTotal} KG(s)
          </div>
        </div>
      </div>

      <FactoryReportError diff={totalDiff} />

      <Button type="submit" disabled={!(isValid && totalDiff === 0)}>
        Submit
      </Button>
    </form>
  );
};
