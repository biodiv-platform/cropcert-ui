import { selectInput, textInput } from "@components/@core/formik";
import { axCreateBatch } from "@services/batch.service";
import { getToday, local2utc, messageRedirect } from "@utils/basic.util";
import { TYPE_OPTIONS } from "@utils/constants";
import { Button } from "carbon-components-react";
import dayjs from "dayjs";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

interface IProps {
  CCAccessible;
}

function BatchCreate({ CCAccessible }: IProps) {
  const getCCById = id => {
    return CCAccessible.find(c => c.value.toString() === id.toString());
  };

  const getTypeOptions = (id?) => {
    if (!id) {
      id = CCAccessible[0].id;
    }
    const ccType = getCCById(id);
    switch (ccType.type) {
      case "D":
        return [TYPE_OPTIONS.DRY];

      case "P":
        return [TYPE_OPTIONS.WET];

      default:
        return [TYPE_OPTIONS.DRY, TYPE_OPTIONS.WET];
    }
  };

  const [typeOptions, setTypeOptions] = useState(getTypeOptions());

  const collectForm = {
    validationSchema: Yup.object().shape({
      ccCode: Yup.string().required(),
      quantity: Yup.number()
        .min(1)
        .required(),
      date: Yup.date().required(),
    }),
    initialValues: {
      ccCode: CCAccessible[0].id,
      type: getTypeOptions()[0].value,
      quantity: 0,
      date: getToday(),
      note: "",
    },
  };

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    axCreateBatch({
      ...values,
      createdOn: local2utc(),
      batchName: `${getCCById(values.ccCode).ccName}_${dayjs(
        values.date,
        "YYYY-MM-DD"
      ).format("DD-MM-YYYY")}`,
    }).then(response =>
      messageRedirect({ ...response, mcode: "BATCH_CREATED" })
    );
  };

  return (
    <Formik
      {...collectForm}
      onSubmit={handleSubmit}
      render={props => (
        <form className="bx--form" onSubmit={props.handleSubmit}>
          <div className="bx--row">
            <div className="bx--col-lg-4 bx--col-sm-12">
              <Field
                label="Collection Center Name"
                name="ccCode"
                component={selectInput}
                options={CCAccessible}
                onChange={e => {
                  const typeOptions1 = getTypeOptions(e.target.value);
                  props.setFieldValue("ccCode", e.target.value);
                  props.setFieldValue("type", typeOptions1[0].value);
                  setTypeOptions(typeOptions1);
                }}
              />
            </div>
            <div className="bx--col-lg-4 bx--col-sm-12">
              <Field
                label="Date"
                name="date"
                component={textInput}
                type="date"
                max={getToday()}
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
            <div className="bx--col-lg-4 bx--col-sm-12">
              <Field
                label="Batch Type"
                name="type"
                component={selectInput}
                options={typeOptions}
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
