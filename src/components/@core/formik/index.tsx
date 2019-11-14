import { formattedTimeStamp, local2utc, utc2local } from "@utils/basic.util";
import { Dropdown, TextInput } from "carbon-components-react";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import Select from "react-select";

export const textInput = ({
  field,
  form: { errors },
  label,
  type = "text",
  hint = false,
  ...props
}) => {
  return (
    <TextInput
      id={field.name}
      autoComplete="off"
      placeholder={`Enter ${label}`}
      labelText={label}
      type={type}
      {...field}
      {...props}
      {...(errors[field.name] && {
        invalid: true,
        invalidText: errors[field.name],
      })}
    />
  );
};

export const numberInput = ({
  field,
  form: { errors },
  label,
  hint = false,
  ...props
}) => {
  let helperText = "";

  if (hint) {
    if (props && props.min && props.max) {
      helperText = `Minimum ${props.min} and ${props.max}`;
    } else if (props && props.max) {
      helperText = `Maximum ${props.max}`;
    } else if (props && props.min) {
      helperText = `Minimum ${props.max}`;
    }
  }

  return (
    <TextInput
      type="number"
      id={field.name}
      autoComplete="off"
      placeholder={`Enter ${label}`}
      labelText={label}
      {...field}
      {...props}
      {...(hint && { helperText })}
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
  hint = false,
  disabled = false,
  className = ``,
  format = "dd-MM-yyyy H:mm",
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
    <div className={`bx--form-item ${className}`}>
      <label className="bx--label">{label}</label>
      {hint && (
        <div className="bx--form__helper-text">
          Provide date and time between
          <br />
          {minDate && formattedTimeStamp(minDate)}
          {minDate && maxDate && " - "}
          {maxDate && formattedTimeStamp(maxDate)}
        </div>
      )}
      <DateTimePicker
        className="bx--text-input"
        onChange={setDateTimeValue}
        value={dateTimeValue}
        autoComplete={false}
        format={format}
        required={true}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        clearIcon={null}
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
  const [selectFieldValue, setSelectFieldValue] = useState(field);

  useEffect(() => {
    setFieldValue(field.name, selectFieldValue.value);
  }, [selectFieldValue]);

  useEffect(() => {
    if (options.length === 1) {
      setSelectFieldValue(options[0]);
    }
  }, [options]);

  return (
    <Dropdown
      id={field.name}
      items={options}
      label={`Select ${label}`}
      titleText={label}
      ariaLabel={field.name}
      selectedItem={selectFieldValue.label}
      disabled={options.length < 1}
      onChange={e => {
        setSelectFieldValue(e.selectedItem);
      }}
      {...props}
      {...(errors[field.name] && { invalid: true })}
      {...(hasErrors && { invalidText: errors[field.name] })}
    />
  );
};

export const tagSelectInput = ({ options, field, form }) => {
  return (
    <>
      <label className="bx--label">{field.label}</label>
      <Select
        isMulti={true}
        options={options}
        name={field.name}
        value={
          options
            ? options.filter(option => field.value.includes(option.value))
            : []
        }
        onChange={option =>
          form.setFieldValue(field.name, option ? option.map(o => o.value) : [])
        }
        onBlur={field.onBlur}
        styles={{
          control: styles => ({
            ...styles,
            background: "#f4f4f4",
            border: 0,
            boxShadow: "none",
            borderBottom: "1px solid #8d8d8d",
            borderRadius: 0,
          }),
        }}
      />
    </>
  );
};

export const Divider = () => <hr className="form--divider" />;
