import React from "react";
import Select from "react-select";

const SelectInputField = ({ name, options, label, shouldPortal, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <Select
        name={name}
        options={options}
        value={value}
        isClearable={true}
        isMulti={true}
        isSearchable={true}
        menuPortalTarget={shouldPortal ? document.body : null}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectInputField;
