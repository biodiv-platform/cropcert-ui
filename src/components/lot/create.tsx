import CancelButton from "@components/@core/cancel-button";
import { dateTimeInput } from "@components/@core/formik";
import DataTable from "@components/@core/table";
import { columnsDry, columnsWet } from "@components/batch/batch.columns";
import { axCreateLotFromBatches } from "@services/lot.service";
import { formattedDate, local2utc, messageRedirect } from "@utils/basic.util";
import { BATCH_TYPE } from "@utils/constants";
import { Button } from "carbon-components-react";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

interface IProps {
  batches: [any];
  lotName: string;
  type: string;
  coCode: number;
}

export default function CreateLot({
  batches,
  type,
  lotName: lotNamePre,
  coCode,
}: IProps) {
  const qty = batches.reduce(
    (acc, row) =>
      acc + (type === BATCH_TYPE.WET ? row.perchmentQuantity : row.quantity),
    0
  );

  const initialValues = {
    date: new Date().getTime(),
  };

  const validationSchema = Yup.object().shape({
    date: Yup.number().required(),
  });

  const handleSubmit = ({ date }) => {
    axCreateLotFromBatches({
      batchIds: batches.map(o => o.batchId),
      createdOn: local2utc().getTime(),
      timeToFactory: local2utc().getTime(),
      quantity: qty,
      coCode,
      type,
      lotName: lotNamePre + formattedDate(date),
    }).then(response => messageRedirect({ ...response, mcode: "LOT_CREATED" }));
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <div className="bx--row">
            <div className="bx--col-lg-6 bx--col-md-12">
              <h1>
                Finalize Lot: {lotNamePre + formattedDate(props.values.date)}
              </h1>
            </div>
            <div className="bx--col-lg-6 bx--col-md-12 text-right mt-3">
              <CancelButton />
              <Button kind="primary" type="submit" disabled={!props.isValid}>
                Create Lot
              </Button>
            </div>
          </div>

          <div className="bx--row">
            <div className="bx--col-lg-3 bx--col-md-12">
              <Field
                label="Creation Date"
                name="date"
                component={dateTimeInput}
                type="date"
                format="dd-MM-yyyy"
                className="mb-0"
              />
            </div>
          </div>

          <h2>Batches</h2>
          <DataTable
            keyField="batchId"
            columns={type === BATCH_TYPE.DRY ? columnsDry : columnsWet}
            noHeader={true}
            data={batches}
          />
          <h3>Total Quantity: {qty}</h3>
        </form>
      )}
    </Formik>
  );
}
