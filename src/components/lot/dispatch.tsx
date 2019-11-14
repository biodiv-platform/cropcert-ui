import CancelButton from "@components/@core/cancel-button";
import { dateTimeInput } from "@components/@core/formik";
import DataTable from "@components/@core/table";
import { axLotDispatch } from "@services/lot.service";
import { local2utc, messageRedirect } from "@utils/basic.util";
import { Button } from "carbon-components-react";
import { Field, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import { columnsDispatch } from "./lot.columns";

interface IProps {
  rows: [any];
  to: string;
  timeKey: string;
  extraColumns: object[];
}

export default function DispatchLot({
  rows,
  to,
  timeKey,
  extraColumns = [],
}: IProps) {
  const initialValues = {
    date: new Date().getTime(),
  };

  const validationSchema = Yup.object().shape({
    date: Yup.number().required(),
  });

  const columns = [...columnsDispatch, ...extraColumns];

  const handleSubmit = ({ date }) => {
    axLotDispatch(to, {
      ids: rows.map(o => o.id),
      [timeKey]: local2utc(date).getTime(),
    }).then(response =>
      messageRedirect({
        ...response,
        mcode: `LOT_DISPATCHED_${to.toUpperCase()}`,
      })
    );
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <div className="bx--row mb-2">
            <div className="bx--col-lg-6 bx--col-md-12">
              <h1>Finalize Dispatch Lot to {to}</h1>
            </div>
            <div className="bx--col-lg-6 bx--col-md-12 text-right mt-3">
              <CancelButton />
              <Button kind="primary" type="submit" disabled={rows.length <= 0}>
                Confirm dispatch to {to}
              </Button>
            </div>
          </div>

          <div className="bx--row">
            <div className="bx--col-lg-3 bx--col-md-12">
              <Field
                label={`Time to ${to}`}
                name="date"
                component={dateTimeInput}
                type="date"
                className="mb-0"
              />
            </div>
          </div>

          <h2>Lots</h2>
          <DataTable
            keyField="id"
            className="mb-4"
            columns={columns}
            noHeader={true}
            data={rows}
          />
        </form>
      )}
    </Formik>
  );
}
