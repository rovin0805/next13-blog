import readingTime from "reading-time";
import { DateTime } from "luxon";

export const getReadingTime = (text: string, locale: string) => {
  const minutes = readingTime(text).minutes;
  const minutesRounded = Math.floor(minutes);

  if (locale === "kr") {
    return `${minutesRounded}분 읽기`;
  } else {
    if (minutesRounded === 1) {
      return `${minutesRounded} minute`;
    } else {
      return `${minutesRounded} minutes`;
    }
  }
};

export const getRelativeTime = (date: string, locale: string) => {
  return DateTime.fromISO(date).setLocale(locale).toRelative();
};
