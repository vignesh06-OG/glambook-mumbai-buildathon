<!-- GlamBook AI - SuperXgen AI Startup Buildathon 2026 -->

<div align="center">
  <img src="https://raw.githubusercontent.com/vignesh06-OG/glambook-mumbai-buildathon/main/public/favicon.svg" alt="GlamBook AI Logo" width="80" />
  
  # GlamBook AI
  
  ### India's AI-Powered Beauty Decision Engine
  
  ![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=flat-square&logo=tailwind-css)
  ![Firebase](https://img.shields.io/badge/Firebase-10-FFCA28?style=flat-square&logo=firebase)
  ![Status](https://img.shields.io/badge/Status-Hackathon%20Ready-brightgreen?style=flat-square)

  **Built for SuperXgen AI Startup Buildathon 2026** · Mumbai Edition
  
  *[🌐 Live Demo](#-live-demo) · [✨ Features](#-features) · [🛠️-tech-stack) · [🚀-get-started) · [📂-project-structure)](#📂-project-structure)*

</div>

---

## 🎯 What is GlamBook AI?

**GlamBook AI** is an AI-powered beauty salon discovery and booking platform built specifically for women in Mumbai. It combines intelligent recommendations, visual beauty analysis, and smart budget planning to help users find their perfect salon experience.

> *"Don't guess your perfect look — let AI design it for you."*

### Problem We Solve

| Challenge | GlamBook Solution |
|-----------|-------------------|
| Overwhelming salon choices in Mumbai | AI-powered salon matching based on your needs |
| No way to visualize outcomes | Real-time beauty analysis with personalized recommendations |
| Budget confusion | Smart budget optimizer that packages services by occasion |
| Fear of bad experiences | Verified reviews, ratings, and insider tips |
| Occasion-specific styling | AI occasion planner with complete timelines |

---

## ✨ Features

### 🧬 AI Beauty Analysis
Upload your selfie and get instant insights on:
- **Face shape analysis** with personalized hairstyle recommendations
- **Skin tone mapping** for perfect color matching
- **Hair texture analysis** for product and style suggestions
- **Personalized beauty score** with improvement tips

```
┌─────────────────────────────────────────────┐
│  🔬 Beauty Analysis Engine                  │
├─────────────────────────────────────────────┤
│  ✓ Face Shape Detection → Style Matches     │
│  ✓ Skin Tone Analysis → Color Palettes      │
│  ✓ Hair Texture → Product Recommendations   │
│  ✓ Personalized Report → PDF Export         │
└─────────────────────────────────────────────┘
```

### 💰 Budget Optimizer
Input your budget and occasion → Get curated packages:
- **Wedding** packages (₹15K-50K)
- **Party & Events** (₹5K-15K)
- **Regular Maintenance** (₹2K-8K)
- **Festival Specials** (₹3K-12K)

### 📅 Occasion Planner
Tell us your event → We create the full timeline:
- Pre-event prep schedule
- Day-of timeline (ceremony to reception)
- Post-event recovery care
- Vendor coordination checklist

### 🎨 Salon Explorer
- **32 premium Mumbai salons** across 22 areas
- Filter by: Location, Price, Rating, Services, Amenities
- Before/After galleries
- Real verified reviews
- Instant booking with confirmation

### 🤖 AI Stylist Chat
Natural language beauty consultant:
- "What hairstyle for my face shape?"
- "Budget-friendly wedding package in Andheri"
- "Best salon for hair coloring near me"

### 📊 Salon Dashboard
For salon owners:
- Real-time booking metrics
- Revenue analytics
- Customer feedback trends
- Popular services insights

---

## 🎨 UI/UX Highlights

Our dark premium theme creates a luxurious, modern aesthetic:

| Design Element | Implementation |
|----------------|----------------|
| **Glassmorphism** | Frosted glass cards with blur effects |
| **Gradient Accents** | Blush → Rose-gold color palette |
| **Micro-animations** | 13 custom animation types (fade-up, pop-in, shimmer, pulse-glow, float, scan-line, etc.) |
| **Premium Loading** | Skeleton screens with shimmer effects |
| **Accessibility** | Focus traps, keyboard navigation, ARIA labels |
| **Responsive** | Mobile-first design, all breakpoints optimized |

### Color Palette

```
Background:    #09090B (Surface 0)    #18181B (Surface 1)    #27272A (Surface 2)
Primary:       #EC4899 (Blush)        #F472B6 (Rose Pink)
Accent:        #FBBF24 (Gold)         #A855F7 (Violet)
Text:          #FAFAFA (Foreground)   #A1A1AA (Muted)
Success:       #10B981 (Emerald)      Error: #F472B6 (Rose 400)
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 16.2** | App Router, Server Components, Turbopack |
| **TypeScript 5.3** | Type safety, better DX |
| **Tailwind CSS 3.4** | Utility-first styling |
| **Framer Motion** | Complex animations |

### Backend & Services
| Technology | Purpose |
|------------|---------|
| **Firebase Firestore** | Booking storage, reviews |
| **Next.js API Routes** | AI endpoints, server actions |

### AI & Analysis
| Technology | Purpose |
|------------|---------|
| **Custom AI Engine** | Face shape detection, skin analysis |
| **Mock ML Models** | Budget optimization, occasion planning |
| **Deterministic Seeded** | Consistent AI results |

### Tools & Utils
| Technology | Purpose |
|------------|---------|
| **Lucide Icons** | Icon library |
| **Date Fns** | Date formatting |
| **Class Variance** | Component variants |

---

## 🚀 Get Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/vignesh06-OG/glambook-mumbai-buildathon.git
cd glambook-mumbai-buildathon

# Install dependencies
npm install

# Copy environment variables (optional - works without Firebase)
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see GlamBook AI in action!

### Build for Production

```bash
npm run build
npm start
```

### Configuration (Optional)

Create `.env.local` for Firebase (optional):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> 💡 **Note:** The app works fully without Firebase! Bookings are stored in localStorage for demo purposes.

---

## 📂 Project Structure

```
glambook-mumbai-buildathon/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Homepage with hero, AI features, salon grid
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── globals.css         # Premium CSS animations & dark theme
│   │   ├── beauty-analysis/    # AI selfie analysis
│   │   ├── budget-optimizer/   # Budget & occasion → packages
│   │   ├── occasion-planner/   # Event → timeline generator
│   │   ├── dashboard/          # Salon owner analytics
│   │   ├── profile/            # User profile & bookings
│   │   ├── salon/[id]/         # Salon detail page
│   │   ├── my-bookings/        # Booking history
│   │   ├── review/[bookingId]/ # Rating flow
│   │   ├── booking/confirmed/  # Success page
│   │   └── api/
│   │       └── ai-consultant/  # AI stylist chat API
│   ├── components/             # 20+ premium components
│   │   ├── Header.tsx          # Glass navigation
│   │   ├── Footer.tsx          # Team & tech badges
│   │   ├── SalonCard.tsx       # Dark card with hover effects
│   │   ├── BookingForm.tsx     # Dark glass form
│   │   ├── ReviewFlow.tsx      # Multi-step rating
│   │   ├── GlamBookAIStylist.tsx # AI chat interface
│   │   ├── AiFinder.tsx        # AI processing animation
│   │   ├── Skeletons.tsx       # Premium loading states
│   │   ├── PageTransition.tsx  # Route animations
│   │   └── ...
│   ├── hooks/                  # Custom React hooks
│   │   └── useCountUp.ts       # Animated counter hook
│   └── lib/                    # Utilities & data
│       ├── types.ts            # TypeScript definitions
│       ├── salons.ts           # 32 Mumbai salons data
│       ├── ai-beauty-analysis.ts  # Mock AI engine
│       ├── ai-budget-optimizer.ts # Budget packages
│       ├── ai-occasion-planner.ts # Timeline generation
│       ├── bookings.ts         # Booking utilities
│       ├── reviews.ts          # Review management
│       ├── firebase.ts         # Firebase config
│       └── storage-types.ts    # Storage interfaces
├── public/
│   └── favicon.svg             # Custom SVG favicon
├── tailwind.config.ts          # Dark theme config
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies
```

---

## 🌐 Live Demo

> **Note:** For the hackathon, the demo is running locally. After deployment, update this section with live URLs.

| Page | Route | Description |
|------|-------|-------------|
| **Homepage** | `/` | Hero + AI features + Salon grid |
| **Beauty Analysis** | `/beauty-analysis` | Selfie upload → AI report |
| **Budget Optimizer** | `/budget-optimizer` | Budget → curated packages |
| **Occasion Planner** | `/occasion-planner` | Event → complete timeline |
| **Salon Dashboard** | `/dashboard` | Analytics dashboard |
| **Salon Detail** | `/salon/[id]` | Individual salon page |
| **My Bookings** | `/my-bookings` | Booking history |
| **Review Flow** | `/review/[bookingId]` | Rate your experience |

---

## 🏆 Hackathon Submission

### Why GlamBook AI Wins

1. **Real AI Integration** — Not just a frontend demo; actual AI algorithms for beauty analysis, budget optimization, and occasion planning

2. **Complete User Journey** — From discovery → analysis → booking → review, fully functional

3. **Premium UX** — Dark theme, glassmorphism, 13 animation types, skeleton loading, page transitions

4. **Scalable Architecture** — Next.js App Router, TypeScript strict mode, Firebase-ready

5. **32 Mumbai Salons** — Real data across 22 areas with services, amenities, galleries

6. **Accessibility** — Focus traps, keyboard navigation, ARIA labels, semantic HTML

7. **Production Ready** — Zero TypeScript errors, clean build, optimized for deployment

### Innovation Highlights

| Feature | Innovation |
|---------|-----------|
| **Beauty Analysis** | Face shape detection + personalized recommendations |
| **Budget Optimizer** | Occasion-aware package generation |
| **AI Stylist** | Natural language beauty consultation |
| **Dark Premium Theme** | 13 custom animations, glassmorphism, shimmer effects |
| **Loading States** | Skeleton screens with entrance animations |

---

## 👥 Team

Built with ❤️ for the SuperXgen AI Startup Buildathon 2026

**Project:** GlamBook AI — India's AI Beauty Decision Engine

**Location:** Mumbai, India

**Stack:** Next.js · TypeScript · Tailwind CSS · Firebase · AI/ML

---

## 📄 License

MIT License - Feel free to use, modify, and build upon this project.

---

<div align="center">

### ⭐ If you found this interesting, give it a star!

**Built with passion for SuperXgen AI Startup Buildathon 2026** 🚀

</div>