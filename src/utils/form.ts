import * as Yup from "yup";

export const yupSchemaMapping = {
  "Yup.number()": Yup.number().nullable(),
  "Yup.string()": Yup.string().nullable(),
  numberFunc: function (min, max) {
    return Yup.number().min(min).max(max).nullable();
  },
  // Add more mappings for other Yup schema strings as needed
};
