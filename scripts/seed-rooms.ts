/**
 * Seed demo property listings with real Unsplash image URLs (no upload).
 *
 * Usage: npm run seed:rooms
 *
 * OWNER_EMAIL must already exist in public.users (run seed:admin first if needed).
 * Re-running deletes previous rows tagged seed:rooms, then inserts fresh ones.
 */
import { createClient } from "@supabase/supabase-js";
import { cred } from "../lib/cred";

// ── owner for seeded listings ─────────────────────────────────────────────
const OWNER_EMAIL = "rameshadhikari579@gmail.com";
const SEED_TAG = "seed:rooms";
// ─────────────────────────────────────────────────────────────────────────

type RoomType =
  | "Single Room"
  | "2/3 Rooms Flat"
  | "1 BHK"
  | "2 BHK"
  | "3 BHK"
  | "Office Space"
  | "Business Shutter";

function slugFor(roomType: RoomType): string {
  return roomType.toLowerCase().replace(/ /g, "-");
}

const ROOMS: Array<{
  title: string;
  description: string;
  room_type: RoomType;
  price_per_month: number;
  bedrooms: number;
  kitchens: number;
  floor_number: string;
  is_living_room_available: boolean;
  rent_design: string;
  tags: string;
  detailed_address: string;
  location: string;
  latitude: number;
  longitude: number;
  rating: number;
  review_count: number;
  badge: string | null;
  contact_phone: string;
  image_urls: string[];
}> = [
  {
    title: "Bright Single Room near Bus Park",
    description:
      "Clean single room with attached bathroom, study desk, and wardrobe. Walking distance to Itahari Bus Park and local eateries. Ideal for students.",
    room_type: "Single Room",
    price_per_month: 4500,
    bedrooms: 1,
    kitchens: 0,
    floor_number: "2nd Floor",
    is_living_room_available: false,
    rent_design: "residential",
    tags: `${SEED_TAG}, furnished, student-friendly`,
    detailed_address: "Near Bus Park, Line No. 4",
    location: "Itahari-5",
    latitude: 26.6646,
    longitude: 87.2707,
    rating: 4.5,
    review_count: 14,
    badge: "Featured",
    contact_phone: "9800001001",
    image_urls: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    ],
  },
  {
    title: "Cozy Single Room with Balcony – Dharan",
    description:
      "Quiet single room with private balcony and ceiling fan. Shared kitchen available. Close to Bhanu Chowk and city center.",
    room_type: "Single Room",
    price_per_month: 3800,
    bedrooms: 1,
    kitchens: 1,
    floor_number: "3rd Floor",
    is_living_room_available: false,
    rent_design: "residential",
    tags: `${SEED_TAG}, balcony, quiet`,
    detailed_address: "Bhanu Chowk, Lane 2",
    location: "Dharan-4",
    latitude: 26.8144,
    longitude: 87.2847,
    rating: 4.3,
    review_count: 9,
    badge: null,
    contact_phone: "9800001002",
    image_urls: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    ],
  },
  {
    title: "Attic Single Room – College Road",
    description:
      "Top-floor attic room with sloping ceiling and large window. Cool breeze, Wi‑Fi ready, shared kitchen downstairs. Girls preferred.",
    room_type: "Single Room",
    price_per_month: 3200,
    bedrooms: 1,
    kitchens: 0,
    floor_number: "4th Floor",
    is_living_room_available: false,
    rent_design: "residential",
    tags: `${SEED_TAG}, attic, wifi, girls`,
    detailed_address: "College Road, Gate No. 2",
    location: "Dharan-8",
    latitude: 26.8098,
    longitude: 87.291,
    rating: 4.0,
    review_count: 7,
    badge: "New",
    contact_phone: "9800001013",
    image_urls: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    ],
  },
  {
    title: "Rooftop Single Room with Mountain View",
    description:
      "Independent rooftop room with private entrance and eastern mountain view. Separate meter, water tank on terrace. Couples OK.",
    room_type: "Single Room",
    price_per_month: 5500,
    bedrooms: 1,
    kitchens: 1,
    floor_number: "Rooftop",
    is_living_room_available: false,
    rent_design: "residential",
    tags: `${SEED_TAG}, rooftop, view, independent`,
    detailed_address: "Near BP Koirala Institute side",
    location: "Dharan-15",
    latitude: 26.821,
    longitude: 87.278,
    rating: 4.6,
    review_count: 19,
    badge: "Featured",
    contact_phone: "9800001014",
    image_urls: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
    ],
  },
  {
    title: "Budget Single Room – Tarahara",
    description:
      "Affordable single room for students. Shared bathroom and kitchen. Peaceful area a short ride from Itahari Chowk.",
    room_type: "Single Room",
    price_per_month: 2500,
    bedrooms: 1,
    kitchens: 0,
    floor_number: "Ground Floor",
    is_living_room_available: false,
    rent_design: "residential",
    tags: `${SEED_TAG}, budget, student`,
    detailed_address: "Tarahara, near highway",
    location: "Itahari-19",
    latitude: 26.695,
    longitude: 87.31,
    rating: 3.9,
    review_count: 4,
    badge: null,
    contact_phone: "9800001012",
    image_urls: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
    ],
  },
  {
    title: "Furnished 1 BHK Flat – Sundar Nagar",
    description:
      "Fully furnished 1 BHK with sofa set, double bed, and modular kitchen. Water 24/7 and covered parking for one scooter.",
    room_type: "1 BHK",
    price_per_month: 12000,
    bedrooms: 1,
    kitchens: 1,
    floor_number: "1st Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, furnished, parking`,
    detailed_address: "Sundar Nagar, House No. 18",
    location: "Itahari-10",
    latitude: 26.6666,
    longitude: 87.2736,
    rating: 4.7,
    review_count: 22,
    badge: "New",
    contact_phone: "9800001003",
    image_urls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3be14?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    ],
  },
  {
    title: "Spacious 1 BHK near Traffic Chowk",
    description:
      "Airy 1 BHK flat with separate kitchen and living area. Suitable for a couple or small family. Easy access to Biratnagar market.",
    room_type: "1 BHK",
    price_per_month: 10500,
    bedrooms: 1,
    kitchens: 1,
    floor_number: "Ground Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, family, ground-floor`,
    detailed_address: "Traffic Chowk, East side",
    location: "Biratnagar-5",
    latitude: 26.4525,
    longitude: 87.2718,
    rating: 4.4,
    review_count: 11,
    badge: null,
    contact_phone: "9800001004",
    image_urls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    ],
  },
  {
    title: "Compact 1 BHK – Khanar Chowk",
    description:
      "Newly painted compact 1 BHK with open kitchen and tiled bathroom. Scooter parking in courtyard. Working professionals preferred.",
    room_type: "1 BHK",
    price_per_month: 9500,
    bedrooms: 1,
    kitchens: 1,
    floor_number: "2nd Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, newly-painted, professionals`,
    detailed_address: "Khanar Chowk, House 7",
    location: "Itahari-8",
    latitude: 26.6702,
    longitude: 87.2655,
    rating: 4.2,
    review_count: 10,
    badge: null,
    contact_phone: "9800001015",
    image_urls: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
    ],
  },
  {
    title: "Garden-Facing 1 BHK – Inaruwa",
    description:
      "Quiet 1 BHK overlooking a small garden. Includes fridge and washing machine. One-month deposit only. Pets negotiable.",
    room_type: "1 BHK",
    price_per_month: 8000,
    bedrooms: 1,
    kitchens: 1,
    floor_number: "Ground Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, garden, pets, appliances`,
    detailed_address: "Ward 4, near health post",
    location: "Inaruwa-4",
    latitude: 26.6065,
    longitude: 87.1478,
    rating: 4.5,
    review_count: 13,
    badge: "Featured",
    contact_phone: "9800001016",
    image_urls: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80",
    ],
  },
  {
    title: "Modern 2 BHK Apartment – Shantinagar",
    description:
      "Two bedrooms, living room, and kitchen with marble flooring. Hot water geyser and inverter backup included. Family preferred.",
    room_type: "2 BHK",
    price_per_month: 18000,
    bedrooms: 2,
    kitchens: 1,
    floor_number: "2nd Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, family, inverter`,
    detailed_address: "Shantinagar, Block B",
    location: "Itahari-6",
    latitude: 26.6612,
    longitude: 87.2689,
    rating: 4.8,
    review_count: 31,
    badge: "Featured",
    contact_phone: "9800001005",
    image_urls: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
  },
  {
    title: "Semi-Furnished 2 BHK – Katahari Road",
    description:
      "Semi-furnished 2 BHK with wardrobes and kitchen cabinets. Peaceful neighborhood, good for office-goers commuting to Itahari.",
    room_type: "2 BHK",
    price_per_month: 15000,
    bedrooms: 2,
    kitchens: 1,
    floor_number: "1st Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, semi-furnished`,
    detailed_address: "Katahari Road, near school",
    location: "Itahari-3",
    latitude: 26.658,
    longitude: 87.275,
    rating: 4.6,
    review_count: 17,
    badge: null,
    contact_phone: "9800001006",
    image_urls: [
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    ],
  },
  {
    title: "Corner 2 BHK with Dual Balcony",
    description:
      "Corner unit with balconies on two sides, cross ventilation, and marble kitchen. School and hospital within 5 minutes walk.",
    room_type: "2 BHK",
    price_per_month: 16500,
    bedrooms: 2,
    kitchens: 1,
    floor_number: "3rd Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, balcony, corner, family`,
    detailed_address: "Near City Hospital, Lane 5",
    location: "Biratnagar-8",
    latitude: 26.4558,
    longitude: 87.2795,
    rating: 4.7,
    review_count: 21,
    badge: "New",
    contact_phone: "9800001017",
    image_urls: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6a682b0d3970?w=800&q=80",
    ],
  },
  {
    title: "2 BHK Duplex Style – Belbari",
    description:
      "Split-level 2 BHK feel: bedrooms upstairs, living and kitchen below. Private yard for kids. Two-wheeler and car parking.",
    room_type: "2 BHK",
    price_per_month: 14000,
    bedrooms: 2,
    kitchens: 1,
    floor_number: "Ground + 1",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, duplex, yard, parking`,
    detailed_address: "Belbari Bazar, north lane",
    location: "Belbari-3",
    latitude: 26.6628,
    longitude: 87.412,
    rating: 4.3,
    review_count: 8,
    badge: null,
    contact_phone: "9800001018",
    image_urls: [
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    ],
  },
  {
    title: "Luxury 3 BHK Family Apartment",
    description:
      "Premium 3 BHK with master bedroom, two balconies, and spacious living hall. Gated compound with parking for car and bikes.",
    room_type: "3 BHK",
    price_per_month: 28000,
    bedrooms: 3,
    kitchens: 1,
    floor_number: "3rd Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, luxury, parking, family`,
    detailed_address: "Sundar Nagar Extension",
    location: "Itahari-10",
    latitude: 26.6675,
    longitude: 87.2748,
    rating: 4.9,
    review_count: 28,
    badge: "Featured",
    contact_phone: "9800001007",
    image_urls: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    ],
  },
  {
    title: "Family 3 BHK near Mahendra Highway",
    description:
      "Wide 3 BHK with store room and servant toilet. Suitable for joint family. Backup generator for common areas.",
    room_type: "3 BHK",
    price_per_month: 24000,
    bedrooms: 3,
    kitchens: 1,
    floor_number: "1st Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, joint-family, generator`,
    detailed_address: "Highway side, Plot 42",
    location: "Itahari-1",
    latitude: 26.655,
    longitude: 87.267,
    rating: 4.5,
    review_count: 15,
    badge: null,
    contact_phone: "9800001019",
    image_urls: [
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    ],
  },
  {
    title: "Penthouse-Style 3 BHK – Biratnagar",
    description:
      "Top-floor 3 BHK with open terrace access, wooden flooring in master room, and modular kitchen. Lift available.",
    room_type: "3 BHK",
    price_per_month: 32000,
    bedrooms: 3,
    kitchens: 1,
    floor_number: "5th Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, penthouse, lift, terrace`,
    detailed_address: "Rani Road, Building C",
    location: "Biratnagar-12",
    latitude: 26.448,
    longitude: 87.268,
    rating: 4.8,
    review_count: 24,
    badge: "Featured",
    contact_phone: "9800001020",
    image_urls: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
    ],
  },
  {
    title: "2/3 Rooms Flat – Well Furnished",
    description:
      "Two to three room flat with shared living space, kitchen, and bathroom. Perfect for flatmates or a small family on a budget.",
    room_type: "2/3 Rooms Flat",
    price_per_month: 9000,
    bedrooms: 2,
    kitchens: 1,
    floor_number: "2nd Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, flatmates, budget`,
    detailed_address: "Line No. 7, near temple",
    location: "Itahari-2",
    latitude: 26.662,
    longitude: 87.271,
    rating: 4.2,
    review_count: 8,
    badge: null,
    contact_phone: "9800001008",
    image_urls: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    ],
  },
  {
    title: "Sunny 2/3 Rooms Flat – Pancha Kanya",
    description:
      "Corner flat with lots of natural light. Includes kitchen utensils and basic furniture. Close to colleges in Dharan.",
    room_type: "2/3 Rooms Flat",
    price_per_month: 8500,
    bedrooms: 2,
    kitchens: 1,
    floor_number: "1st Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, student, furnished`,
    detailed_address: "Pancha Kanya, Road 3",
    location: "Dharan-7",
    latitude: 26.812,
    longitude: 87.279,
    rating: 4.1,
    review_count: 6,
    badge: "New",
    contact_phone: "9800001009",
    image_urls: [
      "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&q=80",
      "https://images.unsplash.com/photo-1615874959471-d45abc383c1b?w=800&q=80",
    ],
  },
  {
    title: "Shared Flat for Three – Ghopa Camp",
    description:
      "Three private rooms with common kitchen and living. Ideal for PU / nursing students. Strict no-party policy, Wi‑Fi included.",
    room_type: "2/3 Rooms Flat",
    price_per_month: 11000,
    bedrooms: 3,
    kitchens: 1,
    floor_number: "2nd Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, shared, student, wifi`,
    detailed_address: "Ghopa Camp Road, Building A",
    location: "Dharan-14",
    latitude: 26.8055,
    longitude: 87.2955,
    rating: 4.4,
    review_count: 16,
    badge: null,
    contact_phone: "9800001021",
    image_urls: [
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
    ],
  },
  {
    title: "Renovated Flat near Hatkhola",
    description:
      "Freshly renovated 2/3 room flat with new tiles, LED lighting, and Western bathroom. Walking distance to Hatkhola market.",
    room_type: "2/3 Rooms Flat",
    price_per_month: 10000,
    bedrooms: 2,
    kitchens: 1,
    floor_number: "Ground Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, renovated, market`,
    detailed_address: "Hatkhola, alley behind shops",
    location: "Itahari-4",
    latitude: 26.6638,
    longitude: 87.2762,
    rating: 4.3,
    review_count: 9,
    badge: "New",
    contact_phone: "9800001022",
    image_urls: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80",
    ],
  },
  {
    title: "Office Space – Prime Main Road",
    description:
      "Ready-to-use office on Main Road with reception area, two cabins, and washroom. High footfall location suitable for clinics or consultancies.",
    room_type: "Office Space",
    price_per_month: 22000,
    bedrooms: 0,
    kitchens: 0,
    floor_number: "Ground Floor",
    is_living_room_available: false,
    rent_design: "commercial",
    tags: `${SEED_TAG}, commercial, main-road`,
    detailed_address: "Main Road, opposite bank",
    location: "Dharan-9",
    latitude: 26.8165,
    longitude: 87.2862,
    rating: 4.6,
    review_count: 12,
    badge: null,
    contact_phone: "9800001010",
    image_urls: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    ],
  },
  {
    title: "Co-working Style Office – Itahari Chowk",
    description:
      "Open-plan office with glass cabin, AC, and conference table for 8. Fiber internet included. Ideal for startups and agencies.",
    room_type: "Office Space",
    price_per_month: 35000,
    bedrooms: 0,
    kitchens: 0,
    floor_number: "4th Floor",
    is_living_room_available: false,
    rent_design: "commercial",
    tags: `${SEED_TAG}, coworking, ac, internet`,
    detailed_address: "Itahari Chowk, Tower 2",
    location: "Itahari-1",
    latitude: 26.6649,
    longitude: 87.2711,
    rating: 4.7,
    review_count: 18,
    badge: "Featured",
    contact_phone: "9800001023",
    image_urls: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    ],
  },
  {
    title: "Clinic-Ready Cabin Office – B.P. Chowk",
    description:
      "Two-room cabin with waiting lounge and attached washroom. Suitable for dental / physiotherapy clinic. Separate electricity meter.",
    room_type: "Office Space",
    price_per_month: 18500,
    bedrooms: 0,
    kitchens: 0,
    floor_number: "1st Floor",
    is_living_room_available: false,
    rent_design: "commercial",
    tags: `${SEED_TAG}, clinic, cabin`,
    detailed_address: "B.P. Chowk, first floor left",
    location: "Dharan-2",
    latitude: 26.8135,
    longitude: 87.283,
    rating: 4.4,
    review_count: 7,
    badge: null,
    contact_phone: "9800001024",
    image_urls: [
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80",
      "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&q=80",
    ],
  },
  {
    title: "Corner Business Shutter – Halgada Chowk",
    description:
      "Street-facing shutter with electricity meter and water supply. Ideal for grocery, mobile shop, or cafe. Heavy evening traffic.",
    room_type: "Business Shutter",
    price_per_month: 16000,
    bedrooms: 0,
    kitchens: 0,
    floor_number: "Ground Floor",
    is_living_room_available: false,
    rent_design: "business-shutter",
    tags: `${SEED_TAG}, shutter, commercial`,
    detailed_address: "Halgada Chowk, Shop No. 12",
    location: "Itahari-2",
    latitude: 26.6635,
    longitude: 87.2725,
    rating: 4.0,
    review_count: 5,
    badge: null,
    contact_phone: "9800001011",
    image_urls: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
    ],
  },
  {
    title: "Double Shutter Shop – Biratnagar Line",
    description:
      "Wide double shutter (~20 ft frontage) with mezzanine storage. Perfect for clothing or electronics. Loading access from back lane.",
    room_type: "Business Shutter",
    price_per_month: 28000,
    bedrooms: 0,
    kitchens: 0,
    floor_number: "Ground Floor",
    is_living_room_available: false,
    rent_design: "business-shutter",
    tags: `${SEED_TAG}, double-shutter, retail`,
    detailed_address: "Main Line, Shop 3–4",
    location: "Biratnagar-3",
    latitude: 26.4542,
    longitude: 87.274,
    rating: 4.5,
    review_count: 11,
    badge: "Featured",
    contact_phone: "9800001025",
    image_urls: [
      "https://images.unsplash.com/photo-1555529902-5261145633bf?w=800&q=80",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    ],
  },
  {
    title: "Food Stall Shutter – Campus Gate",
    description:
      "Compact shutter next to campus gate with exhaust provision and sink. High student footfall from morning to evening.",
    room_type: "Business Shutter",
    price_per_month: 12000,
    bedrooms: 0,
    kitchens: 1,
    floor_number: "Ground Floor",
    is_living_room_available: false,
    rent_design: "business-shutter",
    tags: `${SEED_TAG}, food, campus, footfall`,
    detailed_address: "Campus Gate East, Stall 6",
    location: "Dharan-10",
    latitude: 26.808,
    longitude: 87.2885,
    rating: 4.1,
    review_count: 14,
    badge: "New",
    contact_phone: "9800001026",
    image_urls: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    ],
  },
  {
    title: "Minimalist Studio Feel – Single Room",
    description:
      "Studio-style single with foldable desk, blackout curtains, and attached bath. Near bus stop to Itahari and Dharan.",
    room_type: "Single Room",
    price_per_month: 4800,
    bedrooms: 1,
    kitchens: 0,
    floor_number: "1st Floor",
    is_living_room_available: false,
    rent_design: "residential",
    tags: `${SEED_TAG}, studio, attached-bath`,
    detailed_address: "Jhumka Road, House 21",
    location: "Itahari-12",
    latitude: 26.672,
    longitude: 87.259,
    rating: 4.4,
    review_count: 12,
    badge: null,
    contact_phone: "9800001027",
    image_urls: [
      "https://images.unsplash.com/photo-1631679706909-1844bb7bf405?w=800&q=80",
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c21?w=800&q=80",
    ],
  },
  {
    title: "Family 2 BHK with Store Room – Urlabari",
    description:
      "Two bedrooms plus store, living, and kitchen. Quiet residential pocket near Urlabari bazaar. Drinking water filter installed.",
    room_type: "2 BHK",
    price_per_month: 13000,
    bedrooms: 2,
    kitchens: 1,
    floor_number: "2nd Floor",
    is_living_room_available: true,
    rent_design: "residential",
    tags: `${SEED_TAG}, store-room, filter, family`,
    detailed_address: "Urlabari Bazar, west side",
    location: "Urlabari-5",
    latitude: 26.6635,
    longitude: 87.605,
    rating: 4.2,
    review_count: 6,
    badge: null,
    contact_phone: "9800001028",
    image_urls: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
    ],
  },
];

