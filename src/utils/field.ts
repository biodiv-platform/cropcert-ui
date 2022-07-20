import { CastType } from "types/custom";

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

/**
 * chakra-ui converts all radio and checkbox group values to string type so to restore this needs to be done
 *
 * @param {*} value
 * @param {*} type
 * @return {*}
 */
export const typeCastMulti = (value, type?: CastType) => {
  if (!value) return value;

  try {
    return value.map((_value) => typeCastSingle(_value, type));
  } catch (e) {
    console.error(e);
    return value;
  }
};
