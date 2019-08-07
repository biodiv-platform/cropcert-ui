import { formattedTimeStamp, utc2local } from "@utils/basic.util";

export default function TimeCell(value) {
  return value ? formattedTimeStamp(utc2local(value)) : "NA";
}
