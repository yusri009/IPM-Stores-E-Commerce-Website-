# IPM Stores

Full‑stack e‑commerce grocery application. Next.js (App Router) frontend + Express / MongoDB backend with user authentication, category & product browsing, cart management, and responsive UI.

---

## 🚀 Features

### Core Functionality
- User Authentication: Signup & login with bcrypt‑hashed passwords
- Category & Product Browsing: Dynamic category pages loaded by slug
- Product Filtering: Server query by category slug (and placeholder for search)
- Shopping Cart: Add / remove items, quantity aggregation, total counts & price
- Persistent Session: Auth + cart state hydrated from localStorage
- Responsive UI: Tailwind + gradient header, animated counters, toasts
- Modular Layouts: Category layout wrapper with sidebar
- Clean API Layer: Distinct routes for users, products, categories, cart ops

### UX Enhancements
- Real‑time cart badge with bounce animation
- Welcome banner for logged in users
- Slide‑out / offset cart panel (controlled by context state)
- Toast notifications for key actions
- Animated statistic counters

### State & Context
- AuthContext: Tracks user object & login state
- Cart Context: Tracks selected products, totals, open/close state

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router) / React 19
- Tailwind CSS / PostCSS /
- React Icons / Lucide
- React Toastify

### Backend
- Node.js / Express 5
- MongoDB / Mongoose 8
- Bcrypt for password hashing

### Tooling
- Nodemon (dev backend)
- ESLint
- Environment variables via `.env`

---

## 📁 Project Structure

```
IPM-Stores/
├── Backend/
│   ├── server.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Category.js
│   ├── routes/
│   │   ├── user.js
│   │   ├── product.js
│   │   └── category.js
│   └── package.json
├── Frontend/
│   ├── package.json
│   └── src/
│       ├── app/
│       │   ├── layout.js
│       │   ├── page.js
│       │   ├── Category/[slug]/page.jsx
│       │   ├── Category/[slug]/layout.jsx
│       │   └── components/
│       │       ├── Header/header.jsx
│       │       ├── Cart/Cart.jsx
│       │       ├── Cart/ShowCart.jsx
│       │       ├── Context/authContext.js
│       │       ├── Counter/counter.jsx
│       │       ├── Counter/counterSection.jsx
│       │       ├── ReachUs/ReachUs.jsx
│       │       └── SearchBar/searchBar.jsx
│       └── globals.css
└── README.md
```

---

## 🔌 API Endpoints

Base (default): `http://localhost:5000`

### Categories
- GET `/api/categories` — List all categories

### Products
- GET `/api/products?categorySlug={slug}&search={term?}` — Filter by category (and optional search placeholder)

### Users & Auth
- POST `/api/users` — Signup
- POST `/api/users/login` — Login (returns user object)

### Cart
- POST `/api/users/add-to-cart` — `{ userId, productId }`
- POST `/api/users/remove-from-cart` — `{ userId, productId }`
- POST `/api/users/get-cart` — `{ userId }` (returns populated products)
- POST `/api/users/clear-cart` — `{ userId }`

Password hashing occurs in `models/User.js` pre‑save hook.

---

## 🔐 Authentication Flow

1. User submits signup → backend hashes password
2. Login returns sanitized user data (`_id`, `userName`, `email`, `selectedProducts`)
3. Frontend stores user in `localStorage`
4. `AuthProvider` hydrates state on mount
5. Cart operations reference stored `user._id`

---

## 🛒 Cart Flow

1. User clicks add/remove (handled in Cart Context)
2. Request hits `/api/users/*` cart routes
3. Backend updates `selectedProducts` array & populates product references
4. Totals calculated client‑side (`getTotalItems`, `getTotalPrice`)

---

## 🎨 UI & Styling

- Tailwind utility classes
- Gradient header with dynamic right margin when cart panel open
- Animated counters (marketing metrics)
- Responsive layout scaling (mobile → desktop)
- Toast notifications (success / error)

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas or local MongoDB instance

### 1. Clone
```bash
git clone <your-repo-url>
cd IPM-Stores
```

### 2. Backend
```bash
cd Backend
npm install
cp .env.example .env   # (Create if example not present)
# Edit MONGO_URI in .env
npm run dev
```
Default: `http://localhost:5000`

`.env`:
```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster/DBNAME
```

### 3. Frontend
```bash
cd ../Frontend
npm install
npm run dev
```
App: `http://localhost:3000`

---

## 📦 NPM Scripts

### Backend
- `npm run dev` — Nodemon dev server

### Frontend
- `npm run dev` — Next.js dev
- `npm run build` — Production build
- `npm start` — (alias to dev currently)
- `npm run lint` — Lint code

---

## 🧪 Testing (Planned)
Suggested stack:
- Backend: Jest + Supertest
- Frontend: Vitest / Jest + React Testing Library
- E2E: Playwright

---

## 🔧 Configuration Points

| Concern        | Location                         | Notes |
|----------------|----------------------------------|-------|
| CORS           | Backend/server.js                | Restrict origins in production |
| DB Connection  | Backend/server.js & `.env`       | Use separate prod URI |
| Auth Persistence | Frontend AuthContext           | Replace with token/JWT in future |
| Styles         | Frontend/src/app/globals.css     | Tailwind base + custom |

---

## 🛡️ Security Notes
- Never commit real `MONGO_URI`
- Add rate limiting (e.g., `express-rate-limit`)
- Sanitize & validate inputs (celebrate / zod / joi)
- Move to JWT or session cookies for proper auth
- Avoid storing entire user object unencrypted in localStorage

---

## 🐞 Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| 500 on /api/products | Bad category slug | Verify slug param |
| Cart not updating | Missing userId | Ensure auth state hydrated before cart action |
| CORS error | Origin mismatch | Configure allowed origins in server |
| Login fails w/ 401 | Password mismatch | Confirm bcrypt hash & plaintext submission |
| Build CSS missing | Tailwind purge misconfig | Ensure content globs include `src/app/**/*` |

---

## 📊 Future Enhancements

- JWT / Refresh token auth
- Product search & fuzzy match
- Admin dashboard (inventory, orders analytics)
- Checkout & order history models
- Image optimization & CDN (Cloudinary / S3)
- Promo codes & discounts
- SSR caching / ISR for category pages
- Accessibility audit (a11y roles, focus states)
- Dark mode toggle
- Internationalization (i18n)

---

## 🗂️ Key Files Quick Reference

| Purpose | File |
|---------|------|
| Backend entry | `Backend/server.js` |
| User model | `Backend/models/User.js` |
| Product model | `Backend/models/Product.js` |
| Category model | `Backend/models/Category.js` |
| Auth & Cart routes | `Backend/routes/user.js` |
| Product routes | `Backend/routes/product.js` |
| Category routes | `Backend/routes/category.js` |
| Root layout | `Frontend/src/app/layout.js` |
| Home page | `Frontend/src/app/page.js` |
| Category page | `Frontend/src/app/Category/[slug]/page.jsx` |
| Header component | `Frontend/src/app/components/Header/header.jsx` |
| Cart context | `Frontend/src/app/components/Cart/Cart.jsx` |
| Auth context | `Frontend/src/app/components/Context/authContext.js` |

---

## 📄 License
MIT (add `LICENSE` file in repo root).

---

## 🙌 Attribution
Built with Next.js, Express
