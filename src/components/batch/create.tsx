import Accesser from "@components/@core/accesser";
import {
  dateTimeInput,
  selectInput,
  textInput,
} from "@components/@core/formik";
import { axCreateBatch } from "@services/batch.service";
import { local2utc, messageRedirect } from "@utils/basic.util";
import { DATEFORMATS, ROLES, TYPE_OPTIONS } from "@utils/constants";
import { Button } from "carbon-components-react";
import dayjs from "dayjs";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

function BatchCreate() {
  const [cc, setCc] = useState();
  const [ccCode, setccCode] = useState();

  const [typeOptions, setTypeOptions] = useState([] as any);

  useEffect(() => {
    if (cc) {
      if (cc.type === "D") {
        setTypeOptions([TYPE_OPTIONS.DRY]);
      } else if (cc.type === "P") {
        setTypeOptions([TYPE_OPTIONS.WET]);
      } else {
        setTypeOptions([TYPE_OPTIONS.DRY, TYPE_OPTIONS.WET]);
      }
      setccCode(cc.value);
    }
  }, [cc]);

  const collectForm = {
    validationSchema: Yup.object().shape({
      ccCode: Yup.string().required(),
      quantity: Yup.number()
        .min(1)
        .required(),
      date: Yup.number().required(),
    }),
    initialValues: {
      ccCode,
      type: undefined,
      quantity: 0,
      date: new Date().getTime(),
      note: "",
    },
  };

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    axCreateBatch({
      ...values,
      createdOn: local2utc().getTime(),
      batchName: `${cc.label}_${dayjs(values.date).format(
        DATEFORMATS.DAYJS_DATE
      )}`,
    }).then(response =>
      messageRedirect({ ...response, mcode: "BATCH_CREATED" })
    );
  };

  return (
    <Formik
      {...collectForm}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      render={props => (
        <form className="bx--form" onSubmit={props.handleSubmit}>
          <div className="bx--row">
            <Accesser toRole={ROLES.COLLECTION_CENTER} onChange={setCc} />
          </div>
          <div className="bx--row">
            <div className="bx--col-lg-4 bx--col-sm-12">
              <Field
                label="Batch Type"
                name="type"
                component={selectInput}
                options={typeOptions}
              />
            </div>
            <div className="bx--col-lg-4 bx--col-sm-12">
              <Field
                label="Date"
                name="date"
                component={dateTimeInput}
                hint={false}
                type="date"
              />
            </div>
          </div>
          <div className="bx--row">
            <div className="bx--col-lg-4 bx--col-sm-12">
              <Field
                label="Quantity"
                name="quantity"
                component={textInput}
                type="number"
              />
            </div>
          </div>
          <div className="bx--row">
            <div className="bx--col-lg-8 bx--col-sm-12">
              <Field
                label="Note"
                name="note"
                component={textInput}
                type="text"
              />
            </div>
          </div>
          <Button type="submit" disabled={!props.isValid}>
            Create Batch
          </Button>
        </form>
      )}
    />
  );
}

export default BatchCreate;
