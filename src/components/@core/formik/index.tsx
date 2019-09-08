import { local2utc, utc2local } from "@utils/basic.util";
import { DATEFORMATS } from "@utils/constants";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

export const textInput = ({ field, form: { errors }, label, ...props }) => {
  return (
    <fieldset className="bx--fieldset">
      <div className="bx--form-item">
        <label className="bx--label">{label}</label>
        <input
          type="text"
          id={field.name}
          autoComplete="off"
          className="bx--text-input"
          placeholder={`Enter ${label}`}
          {...field}
          {...props}
          {...(errors[field.name] && { "data-invalid": true })}
        />
        {errors[field.name] && (
          <div className="bx--form-requirement">{errors[field.name]}</div>
        )}
      </div>
    </fieldset>
  );
};

export const dateInput = ({
  field,
  form: { errors, setFieldValue },
  label,
  ...props
}) => {
  const [dateValue, setDate] = useState(utc2local(field.value));

  useEffect(() => {
    setFieldValue(field.name, local2utc(dateValue).getTime());
  }, [dateValue]);

  return (
    <fieldset className="bx--fieldset">
      <div className="bx--form-item">
        <label className="bx--label">{label}</label>
        <DatePicker
          selected={dateValue}
          onChange={setDate}
          className="bx--text-input"
          autocomplete="off"
          timeIntervals={15}
          dateFormat={DATEFORMATS.DATE}
          minDate={
            props.hasOwnProperty("min") ? utc2local(props.min) : undefined
          }
          maxDate={
            props.hasOwnProperty("max") ? utc2local(props.max) : new Date()
          }
        />
        {errors[field.name] && (
          <div className="bx--form-requirement">{errors[field.name]}</div>
        )}
      </div>
    </fieldset>
  );
};

export const dateTimeInput = ({
  field,
  form: { errors, setFieldValue },
  label,
  ...props
}) => {
  const [dateTime, setDateTime] = useState(utc2local(field.value));

  useEffect(() => {
    setFieldValue(field.name, local2utc(dateTime).getTime());
  }, [dateTime]);

  const min = props.hasOwnProperty("min") ? utc2local(props.min) : undefined;
  const max = props.hasOwnProperty("max") ? utc2local(props.max) : new Date();

  return (
    <fieldset className="bx--fieldset">
      <div className="bx--form-item">
        <label className="bx--label">
          {label}
          {props.hasOwnProperty("max") ? "t" : "f"}
        </label>
        <DatePicker
          selected={dateTime}
          onChange={setDateTime}
          className="bx--text-input"
          autocomplete="off"
          showTimeSelect={true}
          timeIntervals={15}
          timeFormat={DATEFORMATS.TIME}
          dateFormat={DATEFORMATS.DATETIME}
          minDate={min}
          minTime={min}
          maxDate={max}
          maxTime={max}
        />
        {errors[field.name] && (
          <div className="bx--form-requirement">{errors[field.name]}</div>
        )}
      </div>
    </fieldset>
  );
};

export const textAreaInput = ({
  field,
  form: { touched, errors },
  label,
  ...props
}) => {
  const hasErrors = touched[field.name] && errors[field.name];
  return (
    <fieldset className="bx--fieldset">
      <div className="bx--form-item">
        <label className="bx--label">{label}</label>
        <div className="bx--text-area__wrapper" style={{ width: "100%" }}>
          <textarea
            placeholder={`Enter ${label}`}
            className="bx--text-area"
            id={field.name}
            style={{ width: "100%" }}
            {...field}
            {...props}
            {...(hasErrors ? { "data-invalid": true } : {})}
          />
          {hasErrors && (
            <div className="bx--form-requirement">{errors[field.name]}</div>
          )}
        </div>
      </div>
    </fieldset>
  );
};

export const selectInput = ({
  field,
  form: { touched, errors },
  label,
  options,
  ...props
}) => {
  const hasErrors = touched[field.name] && errors[field.name];
  return (
    <fieldset className="bx--fieldset">
      <div className="bx--form-item">
        <div className="bx--select eco--w100">
          <label className="bx--label">{label}</label>
          <div className="bx--select-input__wrapper">
            <select
              id={field.name}
              className="bx--select-input eco--w100"
              {...field}
              {...props}
              {...(hasErrors ? { "data-invalid": true } : {})}
            >
              {options.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <svg
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              style={{ willChange: "transform" }}
              xmlns="http://www.w3.org/2000/svg"
              className="bx--select__arrow"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              aria-hidden="true"
            >
              <path d="M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z" />
            </svg>
          </div>
          {hasErrors && (
            <div className="bx--form-requirement">{errors[field.name]}</div>
          )}
        </div>
      </div>
    </fieldset>
  );
};
