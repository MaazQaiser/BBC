import { SITE_NAME } from "@/lib/site-brand";

/** Shared dealership contact details — top bar, nav, footer, contact page */
export const SITE_CONTACT = {
  name:         SITE_NAME,
  phone:        "0161 400 0000",
  phoneHref:    "tel:+441614000000",
  whatsappHref: "https://wa.me/441614000000",
  email:        "hello@manchestercaryard.co.uk",
  emailHref:    "mailto:hello@manchestercaryard.co.uk",
  addressLine1: "123 Bury New Road",
  addressLine2: "Bury, BL9 0AA",
  area:         "Bury, Greater Manchester",
  location:     "Bury, Manchester",
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=123+Bury+New+Road,+Bury,+BL9+0AA",
  hours:        "Mon–Fri 9–6, Sat 9–5",
} as const;

/** Fixed yard location — used for maps and directions */
export const SITE_LOCATION = {
  lat: 53.4968,
  lng: -2.5149,
  parkingNote:
    "Customer parking is available at the front of the yard. Enter via Bury New Road.",
  travelTimes: [
    { from: "Bolton", time: "20 mins" },
    { from: "Manchester city centre", time: "30 mins" },
  ],
} as const;

export const OPENING_HOURS = [
  { day: "Monday – Friday", time: "9:00am – 6:00pm" },
  { day: "Saturday",        time: "9:00am – 5:00pm" },
  { day: "Sunday",          time: "Closed"           },
] as const;
