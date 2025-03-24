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
  "Yup.string().required()": Yup.string().required("This field is required").nullable(),
  "Yup.number().min(1).required()": Yup.number()
    .min(1, "Value must be at least 1")
    .required("This field is required")
    .nullable(),
  "Yup.number().min(1).max(total_quantity_kgs)": Yup.number()
    .min(1)
    .max(Yup.ref("total_quantity_kgs"), "Field cannot be greater than Total Quantity in Kgs")
    .nullable(),
  "Yup.boolean()": Yup.boolean().nullable(),
  numberFunc: (min, max) =>
    Yup.number()
      .min(min)
      .max(max)
      .nullable()
      .transform((value, originalValue) => (originalValue === "" ? undefined : value)),
  maxBatchQuantity: (quantity) =>
    Yup.number().min(1).max(quantity, "Field cannot exceed Batch Quantity").nullable(),
  net_weight_kgs: Yup.number()
    .min(1, "Net weight must be at least 1")
    .required("Net weight is required")
    .test(
      "greaterThanOrEqualTotalKgs",
      "Net weight must be greater than or equal to the sum of all section total kgs",
      function (value) {
        const {
          sc18_total_kgs = 0,
          sc15_total_kgs = 0,
          sc14_total_kgs = 0,
          sc12_total_kgs = 0,
          undergrade_total_kgs = 0,
        } = this.parent;

        const totalSectionKgs =
          Number(sc18_total_kgs || 0) +
          Number(sc15_total_kgs || 0) +
          Number(sc14_total_kgs || 0) +
          Number(sc12_total_kgs || 0) +
          Number(undergrade_total_kgs || 0);

        return Number(value) >= totalSectionKgs;
      }
    ),
  grossWeightValid: Yup.number()
    .min(1)
    .required()
    .test(
      "gross-weight-valid",
      "Gross Weight must be less than or equal to Total Kgs",
      function (value) {
        return Number(value) <= this.parent.total_kgs;
      }
    ),
};
