import { FormControl, FormLabel } from "@chakra-ui/react";
import { axListUnion } from "@services/union.service";
import React, { useEffect, useState } from "react";
import Select from "react-select";

/**
 * Union Picker Component for Unauthorised Pages
 *
 * @export
 * @param {*} { onChange }
 * @return {*}
 */
export default function PlainUnionSelect({ onChange }) {
  const [unions, setUnions] = useState([] as any);

  const getAllUnions = async () => {
    const { success, data } = await axListUnion();
    if (success) {
      const options = data.map((u) => ({ label: u.name, value: u.code }));
      setUnions(options);
      onChange(options[0]);
    }
  };

  useEffect(() => {
    getAllUnions();
  }, []);

  return (
    <div>
      <FormControl mb={4} maxW="308px">
        <FormLabel htmlFor="union">Select Union</FormLabel>
        {unions.length > 0 && (
          <Select
            id="union"
            options={unions}
            isSearchable={true}
            onChange={onChange}
            defaultValue={unions[0]}
            styles={{
              valueContainer: (provided) => ({
                ...provided,
                height: "38px",
              }),
            }}
          />
        )}
      </FormControl>
    </div>
  );
}