async function seedRooms() {
  const url = cred.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = cred.NEXT_PUBLIC_SUPABASE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error("Missing Supabase URL or service role key in lib/cred.ts");
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const email = OWNER_EMAIL.trim().toLowerCase();
  console.log(`Seeding rooms owned by: ${email}`);

  const { data: owner, error: ownerError } = await supabase
    .from("users")
    .select("id, email, name")
    .ilike("email", email)
    .maybeSingle();

  if (ownerError) {
    console.error("Failed to look up owner:", ownerError.message);
    process.exit(1);
  }

  if (!owner) {
    console.error(
      `Owner not found: ${email}\n` +
        `Register / seed:admin first, then run: npm run seed:rooms`
    );
    process.exit(1);
  }

  // Remove previous seed batch so re-runs stay clean
  const { error: deleteError, count } = await supabase
    .from("properties")
    .delete({ count: "exact" })
    .ilike("tags", `%${SEED_TAG}%`);

  if (deleteError) {
    console.error("Failed to clear previous seed rooms:", deleteError.message);
    process.exit(1);
  }

  if (count && count > 0) {
    console.log(`Removed ${count} previous seed room(s)`);
  }

  const rows = ROOMS.map((room) => ({
    owner_id: owner.id,
    title: room.title,
    description: room.description,
    room_type: room.room_type,
    room_type_slug: slugFor(room.room_type),
    price_per_month: room.price_per_month,
    bedrooms: room.bedrooms,
    kitchens: room.kitchens,
    floor_number: room.floor_number,
    is_living_room_available: room.is_living_room_available,
    rent_design: room.rent_design,
    tags: room.tags,
    detailed_address: room.detailed_address,
    location: room.location,
    latitude: room.latitude,
    longitude: room.longitude,
    rating: room.rating,
    review_count: room.review_count,
    badge: room.badge,
    contact_phone: room.contact_phone,
    contact_email: owner.email,
    image_urls: room.image_urls,
    is_active: true,
  }));

  const { data: inserted, error: insertError } = await supabase
    .from("properties")
    .insert(rows)
    .select("id, title, location, price_per_month");

  if (insertError) {
    console.error("Failed to insert rooms:", insertError.message);
    process.exit(1);
  }

  console.log(`Seeded ${inserted?.length ?? 0} rooms (active, Unsplash images):`);
  for (const p of inserted ?? []) {
    console.log(`  • ${p.title} — ${p.location} — Rs ${p.price_per_month}`);
  }
}

seedRooms().catch((err) => {
  console.error(err);
  process.exit(1);
});
