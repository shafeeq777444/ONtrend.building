export const fallbackCancellation = [
  "Free cancellation within 24 hours of booking.",
  "50% refund if canceled at least 7 days before check-in.",
  "25% refund if canceled between 3–7 days before check-in.",
  "No refund if canceled within 3 days of check-in.",
  "Reservation can be rescheduled once, subject to availability.",
  "In case of a no-show, no refund will be provided.",
  "Refunds are processed within 5–7 business days.",
  "Cancellations due to natural disasters may be exempt from penalties (with proof)."
];


export const fallbackAdditional = [
  "No pets allowed inside the building.",
  "No smoking allowed inside rooms or hallways.",
  "Valid government-issued ID required at check-in.",
  "Loud music or parties are strictly prohibited.",
  "Visitors are not allowed after 10:00 PM.",
  "Guests must respect quiet hours between 10 PM and 7 AM.",
  "Loss or damage to property may result in extra charges.",
  "Check-out after 11:00 AM will incur a half-day charge.",
  "Unregistered guests are not permitted to stay overnight.",
  "Alcohol consumption is not allowed in public areas.",
  "Guests are responsible for their own belongings.",
  "Any violations may lead to booking cancellation without refund."
];





export const silverMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "on" }], // ✅ show icons
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "on" }], // ✅ show land parcels
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "on" }], // ✅ show POIs
  },
  {
    featureType: "road",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "on" }], // ✅ show transit
  },
  {
    featureType: "water",
    stylers: [{ color: "#c9c9c9" }],
  },
];
