import { CastType } from "@interfaces/custom";

export const namedFormErrorMessage = (message, name, title) =>
  title ? message?.replace("[", ".").replace("]", "")?.replace(name, title) : message;

export const typeCastSingle = (value, type?: CastType) => {
  try {
    switch (type) {
      case "number":
      case "boolean":
      case "object":
        return JSON.parse(value);

      default:
        return value;
    }
  } catch (e) {
    // console.error(e);
    return value;
  }
};
