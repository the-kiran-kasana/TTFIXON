// Static content that drives the user homepage.
// Swap these arrays for API responses later — component props stay the same.

export const CITY_NAME = "Delhi NCR";
export const CURRENT_ADDRESS = "A-21, Lakshmi Nagar, New Delhi 110092";

export const TOP_NAV = ["Wall Panels", "Native", "Beauty"];

export const CATEGORY_TILES = [
  // { id: "instahelp", label: "InstaHelp", emoji: "⚡", href: "/user/delhi-ncr/instahelp" },
  // { id: "womens-salon", label: "Women's Salon & Spa", emoji: "💇‍♀️", href: "/user/delhi-ncr/womens-salon" },
  // { id: "mens-salon", label: "Men's Salon & Massage", emoji: "💈", href: "/user/delhi-ncr/mens-salon" },
  // { id: "cleaning", label: "Cleaning & Pest Control", emoji: "🧽", href: "/user/delhi-ncr/cleaning" },
  // { id: "painting", label: "Painting & Water-proofing", emoji: "🎨", href: "/user/delhi-ncr/painting" },
  // { id: "ac-repair", label: "AC & Appliance Repair", emoji: "❄️", href: "/user/delhi-ncr/ac-repair" },
  { id: "Plumber", label: "Plumber", img: "/images/categories/plumbing/plumber_1.jpg", href: "/user/delhi-ncr/bath-repair" },
  { id: "Electrician", label: "Electrician", img: "/images/categories/electricience/electricity_1.jpg", href: "/user/delhi-ncr/bath-repair" },
  // { id: "home-repair", label: "Electrician, Plumber & Carpenter", emoji: "🔧", href: "/user/delhi-ncr/home-repair" },
];

export const NATIVE_PRODUCTS = [
  { id: "water-purifier", label: "Native Water Purifier", emoji: "💧", href: "/user/native/water-purifier" },
  { id: "smart-locks", label: "Native Smart Locks", emoji: "🔐", href: "/user/native/smart-locks" },
];

export const HERO_IMAGES = [
  { id: 1, src: "/images/categories/plumbing/plumber.jpg", alt: "Plumbing services" },
  { id: 2, src: "/images/categories/electricience/electricience.jpg", alt: "Electrician services" },
  { id: 3, src: "/images/categories/plumbing/plumber_2.jpg", alt: "Plumbing services" },
  { id: 4, src: "/images/categories/electricience/electricity_2.jpg", alt: "Electrician services" },
];

export const SPOTLIGHT = [
  {
    id: "damp-walls",
    tag: "Trending",
    tagTone: "bg-gray-900 text-white",
    title: "A beautiful fix for damp walls",
    subtitle: "Wall panels",
    cta: "Explore",
    bg: "bg-gray-100",
    emoji: "🧱",
  },
  {
    id: "luxe",
    tag: "Price drop",
    tagTone: "bg-gray-900 text-white",
    title: "Upgrade to Luxe at ₹249 more",
    subtitle: "Was ₹1,249",
    cta: "Book now",
    bg: "bg-gray-100",
    emoji: "🎨",
  },
  {
    id: "foam-jet",
    tag: null,
    title: "Deep clean with foam-jet AC service",
    subtitle: "AC service & repair",
    cta: "Book now",
    bg: "bg-gray-100",
    emoji: "❄️",
  },
];

export const NOTEWORTHY = [
  { id: "wall-panels", label: "Wall Panels by Revamp", badge: "New", emoji: "🖼️" },
  { id: "native-wp", label: "Native Water Purifier", emoji: "💧" },
  { id: "native-locks", label: "Native Smart Locks", emoji: "🔐" },
  { id: "stove", label: "Stove Service & Repair", emoji: "🍳" },
  { id: "laptop", label: "Laptop Repair", emoji: "💻" },
];

export const MOST_BOOKED = [
  { id: "mb1", name: "Intense cleaning (2 bathrooms)", rating: 4.8, price: 978, mrp: 1058, emoji: "🚿" },
  { id: "mb2", name: "AC repair", rating: 4.73, price: 299, instant: true, emoji: "❄️" },
  { id: "mb3", name: "Foam-jet AC service", rating: 4.78, price: 599, instant: true, emoji: "💨" },
  { id: "mb4", name: "Intense cleaning (3 bathrooms)", rating: 4.8, price: 1437, mrp: 1567, emoji: "🧼" },
  { id: "mb5", name: "Plumber consultation", rating: 4.73, price: 49, emoji: "🔧" },
];

export const BANNERS = {
  "wall-panels": {
    heading: "Wall Panels",
    sub: "Level up your walls",
    cta: "Know more",
    bg: "bg-gray-100",
    text: "text-gray-900",
    emoji: "📺",
  },
  "native-locks": {
    brand: "NATIVE",
    heading: "Smart locks",
    sub: "Camera. Doorbell. All-in-one.",
    cta: "Buy now",
    tag: "Home upgrade sale · Up to ₹4,000 off",
    bg: "bg-gray-900",
    text: "text-white",
    dark: true,
    emoji: "🔐",
  },
  "home-painting": {
    heading: "Give your space the glow-up it deserves",
    sub: "Home painting",
    cta: "Buy now",
    bg: "bg-gray-100",
    text: "text-gray-900",
    emoji: "🪜",
  },
  "ro-purifier": {
    brand: "NATIVE",
    heading: "RO water purifier",
    sub: "Needs no service for 2 years",
    cta: "Buy now",
    tag: "Up to ₹2,500 off",
    bg: "bg-gray-900",
    text: "text-white",
    dark: true,
    emoji: "💧",
  },
};

export const RAILS = {
  "cleaning-essentials": {
    title: "Cleaning Essentials",
    subtitle: "Monthly cleaning essential services",
    items: [
      { id: "c1", name: "Intense cleaning (2 bathrooms)", rating: 4.8, price: 978, mrp: 1058, emoji: "🚿" },
      { id: "c2", name: "Intense cleaning (3 bathrooms)", rating: 4.8, price: 1437, mrp: 1567, emoji: "🧼" },
      { id: "c3", name: "Chimney cleaning", rating: 4.84, price: 599, emoji: "🌫️" },
      { id: "c4", name: "Fridge cleaning", rating: 4.8, price: 399, emoji: "🧊" },
      { id: "c5", name: "Chimney & stove cleaning", rating: 4.79, price: 899, emoji: "🍳" },
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
    links: ["UC reviews", "Categories near you", "Contact us"],
  },
  {
    title: "For professionals",
    links: ["Register as a professional"],
  },
];
