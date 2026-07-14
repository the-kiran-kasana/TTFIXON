// Static content that drives the user homepage.
// Swap these arrays for API responses later — component props stay the same.

export const CITY_NAME = "Delhi NCR";
export const CURRENT_ADDRESS = "A-21, Lakshmi Nagar, New Delhi 110092";

export const CATEGORY_TILES = [
  { id: "electrician", label: "Electrician", emoji: "⚡", href: "/user/delhi-ncr/electrician" },
  { id: "plumbing", label: "Plumbing", emoji: "🔧", href: "/user/delhi-ncr/plumbing" },
];

export const HERO_IMAGES = [
  { id: 1, image: "/hero/electrician.jpg", title: "Electrician at work" },
  { id: 2, image: "/hero/acRepair.png", title: "Electrical repair service" },
  { id: 3, image: "/hero/plumbing.jpg", title: "Professional plumbing service" },
  { id: 4, image: "/hero/plbRepair.png", title: "Plumbing repair service" },
];

export const SPOTLIGHT = [
  {
    id: "leak-repair",
    tag: null,
    title: "Fix leaks before they get worse",
    subtitle: "Plumbing repair",
    cta: "Book now",
    img: "/images/spotlight/Plumbing repair.jpg",
  },
  {
    id: "switchboard-repair",
    tag: null,
    title: "Safe switchboard repair at your doorstep",
    subtitle: "Electrician service",
    cta: "Book now",
    img: "/images/spotlight/Electrician service.jpg",
  },
  {
    id: "bathroom-fitting",
    tag: null,
    title: "Install new taps and bathroom fittings",
    subtitle: "Plumbing installation",
    cta: "Book now",
    img: "/images/spotlight/bathroom fittings.jpg",
  },
];

export const NOTEWORTHY = [
  { id: "emergency-plumber", label: "Emergency plumbing", badge: "Popular", img: "/images/New_noteworthy/Emergency plumbing.jpg" },
  { id: "fan-installation", label: "Ceiling fan installation", img: "/images/New_noteworthy/Ceiling fan installation.jpg" },
  { id: "tap-repair", label: "Tap & mixer repair", img: "/images/New_noteworthy/Tap & mixer repair.jpg" },
  { id: "socket-repair", label: "Socket & switch repair", img: "/images/New_noteworthy/Socket & switch repair.jpg" },
  { id: "drain-cleaning", label: "Drain blockage repair", img: "/images/New_noteworthy/Drain blockage repair.jpg" },
  { id: "wiring-repair", label: "Switchboard & wiring", img: "/images/New_noteworthy/Switchboard & wiring.jpg" },
];

export const MOST_BOOKED = [
  { id: "mb1", name: "Plumber visit", rating: 4.8, price: 99, img: "/images/Most_booked_services/Plumber visit.jpg" },
  { id: "mb2", name: "Electrician visit", rating: 4.78, price: 99, instant: true, img: "/images/Most_booked_services/Electrician visit.jpg" },
  { id: "mb3", name: "Tap & mixer repair", rating: 4.76, price: 149, img: "/images/Most_booked_services/Tap & mixer repair.jpg" },
  { id: "mb4", name: "Fan installation", rating: 4.82, price: 199, instant: true, img: "/images/Most_booked_services/Fan installation.jpg" },
  { id: "mb5", name: "Drain blockage repair", rating: 4.75, price: 199, img: "/images/Most_booked_services/Drain blockage repair.jpg" },
];

