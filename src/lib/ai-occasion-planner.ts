import type { OccasionPlan, TimelineStep, Occasion } from "./types";
import { SALONS } from "./salons";

const OCCASION_CONFIG: Record<
  string,
  {
    label: string;
    subOccasions: string[];
    difficulty: "simple" | "moderate" | "elaborate";
    preparationDays: number;
    icon: string;
  }
> = {
  wedding: {
    label: "Wedding",
    subOccasions: ["Haldi", "Mehendi", "Engagement", "Reception", "Ceremony", "Sangeet"],
    difficulty: "elaborate",
    preparationDays: 30,
    icon: "💒",
  },
  engagement: {
    label: "Engagement",
    subOccasions: ["Ring Ceremony", "Traditional", "Intimate", "Destination"],
    difficulty: "moderate",
    preparationDays: 14,
    icon: "💍",
  },
  party: {
    label: "Party / Night Out",
    subOccasions: ["Birthday Party", "Club Night", "Friends Dinner", "Anniversary", "House Party"],
    difficulty: "simple",
    preparationDays: 3,
    icon: "🎉",
  },
  interview: {
    label: "Interview / Professional",
    subOccasions: ["Corporate Interview", "Startup Interview", "Presentation Day", "Client Meeting"],
    difficulty: "simple",
    preparationDays: 1,
    icon: "💼",
  },
  festival: {
    label: "Festival Celebration",
    subOccasions: ["Diwali", "Holi", "Navratri", "Ganesh Chaturthi", "Raksha Bandhan", "Eid"],
    difficulty: "moderate",
    preparationDays: 7,
    icon: "🪔",
  },
  "date-night": {
    label: "Date Night",
    subOccasions: ["Romantic Dinner", "Movie Date", "Special Occasion", "Anniversary"],
    difficulty: "simple",
    preparationDays: 1,
    icon: "🌙",
  },
  photoshoot: {
    label: "Photoshoot",
    subOccasions: ["Portrait", "Fashion", "Maternity", "Pre-Wedding", "Portfolio"],
    difficulty: "moderate",
    preparationDays: 7,
    icon: "📸",
  },
  graduation: {
    label: "Graduation",
    subOccasions: ["Convocation", "Celebration Dinner", "Photoshoot", "Ceremony"],
    difficulty: "simple",
    preparationDays: 3,
    icon: "🎓",
  },
  office: {
    label: "Office / Corporate",
    subOccasions: ["Client Presentation", "Team Meeting", "Office Party", "Conference"],
    difficulty: "simple",
    preparationDays: 1,
    icon: "🏢",
  },
};

