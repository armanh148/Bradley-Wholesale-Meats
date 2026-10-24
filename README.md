# Bradley Wholesale Meats 🥩

> **Next Generation. Wholesale Meat.**  
> Complete digital solution and wholesale e-commerce platform for **Bradley Wholesale Meats** located in **Concord, Ontario, Canada**.

![Bradley Wholesale Meats Preview](https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80)

---

## 📍 Business Overview

- **Business Name:** Bradley Wholesale Meats
- **Facility Address:** 445 Edgeley Blvd Unit 4, Concord, ON L4K 4G1, Canada
- **Phone:** +1 905-669-7583
- **Google Rating:** 4.8 ★ (137 Verified Reviews)
- **Facility Status:** CFIA Federally Inspected & 100% Hand-Slaughtered Halal Certified (#HMC-ON-4458)
- **Logistics:** York Region Central Distribution Hub with dedicated dual-temp refrigerated delivery fleet (1.8°C monitored)

---

## 🌟 Solution Architecture

This application consists of two integrated interfaces designed for both commercial restaurant clients and internal butchery store management:

### 🛍️ PART 1: Online Ordering Website (Frontend)
- **1600px Expansive Dribbble Layout:** Clean light gray/off-white background (`#F4F4F5`), clean white cards with generous `rounded-3xl` corners, dark charcoal typography (`#18181B`), and striking crimson red accent colors (`#DC2626`).
- **Header & Navigation Bar:**
  - Brand logo with bold 'B' badge and *"Concord, ON"* subtitle.
  - Quick-call link (`+1 905-669-7583`), Google 4.8★ trust badge, search trigger, and cart badge with live quantity counter.
  - Seamless toggle button between **Online Storefront** and **B2B Desktop POS**.
- **Hero Section:**
  - Badge: *"Pure Halal & Premium Farm Fresh Wholesale in York Region"*.
  - Main Heading: *"Next Generation. Wholesale Meat."*
  - Dual CTAs: *"Shop Wholesale Catalog"* and *"Request Custom Cut"*.
  - Right-side master butcher cutout with floating **445 Edgeley Blvd Unit 4, Concord, ON** distribution hub badge and cold-chain temperature seal.
- **Bottom 3 Floating Product Cards (Hero Overlap):**
  - **Organic Free-Range Chicken Breasts**: $340.00 / box (strikethrough $994.05) | 15 kg Master Box
  - **Grass Fed Lamb Frenched Cutlets**: $899.00 / box (strikethrough $1,994.05) | 12 kg Master Pack
  - **Premium Grass-Fed Ribeye Steaks**: $1,899.00 / box (strikethrough $1,994.05) | 20 kg Master Case
  - Circular crimson red arrow action buttons for instant ordering.
- **Wholesale Catalog ($/Box & $/kg Pricing Grid):**
  - Switch pricing view between **Master Box ($/box)** and **Per Kilogram ($/kg)**.
  - Instant category filtering (*Canadian Beef*, *Lamb & Veal*, *Poultry*) and live search.
- **Chef Custom Cut Specification Form:**
  - Allows executive chefs to specify primal cuts, portion thickness (0.75" to 2.00"), bone structure, fat cap trim, packaging (*Vacuum Skin Pack*, *Cryovac*), and batch weight.
  - Generates a live Cutting Room Ticket with instant CAD quote calculation.
- **York Region & GTA Delivery Fleet Checker:**
  - Interactive postal code checker (supports `L4K`, `L4J`, `L3T`, `M5V`, `L6T`) with cutoff schedules, minimum wholesale orders, and active refrigerated van status.
- **Wholesale Cart Drawer:**
  - Free GTA Cold Freight progress bar (free freight over $350 CAD).
  - Commercial B2B order checkout with 0% HST fresh meat tax exemption.

---

### 🖥️ PART 2: Desktop App UI for Wholesale Invoicing & Inventory (B2B Terminal)
- **Electron / Desktop Style Frame:** Top titlebar with window controls, Concord facility status pill, and live system clock.
- **Quick Invoice Creator:**
  - Restaurant customer selector (*Edgeley Prime*, *Vaughan Trattoria*, *Richmond Hill Halal Bistro*, *Brampton Smokehouse*) or new client input.
  - Digital scale simulation: *"Tare & Read Weight from Digital Scale"*.
  - Dynamic wholesale tier discounts (5%, 10%, 15%) and Canadian tax calculation.
  - **Print Commercial Invoice**: Formatted for Canadian legal-for-trade meat packaging and commercial receipts.
  - **Save & Dispatch**: Automatically sends orders to the active delivery queue.
- **Active Orders & GTA Delivery Tracker:**
  - Manages orders across 4 refrigerated delivery vans (*Van #1 Concord/Vaughan*, *Van #2 Richmond Hill/Markham*, *Van #3 Downtown Toronto*, *Van #4 Peel Region*).
  - Pipeline stages: *Cutting Room (Prep)*, *Staged in Cold Room (2°C)*, *In Transit*, and *Delivered & Signed*.
- **Restaurant Accounts Ledger & Net-30 Status:**
  - B2B double-entry bookkeeping style dashboard with *Outstanding Receivables*, *Collected Revenue*, and *Overdue Net-30 Accounts*.
  - **Record Payment Modal**: Log payments via Interac E-Transfer, Direct Deposit EFT, Certified Cheque, or Corporate Card.
- **Cold Room Inventory & Aging:**
  - Live inventory tracking for walk-in meat coolers, poultry staging, and Himalayan salt dry-aging chambers with lot numbers and inbound carcass logging.

---

## 🛠️ Technical Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) with 1600px container width
- **Icons:** Lucide React
- **Fonts:** Plus Jakarta Sans & JetBrains Mono

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/armanh148/Bradley-Wholesale-Meats.git
cd Bradley-Wholesale-Meats
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 📄 License
Private & Proprietary © Bradley Wholesale Meats, Concord, ON. All rights reserved.
