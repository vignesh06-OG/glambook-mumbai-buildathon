# Firebase Firestore Setup — GlamBook Mumbai

## 1. Create Firebase project

1. Go to https://console.firebase.google.com
2. **Add project** → name: `glambook-mumbai` (or any name)
3. Disable Google Analytics (optional for hackathon)
4. **Create project**

## 2. Register web app

1. Project overview → **Web** (`</>`)
2. App nickname: `GlamBook Web`
3. Copy the `firebaseConfig` values

## 3. Enable Firestore

1. **Build** → **Firestore Database** → **Create database**
2. Start in **test mode** (for hackathon demo)
3. Region: `asia-south1` (Mumbai closest)

## 4. Security rules (hackathon demo)

**Firestore → Rules** — paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookings/{bookingId} {
      allow read, write: if true;
    }
    match /reviews/{reviewId} {
      allow read, write: if true;
    }
  }
}
```

> **Before production:** add Firebase Auth + restrict writes by `request.auth.uid`.

## 5. Environment variables

Copy `.env.example` → `.env.local` and fill:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Restart dev server after saving.

## 6. Vercel deploy

Add the same `NEXT_PUBLIC_FIREBASE_*` variables in **Vercel → Project → Settings → Environment Variables**.

## 7. Collections (auto-created)

| Collection | Document ID | Fields |
|------------|-------------|--------|
| `bookings` | UUID | deviceId, salonId, salonName, serviceId, serviceName, date, time, customerName, phone, price, createdAt, reviewed |
| `reviews` | UUID | bookingId, salonId, salonName, customerName, rating, improveFeedback, appreciateFeedback, tags, createdAt |

## 8. Composite indexes

If Firebase Console shows an index link after first query, click **Create index**.

Or create manually:

- Collection: `bookings` — fields: `deviceId` Asc, `createdAt` Desc (optional; we sort in memory)

## 9. Legacy data migration

On first load, existing `localStorage` bookings/reviews are automatically uploaded to Firestore once per browser.

## 10. Verify

```bash
npm run dev
```

1. Book a salon → check Firestore **bookings** collection  
2. Submit review → check **reviews** collection  
3. Open `/my-bookings` on same browser  
