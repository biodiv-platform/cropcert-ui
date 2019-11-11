import { DATATYPE } from "@utils/constants";
import { ComposedModal, ModalHeader } from "carbon-components-react";
import { Field, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import { dateTimeInput, numberInput, textInput } from "../formik";

export default function GenricModal({
  row,
  keyName,
  keyTitle,
  keyId,
  isOpen = false,
  onClose,
  dataType = DATATYPE.TEXT,
  ...props
}) {
  const form = {
    validationSchema: Yup.object().shape({
      value:
        dataType === DATATYPE.TEXT
          ? Yup.string().required()
          : dataType === DATATYPE.DATETIME
          ? Yup.number().required()
          : Yup.number()
              .min(1)
              .max(props.max || Infinity),
    }),
    initialValues: {
      value: row[keyName],
    },
  };

  const submitForm = (values, actions) => {
    actions.setSubmitting(false);
    onClose(true, keyName, {
      [keyName]: values.value,
      id: row[keyId],
    });
  };

  const getComponent = () => {
    if (dataType === DATATYPE.DATETIME) {
      return dateTimeInput;
    } else if (dataType === DATATYPE.NUMBER) {
      return numberInput;
    }
    return textInput;
  };

  return form && isOpen ? (
    <ComposedModal id="1" open={isOpen} onClose={onClose}>
      <ModalHeader title={`Update ${keyTitle}`} closeModal={onclose} />
      <Formik
        {...form}
        enableReinitialize={true}
        onSubmit={submitForm}
        render={({ handleSubmit, isValid }) => {
          return (
            <form className="bx--form" onSubmit={handleSubmit}>
              <div className="eco--modal-container">
                <div className="bx--row">
                  <div className="bx--col-lg-6 bx--col-sm-12">
                    <Field
                      label={keyTitle}
                      name="value"
                      component={getComponent()}
                      hint={true}
                      isValid={isValid}
                      {...props}
                    />
                  </div>
                </div>
              </div>
              <div className="bx--modal-footer">
                <button
                  className="bx--btn bx--btn--primary"
                  disabled={!isValid}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          );
        }}
      />
    </ComposedModal>
  ) : (
    <></>
  );
}
