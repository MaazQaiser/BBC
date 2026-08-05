/** Shared dealership contact details — top bar, nav, footer, contact page */
export const SITE_CONTACT = {
  phone:        "0161 400 0000",
  phoneHref:    "tel:+441614000000",
  whatsappHref: "https://wa.me/441614000000",
  email:        "hello@burybargaincars.co.uk",
  emailHref:    "mailto:hello@burybargaincars.co.uk",
  addressLine1: "123 Bury New Road",
  addressLine2: "Bury, BL9 0AA",
  location:     "Bury, Manchester",
  directionsHref:
    "https://maps.google.com/?q=123+Bury+New+Road,+Bury,+BL9+0AA",
  hours:        "Mon–Sat: 9:00 AM – 6:00 PM",
} as const;

export const OPENING_HOURS = [
  { day: "Monday – Friday", time: "9:00am – 6:00pm" },
  { day: "Saturday",        time: "9:00am – 5:00pm" },
  { day: "Sunday",          time: "Closed"           },
] as const;
