import { OPENING_HOURS } from "@/lib/site-contact";

const DAY_INDEX = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

type Weekday = (typeof DAY_INDEX)[number];

const DAY_MAP: Record<
  Weekday,
  { open: string | null; close: string | null }
> = {
  monday:    { open: "9:00am", close: "6:00pm" },
  tuesday:   { open: "9:00am", close: "6:00pm" },
  wednesday: { open: "9:00am", close: "6:00pm" },
  thursday:  { open: "9:00am", close: "6:00pm" },
  friday:    { open: "9:00am", close: "6:00pm" },
  saturday:  { open: "9:00am", close: "5:00pm" },
  sunday:    { open: null, close: null },
};

function parseTime12h(time: string): { hours: number; minutes: number } | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})(am|pm)$/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toLowerCase();
  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;
  return { hours, minutes };
}

function formatCloseLabel(time: string): string {
  return time.replace(":00", "");
}

/** Human-readable open status — e.g. "Open until 6pm today" */
export function getTodayOpenStatus(now = new Date()): string {
  const key = DAY_INDEX[now.getDay()];
  const schedule = DAY_MAP[key];

  if (key === "sunday") return "Closed today";

  const open = schedule.open ? parseTime12h(schedule.open) : null;
  const close = schedule.close ? parseTime12h(schedule.close) : null;
  if (!open || !close) return "Closed today";

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = open.hours * 60 + open.minutes;
  const closeMinutes = close.hours * 60 + close.minutes;

  if (currentMinutes < openMinutes) {
    return `Opens at ${schedule.open} today`;
  }

  if (currentMinutes >= closeMinutes) {
    return "Closed for today";
  }

  return `Open until ${formatCloseLabel(schedule.close ?? "")} today`;
}

export { OPENING_HOURS };
