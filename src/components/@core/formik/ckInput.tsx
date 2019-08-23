import { getBearerToken } from "@utils/http";
import React, { useState, useEffect } from "react";

import Editor from "../editor";

const ckInput = ({
  field,
  form: { touched, errors, setFieldValue },
  label,
}) => {
  const hasErrors = touched[field.name] && errors[field.name];
  const [bearerToken, setBearerToken] = useState();

  useEffect(() => {
    getBearerToken().then(setBearerToken);
  }, []);

  const onEditorValueChange = v => setFieldValue(field.name, v);

  return (
    <fieldset className="bx--fieldset">
      <div className="bx--form-item">
        <label className="bx--label">{label}</label>
        {bearerToken && (
          <Editor data={field.value} token={bearerToken} onUpdate={onEditorValueChange} />
        )}
        {hasErrors && (
          <div className="bx--form-requirement">{errors[field.name]}</div>
        )}
      </div>
    </fieldset>
  );
};

export default ckInput;