const TIMELINE_TEMPLATES: Record<string, TimelineStep[]> = {
  wedding: [
    { daysBefore: 30, title: "Research & Book", description: "Research bridal salons, read reviews, and book your bridal makeup artist and hair stylist. Confirm venue and schedule.", services: ["Consultation"], tip: "Book at least 4 weeks ahead — the best artists get booked 2-3 months in advance.", icon: "📋" },
    { daysBefore: 21, title: "Pre-Bridal Skincare", description: "Start your pre-bridal skincare routine. Get facials every 2-3 weeks. Focus on hydration and brightening.", services: ["Facial", "Skin Treatment", "Body Scrub"], tip: "Avoid trying new skincare products close to the wedding. Stick to what you know works.", icon: "✨" },
    { daysBefore: 14, title: "Hair Trial & Color", description: "Schedule your bridal hair trial with your stylist. If coloring, do it now so the color settles before the big day.", services: ["Hair Color", "Hair Treatment", "Hair Trial"], tip: "Bring inspiration photos! Pinterest and Instagram boards are your best friend for bridal looks.", icon: "🎨" },
    { daysBefore: 7, title: "Final Prep Appointments", description: "Get your final facial, hair treatment, and any last-minute grooming. Your skin should be glowing and calm.", services: ["Facial Glow", "Hair Spa", "Manicure"], tip: "Drink 3L of water daily. Cut down on salt and alcohol. Your skin will thank you.", icon: "💆" },
    { daysBefore: 3, title: "Bridal Makeup Trial", description: "Full bridal makeup trial with your artist. Take photos in different lighting to perfect the look.", services: ["Bridal Makeup Trial"], tip: "Check the look in flash photography! Many brides are surprised by how their makeup looks in photos.", icon: "📷" },
    { daysBefore: 1, title: "Relaxation Day", description: "Light facial, gentle massage, and lots of rest. Avoid anything drastic — your skin needs to be calm.", services: ["Light Facial", "Relaxation Massage"], tip: "Sleep 8 hours. Avoid caffeine after 2 PM. Prepare your outfit and accessories.", icon: "😴" },
    { daysBefore: 0, title: "Wedding Day", description: "Start early. Allow 2-3 hours for bridal hair and makeup. Have breakfast and stay hydrated.", services: ["Bridal Makeup", "Bridal Hair"], tip: "Keep oil blotting sheets and setting spray handy. Your MUA should do a final check before photos.", icon: "👰" },
  ],
  party: [
    { daysBefore: 3, title: "Book Your Salon", description: "Book your appointment at your favourite salon. Choose services that match your party outfit and vibe.", services: ["Makeup", "Hair Styling"], tip: "Coordinate your look with your outfit color. Gold or silver accents work for most party looks.", icon: "📋" },
    { daysBefore: 1, title: "Glow Skincare", description: "A brightening facial or sheet mask the day before ensures your skin looks luminous under party lights.", services: ["Facial", "Sheet Mask"], tip: "Exfoliate gently — you want glowy skin, not red or irritated skin.", icon: "✨" },
    { daysBefore: 0, title: "Party Day Prep", description: "Get your hair styled and makeup done. Set with a long-wear setting spray for all-night staying power.", services: ["Hair Styling", "Party Makeup"], tip: "Keep essentials in your bag: blotting papers, lipstick, setting spray, and a small concealer for touch-ups.", icon: "🎉" },
  ],
  "date-night": [
    { daysBefore: 1, title: "Prep Your Skin", description: "A quick facial or sheet mask refreshes your complexion. Exfoliate gently so makeup goes on smoothly.", services: ["Facial", "Sheet Mask"], tip: "Hydrated skin = natural glow. Use a good moisturizer and eye cream.", icon: "💆" },
    { daysBefore: 0, title: "Glam Up", description: "Soft glam makeup with defined eyes and a flattering lip color. Soft waves in your hair complete the look.", services: ["Party Makeup", "Hair Styling"], tip: "Less is more for date night — you want to look like the best version of yourself, not overdone.", icon: "🌙" },
  ],
  interview: [
    { daysBefore: 1, title: "Clean & Polished", description: "A clean haircut, subtle makeup, and well-groomed appearance sets the right impression.", services: ["Haircut", "Express Facial"], tip: "Keep makeup minimal and professional. Focus on looking fresh and confident.", icon: "💼" },
    { daysBefore: 0, title: "Final Touches", description: "Style your hair simply — neat and professional. Light makeup that enhances without distracting.", services: ["Hair Styling", "Quick Makeup"], tip: "Good posture and a genuine smile do more than any beauty treatment. Confidence is your best accessory.", icon: "✨" },
  ],
  festival: [
    { daysBefore: 5, title: "Book Your Appointments", description: "Festival salons get busy! Book your preferred slot at least 5 days in advance.", services: ["Makeup", "Hair", "Nails"], tip: "For Diwali, traditional gold and red tones are timeless. For Holi, focus on protecting your hair from color.", icon: "🪔" },
    { daysBefore: 2, title: "Skin Preparation", description: "Get a glow facial done 2 days before the festival. Your skin will be radiant for all the photos.", services: ["Glow Facial", "Body Scrub"], tip: "Apply SPF if you're going outdoors. Haldi in skincare is great for festival prep.", icon: "✨" },
    { daysBefore: 0, title: "Festival Glam", description: "Traditional makeup look with your cultural elements. Hair in a beautiful updo or braids works perfectly.", services: ["Bridal Makeup", "Hair Styling"], tip: "Waterproof makeup is a lifesaver for outdoor festivals. Set everything well!", icon: "🎉" },
  ],
};

function defaultTimeline(occasion: string): TimelineStep[] {
  return [
    { daysBefore: 3, title: "Book Salon", description: `Book your appointment for your ${occasion}. Choose a salon that matches your style.`, services: ["Consultation"], tip: "Book 3-5 days ahead for best availability.", icon: "📋" },
    { daysBefore: 1, title: "Skincare Prep", description: "Clean and prep your skin with a facial or glow treatment.", services: ["Facial"], tip: "Hydrated skin always looks better.", icon: "✨" },
    { daysBefore: 0, title: "The Day", description: "Get styled and ready. Enjoy your special day feeling confident.", services: ["Makeup", "Hair Styling"], tip: "Set your look with a good setting spray.", icon: "✨" },
  ];
}

