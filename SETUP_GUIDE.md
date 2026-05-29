# Step-by-step — Jo tumhe khud karna hai

Ye steps sirf wahi hain jo **GitHub account / Vercel login / video recording** chahiye. Baaki code ready hai.

---

## Step 1: Local pe test (2 min)

1. Open **PowerShell**
2. Run:

```powershell
cd C:\beauty-salon-marketplace
npm run dev
```

3. Browser: **http://localhost:3000**
4. Check: salons dikhe, AI finder chale, ek booking complete ho

---

## Step 2: GitHub par repo banao (5 min)

1. Browser: https://github.com/new
2. Repository name: `beauty-salon-marketplace` (ya jo naam chaho)
3. **Public** select karo
4. **Do NOT** add README / .gitignore (pehle se local mein hai)
5. **Create repository**

6. PowerShell mein (apna GitHub username lagao):

```powershell
cd C:\beauty-salon-marketplace
git add .
git commit -m "Mumbai Salon Marketplace - Buildathon 2026"
git branch -M main
git remote add origin https://github.com/TUMHARA_USERNAME/beauty-salon-marketplace.git
git push -u origin main
```

> Pehli baar push par GitHub login maangega — browser se sign in karo.

**Error aaye?**
- `remote origin already exists` → `git remote set-url origin https://github.com/...`
- Login fail → GitHub Desktop install karo: https://desktop.github.com

---

## Step 3: Vercel par live site (5 min)

1. https://vercel.com → **Sign up** (GitHub se login best)
2. **Add New Project**
3. Import repo: `beauty-salon-marketplace`
4. Framework: **Next.js** (auto-detect)
5. **Deploy** — kuch change mat karo
6. 1–2 min baad URL milega: `https://something.vercel.app`

7. `README.md` kholo — **Live demo** line mein URL paste karo
8. Same URL `SUBMISSION.md` section 6 mein bhi

Optional — README update ke baad:

```powershell
git add README.md SUBMISSION.md
git commit -m "Add live demo URL"
git push
```

---

## Step 4: Demo video (10–15 min)

1. Site **live URL** kholo (localhost nahi — judges ke liye live better)
2. **Win + G** → Capture → Record screen
3. `SUBMISSION.md` ka **Demo video script** follow karo (2–3 min)
4. YouTube → **Upload** → Visibility: **Unlisted**
5. Link copy karo → `README.md` + `SUBMISSION.md` section 8

---

## Step 5: SuperXgen form submit

Form mein bharo:

| Field | Value |
|-------|--------|
| Live link | Vercel URL |
| GitHub | Repo public URL |
| Video | YouTube link |
| AI workflow | `SUBMISSION.md` section 3 copy-paste |

---

## Agar kuch break ho

| Problem | Fix |
|---------|-----|
| Images nahi dikhti live | Vercel redeploy; `next.config.ts` mein unsplash already hai |
| `npm run build` fail | `npm install` phir `npm run build` |
| Port 3000 busy | `npm run dev -- -p 3001` |

---

**Project folder:** `C:\beauty-salon-marketplace`  
**idealabproject se koi link nahi** — alag repo, alag submit.
