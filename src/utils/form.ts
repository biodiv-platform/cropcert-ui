import * as Yup from "yup";

export const yupSchemaMapping = {
  "Yup.number()": Yup.number().nullable().typeError("Field must be a number"),
  "Yup.number().min(1)": Yup.number().min(1).nullable(),
  "Yup.number().min(1).max(weight_arriving_factory)": Yup.number()
    .min(1)
    .max(Yup.ref("weight_arriving_factory"), "Field cannot be greater than Weight Arriving Factory")
    .nullable(),
  "Yup.number().min(1).max(input_FAQ_weight)": Yup.number()
    .min(1)
    .max(Yup.ref("input_FAQ_weight"), "Field cannot be greater than Input FAQ Weight")
    .nullable(),
  "Yup.number().min(1).max(input_FAQ_moisture_content)": Yup.number()
    .min(1)
    .max(
      Yup.ref("input_FAQ_moisture_content"),
      "Field cannot be greater than Input Moisture Content"
    )
    .nullable(),
  "Yup.string()": Yup.string().nullable(),
  numberFunc: (min, max) => Yup.number().min(min).max(max).nullable(),
  maxBatchQuantity: (quantity) =>
    Yup.number().min(1).max(quantity, "Field cannot exceed Batch Quantity").nullable(),
  // Add more mappings for other Yup schema strings as needed
};