const DOS_DONTS: Record<string, { dos: string[]; donts: string[] }> = {
  wedding: {
    dos: ["Book makeup artist 4-6 weeks ahead", "Do a makeup trial before the wedding", "Take photos in flash lighting during trials", "Keep your skincare consistent", "Get adequate sleep the week before"],
    donts: ["Don't try new products close to the wedding", "Don't drastically change your diet", "Don't skip sunscreen", "Don't over-wax right before the event", "Don't skip the trial run"],
  },
  party: {
    dos: ["Coordinate makeup with your outfit", "Waterproof your look for long events", "Keep touch-up essentials in your bag", "Go for a subtle glow rather than heavy coverage", "Set your makeup with a good spray"],
    donts: ["Don't over-contour if you're not experienced", "Don't use products that irritate your skin", "Don't skip primer — it's essential", "Don't try a new bold lip color without testing first", "Don't forget about your neck and hands"],
  },
  festival: {
    dos: ["Use SPF if outdoors", "Waterproof products for Holi", "Traditional tones are always elegant", "Keep hair protected from color treatments", "Stay hydrated"],
    donts: ["Don't use harsh chemical treatments right before", "Don't skip patch tests for new products", "Don't overload on heavy makeup in heat", "Don't forget to remove makeup gently after", "Don't neglect your hair during festivities"],
  },
  default: {
    dos: ["Book appointments in advance", "Prepare your skin the day before", "Coordinate your look with your outfit", "Set your makeup for longevity", "Stay confident — your energy is your best accessory"],
    donts: ["Don't try new products on the day", "Don't overdo it — age-appropriate makeup is key", "Don't skip a trial for important events", "Don't forget to check your look in photos", "Don't neglect your hair and nails"],
  },
};

export async function generateOccasionPlan(occasion: Occasion, subOccasion?: string): Promise<OccasionPlan> {
  // Simulate AI processing
  await new Promise((r) => setTimeout(r, 1000 + Math.random() * 800));

  const config = OCCASION_CONFIG[occasion] ?? OCCASION_CONFIG["party"];
  const timeline = TIMELINE_TEMPLATES[occasion] ?? defaultTimeline(occasion);
  const dosDonts = DOS_DONTS[occasion] ?? DOS_DONTS["default"];

  // Find recommended salons
  const relevantSalons = SALONS.filter((s) =>
    s.tags.some((t) => /bridal|makeup|hair|spa/i.test(t)) ||
    occasion === "festival" && s.rating >= 4.5 ||
    occasion === "party" && s.tags.some((t) => /makeup|nails/i.test(t)) ||
    occasion === "interview" && s.tags.some((t) => /grooming|hair/i.test(t))
  ).slice(0, 4);

  const keyServices: { name: string; category: string; priceRange: string }[] = [];
  const seenServices = new Set<string>();
  for (const salon of SALONS.slice(0, 10)) {
    for (const svc of salon.services) {
      if (seenServices.size >= 8) break;
      if (!seenServices.has(svc.name)) {
        keyServices.push({
          name: svc.name,
          category: svc.category,
          priceRange: `₹${svc.price.toLocaleString("en-IN")} – ₹${(svc.price * 2).toLocaleString("en-IN")}`,
        });
        seenServices.add(svc.name);
      }
    }
  }

  return {
    occasion: config.label,
    subOccasion,
    timeline,
    estimatedTotalBudget: occasion === "wedding" ? "₹15,000 – ₹50,000" : occasion === "party" ? "₹2,000 – ₹8,000" : "₹1,000 – ₹5,000",
    difficulty: config.difficulty,
    preparationDays: config.preparationDays,
    keyServices: keyServices.slice(0, 8),
    salonRecommendations: relevantSalons.map((s) => ({
      name: s.name,
      area: s.area,
      rating: s.rating,
      specialty: s.specialization ?? s.tags.slice(0, 2).join(", "),
    })),
    dos: dosDonts.dos,
    donts: dosDonts.donts,
  };
}

export function getOccasionConfig(occasion: string) {
  return OCCASION_CONFIG[occasion] ?? { label: occasion, subOccasions: [], difficulty: "simple" as const, preparationDays: 3, icon: "✨" };
}

export const ALL_OCCASIONS: { value: Occasion; label: string; icon: string }[] = [
  { value: "wedding", label: "Wedding", icon: "💒" },
  { value: "engagement", label: "Engagement", icon: "💍" },
  { value: "party", label: "Party / Night Out", icon: "🎉" },
  { value: "interview", label: "Interview", icon: "💼" },
  { value: "festival", label: "Festival", icon: "🪔" },
  { value: "casual", label: "Casual / Everyday", icon: "☀️" },
  { value: "date-night", label: "Date Night", icon: "🌙" },
  { value: "photoshoot", label: "Photoshoot", icon: "📸" },
  { value: "graduation", label: "Graduation", icon: "🎓" },
  { value: "office", label: "Office / Corporate", icon: "🏢" },
];