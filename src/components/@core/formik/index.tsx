import { formattedTimeStamp, local2utc, utc2local } from "@utils/basic.util";
import { Dropdown, TextInput } from "carbon-components-react";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";

export const textInput = ({ field, form: { errors }, label, ...props }) => {
  return (
    <TextInput
      type="text"
      id={field.name}
      autoComplete="off"
      placeholder={`Enter ${label}`}
      labelText={label}
      {...field}
      {...props}
      {...(errors[field.name] && {
        invalid: true,
        invalidText: errors[field.name],
      })}
    />
  );
};

export const dateTimeInput = ({
  field,
  form: { touched, errors, setFieldValue },
  label,
  hint = true,
  disabled = false,
  ...props
}) => {
  const hasErrors = touched[field.name] && errors[field.name];
  const [dateTimeValue, setDateTimeValue] = useState(utc2local(field.value));

  useEffect(() => {
    setFieldValue(field.name, local2utc(dateTimeValue).getTime());
  }, [dateTimeValue]);

  const minDate = props.hasOwnProperty("min")
    ? utc2local(props.min)
    : undefined;
  const maxDate = props.hasOwnProperty("max")
    ? utc2local(props.max)
    : new Date();

  return (
    <div className="bx--form-item">
      {hint ? (
        <div className="bx--form__helper-text">
          Provide date and time between
          <br />
          {minDate && formattedTimeStamp(minDate)}
          {minDate && maxDate && " - "}
          {maxDate && formattedTimeStamp(maxDate)}
        </div>
      ) : (
        <label className="bx--label">{label}</label>
      )}
      <DateTimePicker
        className="bx--text-input"
        onChange={setDateTimeValue}
        value={dateTimeValue}
        autoComplete={false}
        format="dd-MM-yyyy H:mm"
        required={true}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
      />
      {hasErrors && (
        <div className="bx--form-requirement">{errors[field.name]}</div>
      )}
    </div>
  );
};

export const selectInput = ({
  field,
  form: { touched, errors, setFieldValue },
  label,
  options,
  ...props
}) => {
  const hasErrors = touched[field.name] && errors[field.name];
  return (
    <Dropdown
      id={field.name}
      items={options}
      label={`Select ${label}`}
      titleText={label}
      ariaLabel={field.name}
      disabled={options.length < 1}
      onChange={e => {
        setFieldValue(field.name, e.selectedItem.value);
      }}
      {...props}
      {...(hasErrors && { invalid: true, invalidText: errors[field.name] })}
    />
  );
};

export const Divider = () => <hr className="form--divider" />;
