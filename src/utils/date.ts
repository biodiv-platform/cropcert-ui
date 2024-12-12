import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import RealtiveTime from "dayjs/plugin/relativeTime";
import UTCPlugin from "dayjs/plugin/utc";

dayjs.extend(duration);
dayjs.extend(CustomParseFormat);
dayjs.extend(RealtiveTime);
dayjs.extend(UTCPlugin);

const FORMAT_TIMESTAMP = "DD-MM-YYYY hh:mm A";
const FORMAT_DATE_TIMESTAMP = "DD-MM-YYYY";
const FORMAT_DATE_REVERSE = "YYYY-MM-DD";
const FORMAT_DATE_READABLE_TIMESTAMP = "D MMMM YYYY";
const FORMAT_EXIF_TIMESTAMP = "YYYY:MM:DD HH:mm:ss";

export const dateToUTC = (ts?) => (ts ? dayjs(ts).utc() : dayjs().utc());

export const parseDate = (ts) => (ts ? dayjs(ts, FORMAT_DATE_TIMESTAMP).toDate() : new Date());
export const formatDate = (ts, format = FORMAT_DATE_TIMESTAMP) => ts && dayjs(ts).format(format);
export const parseDateReverse = (ts) => ts && dayjs(ts, FORMAT_DATE_REVERSE).toDate();
export const formatDateReverse = (ts) => ts && dayjs(ts).format(FORMAT_DATE_REVERSE);
export const formatDateFromUTC = (ts) => dayjs.utc(ts).local().format(FORMAT_DATE_TIMESTAMP);
export const parseDateFromUTC = (ts) => ts && dayjs.utc(ts).local().toDate();

export const parseDateRange = (ts) => (ts ? ts.map((i) => parseDate(i)) : []);
export const formatDateRange = (ts) => (ts ? ts.map((i) => formatDate(i)) : []);

export const formatTimeStampFromUTC = (ts) => dayjs.utc(ts).local().format(FORMAT_TIMESTAMP);

export const formatDateReadableFromUTC = (ts) =>
  dayjs.utc(ts).local().format(FORMAT_DATE_READABLE_TIMESTAMP);

export const timeAgoUTC = (ts) => dayjs(ts).utc().fromNow();

export const parseEXIF = (ts) => ts && dayjs(ts, FORMAT_EXIF_TIMESTAMP).toDate();

export const formatTimeDifference = (timestamp: Date): string => {
  const lastSyncedDate = dayjs(new Date(timestamp));
  const now = dayjs();

  // Calculate the difference in seconds
  const diffInSeconds = now.diff(lastSyncedDate, "second");

  // Create a duration object
  const timeDuration = dayjs.duration(Math.abs(diffInSeconds), "seconds");

  // Format the time in HH:mm:ss
  const hours = String(timeDuration.hours()).padStart(2, "0");
  const minutes = String(timeDuration.minutes()).padStart(2, "0");
  const seconds = String(timeDuration.seconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds} ago`;
};

export default dayjs;
