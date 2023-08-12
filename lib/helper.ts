import readingTime from "reading-time";
import { DateTime } from "luxon";

export const getReadingTime = (text: string) => {
  return readingTime(text).text;
};

export const getRelativeTime = (date: string) => {
  return DateTime.fromISO(date).toRelative();
};
