# E-COM — Modern Frontend E-Commerce Website

A polished, modern, responsive e-commerce frontend built with **React 18 + Vite 6 + Tailwind CSS v4 + React Router v7**.

![E-COM Preview](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80)

---

## ✨ Features

- **12 Pages**: Home, Shop, Categories, About, Contact, Product Details, Cart, Wishlist, Search Results, Checkout, Order Success, 404
- **24 Demo Products** across 6 categories: Electronics, Fashion, Home & Living, Beauty, Sports, Accessories
- **Full Cart System** with LocalStorage persistence
- **Wishlist** with LocalStorage persistence
- **Product Filtering**: Category, price range, rating, search
- **Sorting**: Featured, Newest, Price (asc/desc), Highest Rated
- **Pagination** on product listings
- **Loading Skeletons** for all product grids
- **Toast Notifications** for cart/wishlist actions
- **Empty States** with helpful CTAs
- **Responsive Design**: Mobile-first, works on all screen sizes
- **Mobile Navigation** with smooth slide animation
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation, focus states
- **Animations**: Page transitions, card hovers, skeleton loading

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 6 | Build tool |
| Tailwind CSS v4 | Utility-first styling |
| React Router v7 | Client-side routing |
| Lucide React | Icon library |
| LocalStorage | Cart & wishlist persistence |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Sticky responsive navigation
│   ├── Footer.jsx        # Site footer with links
│   ├── ProductCard.jsx   # Reusable product card
│   ├── Rating.jsx        # Star rating component
│   ├── LoadingSkeleton.jsx  # Skeleton loading states
│   └── EmptyState.jsx    # Empty state component
│
├── pages/
│   ├── Home.jsx          # Homepage with hero, categories, featured products
│   ├── Shop.jsx          # Full product browsing with filters
│   ├── Categories.jsx    # Category browser
│   ├── About.jsx         # About E-COM page
│   ├── Contact.jsx       # Contact form + info
│   ├── ProductDetails.jsx  # Single product page
│   ├── Cart.jsx          # Shopping cart
│   ├── Wishlist.jsx      # Saved items
│   ├── SearchResults.jsx # Search results page
│   ├── Checkout.jsx      # Checkout form (demo)
│   ├── OrderSuccess.jsx  # Order confirmation
│   └── NotFound.jsx      # 404 page
│
├── context/
│   ├── CartContext.jsx      # Cart state + localStorage
│   ├── WishlistContext.jsx  # Wishlist state + localStorage
│   └── ToastContext.jsx     # Toast notification system
│
├── data/
│   └── products.js       # 24 demo products + 6 categories
│
├── App.jsx               # Routes + providers
├── main.jsx              # Entry point
└── index.css             # Global styles + Tailwind
```

---

## 🌐 Deployment

### Vercel
1. Push to GitHub
2. Import project in Vercel
3. Build command: `npm run build`
4. Output directory: `dist`
5. The `vercel.json` handles SPA routing automatically

### Netlify
1. Push to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. The `public/_redirects` handles SPA routing automatically

---

## 🎨 Design System

**Primary**: Indigo/Violet (`indigo-600`)
**Success**: Emerald (`emerald-500`)
**Warning**: Amber (`amber-500`)
**Error**: Red (`red-500`)
**Text**: Slate (`slate-800`, `slate-600`, `slate-400`)
**Background**: White + `slate-50`

---

## 📝 Notes

- This is a **frontend-only** demo — no backend, database, or real payments
- All product data is hardcoded in `src/data/products.js`
- Cart and wishlist persist via **localStorage**
- Checkout form is demo-only — simulates order processing with a 2s delay

---

© 2026 E-COM. Built with ❤️ using React + Tailwind CSS.
