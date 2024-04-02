import * as yup from "yup";

const schema = yup.object().shape({
  farmerName: yup.string().required("Farmer Name is required"),
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup.date().required("DOB is required"),
  contactNumber: yup
    .string()
    .nullable()
    .matches(/^\d{10}$/, "Contact number must be exactly 10 digits"),
  nationalIdentityNumber: yup
    .string()
    .nullable()
    .matches(/^[\dA-Za-z]{14}$/, "National identity number must be exactly 14 digits"),
  levelOfEducation: yup.string(),
  noOfDependents: yup.number(),
  village: yup.string(),
  cc: yup.string().required("CC Name is required"),
  landAcreage: yup.number().min(1, "Land acreage must be greater than zero"),
  coffeeAcreage: yup
    .number()
    .min(0.01, "Coffee acreage must be greater than zero")
    .test(
      "lessThanLandAcreage",
      "Coffee acreage must be less than land acreage",
      function (value: number) {
        const { landAcreage } = this.parent;
        return value <= landAcreage;
      }
    ),
  noOfCoffeeTrees: yup.number(),
  agroforestry: yup.string(),
  instanceID: yup.string(),
  instanceName: yup.string(),
  submittedOnODK: yup.date(),
  submitterName: yup.string(),
  formVersion: yup.string(),
  edits: yup.string(), // TODO: convert to number in the backend
  ccCode: yup.number(),
  coCode: yup.number(),
  unionCode: yup.number(),
});

export default schema;
