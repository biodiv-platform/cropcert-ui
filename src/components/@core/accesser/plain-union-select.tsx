import { Skeleton } from "@chakra-ui/react";
import { axListUnion } from "@services/entities.service";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import { Field } from "@/components/ui/field";

/**
 * Union Picker Component for Unauthorised Pages
 *
 * @export
 * @param {*} { onChange }
 * @return {*}
 */
export default function PlainUnionSelect({ onChange, maxW = "308px" }) {
  const [unions, setUnions] = useState<any>();

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
      <Field mb={4} maxW={maxW}>
        <Field htmlFor="union">Select union</Field>
        {unions ? (
          <Select
            id="union"
            options={unions}
            isSearchable={true}
            onChange={onChange}
            defaultValue={unions[0]}
            components={{ IndicatorSeparator: () => null }}
            styles={{
              valueContainer: (provided) => ({
                ...provided,
                height: "38px",
              }),
            }}
          />
        ) : (
          <Skeleton height="38px" />
        )}
      </Field>
    </div>
  );
}
