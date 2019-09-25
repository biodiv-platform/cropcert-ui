import loadable from "@loadable/component";
import React from "react";

const Editor = loadable(() => import("@components/@core/wysiwyg"));

const wysiwygInput = ({
  field,
  form: { touched, errors, setFieldValue },
  label,
}) => {
  const hasErrors = touched[field.name] && errors[field.name];

  const onEditorValueChange = v => setFieldValue(field.name, v);

  return (
    <fieldset className="bx--fieldset">
      <div className="bx--form-item">
        <label className="bx--label">{label}</label>
        <Editor data={field.value} onUpdate={onEditorValueChange} />
        {hasErrors && (
          <div className="bx--form-requirement">{errors[field.name]}</div>
        )}
      </div>
    </fieldset>
  );
};

export default wysiwygInput;
