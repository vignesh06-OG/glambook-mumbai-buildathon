# ✨ GlamBook Mumbai: Your AI Beauty Concierge
> Built exclusively for the Hack2Skill Buildathon.

[![Next.js](https://img.shields.io/badge/Next.js-Black?logo=next.js&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](#)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)](#)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](#)

## 🔗 Project Links
* **Live Demo:** [glambook-mumbai-buildathon.vercel.app](https://glambook-mumbai-buildathon.vercel.app)
* **Demo Video:** [Watch the Full Presentation Here](https://1drv.ms/v/c/2e55e4ec14c06aa2/IQD87wm6--7oS6dPRlAHZYAQAYErsqQcyMZ-KZrztw44guY?e=RVDtc5)

---

## 🚀 The Problem & The Solution
Finding the right beauty and wellness service is often a scattered experience. Urban women have to juggle between multiple platforms to check salon aesthetics, verify reviews, and compare pricing, often ending up with choice paralysis.

**GlamBook Mumbai** solves this by centralizing the experience. It isn't just a directory; it's an intelligent booking engine. By integrating a seamless UI with a real-time database and an LLM-powered AI Stylist, GlamBook acts as a personal beauty concierge, curating the best salons based on a user's exact needs, budget, and location.

---

## 🌟 Key Features

### 1. 🤖 AI Stylist (The X-Factor)
* **Conversational Curation:** Users don't need to manually filter through hundreds of salons. They simply type a prompt (e.g., *"I need affordable bridal makeup near Juhu for under ₹5000"*).
* **Smart Matching:** The LLM processes the natural language query and instantly curates the perfect matches from our salon catalog, saving time and decision fatigue.

### 2. ⚡ Real-Time Cloud Bookings
* **Flawless State Management:** Integrated with **Firebase Firestore**.
* **Instant Confirmation:** When a user books a service, the data is pushed securely to the cloud in real-time, instantly rendering a success state and updating the user's booking history without page reloads.

### 3. 💅 Premium, Production-Ready UI
* **Zero Layout Shifts:** Carefully engineered image layouts (handling external Unsplash assets) to ensure uniform card heights and zero layout shifts.
* **Mobile Optimized:** Strict overflow control and tap-animations tailored for mobile devices to prevent horizontal scrolling and simulate a native app feel.

---

## 🛠️ Technical Stack
* **Frontend Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS (for highly responsive, utility-first styling)
* **Database / Backend:** Firebase Firestore (NoSQL cloud database)
* **Deployment & Hosting:** Vercel (Edge network deployment)
* **AI Engine:** Prompt-engineered LLM integration for the concierge logic

---

## 🧠 Challenges Overcome (Solo Development)
Building a full-stack application as a solo developer comes with its hurdles:
1. **Database Connection vs. UI:** Initially faced issues with Firebase write permissions and asynchronous form submissions. Resolved this by optimizing the database rules and refining the frontend state handling to show a seamless "Saving..." to "Success" flow.
2. **External Media Handling:** Next.js strictly blocks unconfigured external image domains. I successfully debugged and configured `next.config.mjs` to whitelist Unsplash domains, preventing production 404 errors and ensuring a premium visual experience on the live build.
3. **AI Context Window:** Fine-tuned the AI prompts to ensure the LLM returned actionable salon data rather than generic beauty advice, forcing it to act strictly as a localized concierge.

---

## 💻 Local Setup Instructions
Want to run GlamBook locally? Follow these steps:

1. Clone the repository:
```bash
   git clone [Your-GitHub-Repo-Link]