export const BANNERS = {
  "emergency-plumbing": {
    heading: "Plumbing help when you need it",
    sub: "Book a verified plumber for leaks, blockages and repairs",
    cta: "Book a plumber",
    bg: "bg-[#e4f4fb]",
    text: "text-stone-900",
    emoji: "🚰",
  },
  "electrical-safety": {
    heading: "Keep your home electrically safe",
    sub: "Expert help for switches, fans, lights and wiring",
    cta: "Book an electrician",
    tag: "Safe home service",
    bg: "bg-[#fff3d9]",
    text: "text-stone-900",
    emoji: "⚡",
  },
  "bathroom-plumbing": {
    heading: "Upgrade your bathroom fittings",
    sub: "Tap, shower and flush-tank installation by experts",
    cta: "Explore plumbing",
    bg: "bg-[#e8f6f4]",
    text: "text-stone-900",
    emoji: "🚿",
  },
  "electrical-installation": {
    heading: "Install lights and fans with confidence",
    sub: "Professional electrical installation at your doorstep",
    cta: "Explore electrical",
    tag: "Trusted professionals",
    bg: "bg-[#1f2937]",
    text: "text-white",
    dark: true,
    emoji: "💡",
  },
};

export const RAILS = {
  "plumbing-services": {
    title: "Plumbing services",
    subtitle: "Repairs, installations and quick fixes for your home",
    items: [
      { id: "p1", name: "Plumber visit", rating: 4.8, price: 99, emoji: "🚰" },
      { id: "p2", name: "Tap & mixer repair", rating: 4.76, price: 149, emoji: "🚿" },
      { id: "p3", name: "Drain blockage repair", rating: 4.75, price: 199, emoji: "🪠" },
      { id: "p4", name: "Flush tank repair", rating: 4.79, price: 179, emoji: "🚽" },
      { id: "p5", name: "Water leakage repair", rating: 4.81, price: 199, instant: true, emoji: "💧" },
    ],
  },
  "electrical-services": {
    title: "Electrical services",
    subtitle: "Reliable help for your everyday electrical needs",
    items: [
      { id: "e1", name: "Electrician visit", rating: 4.78, price: 99, instant: true, emoji: "⚡" },
      { id: "e2", name: "Fan installation", rating: 4.82, price: 199, emoji: "🌀" },
      { id: "e3", name: "Switch & socket repair", rating: 4.77, price: 149, emoji: "🔌" },
      { id: "e4", name: "Light installation", rating: 4.8, price: 149, emoji: "💡" },
      { id: "e5", name: "Minor wiring repair", rating: 4.74, price: 199, instant: true, emoji: "🛠️" },
    ],
  },
  "home-repair": {
    title: "Home repair & installation",
    items: [
      { id: "h1", name: "Bathroom fitting installation", rating: 4.79, price: 249, emoji: "🚿" },
      { id: "h2", name: "Ceiling fan repair", rating: 4.8, price: 199, emoji: "🌀" },
      { id: "h3", name: "Water motor repair", rating: 4.74, price: 249, emoji: "💧" },
      { id: "h4", name: "Doorbell installation", rating: 4.76, price: 149, emoji: "🔔" },
      { id: "h5", name: "Kitchen sink repair", rating: 4.81, price: 199, emoji: "🔧" },
    ],
  },
  "emergency-help": {
    title: "Emergency help",
    subtitle: "Quick support for urgent electrical and plumbing issues",
    items: [
      { id: "x1", name: "Urgent water leakage repair", rating: 4.83, price: 249, instant: true, emoji: "🚰" },
      { id: "x2", name: "Power socket repair", rating: 4.79, price: 199, instant: true, emoji: "🔌" },
      { id: "x3", name: "Blocked drain repair", rating: 4.77, price: 249, instant: true, emoji: "🪠" },
      { id: "x4", name: "Electrical short-circuit check", rating: 4.8, price: 249, instant: true, emoji: "⚡" },
      { id: "x5", name: "Toilet flush repair", rating: 4.78, price: 199, instant: true, emoji: "🚽" },
    ],
  },
};

export const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: ["About us", "Investor Relations", "Terms & conditions", "Privacy policy", "Anti-discrimination policy", "Careers"],
  },
  {
    title: "For customers",
    links: ["On Demand reviews", "Categories near you", "Contact us"],
  },
  {
    title: "For professionals",
    links: ["Register as a professional"],
  },
];
