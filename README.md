# IceDream Premium Mobile E-commerce

A state-of-the-art mobile e-commerce platform designed for a premium ice cream and popsicle brand based in the UAE.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript (Strict)
- **Database/Auth**: Supabase (PostgreSQL)
- **Animations**: Motion (Framer Motion)
- **Imaging**: Cloudinary
- **Icons**: Lucide React

## 📂 Architecture

The project follows a modular, service-oriented architecture:

- `src/app`: Next.js App Router (Routes & Server Actions)
- `src/components`:
  - `ui/`: Atomic, reusable base components (Radix UI)
  - `shared/`: Cross-page components (Header, Footer, Navigation)
  - `features/`: Domain-specific components (Product, Hero, Equipment)
- `src/services/`: Business logic and data access abstraction (Server-side services)
- `src/lib/`: Shared utilities (Supabase client, types, helpers)
- `src/types/`: Centralized TypeScript interfaces
- `src/hooks/`: Custom React hooks

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm / pnpm
- Supabase Project (URL & Anon Key)
- Cloudinary Account (for media)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📐 Design Principles

- **Clean Code**: SOLID and DRY principles with a focus on Service-oriented patterns.
- **Micro-animations**: Smooth, premium transitions using `motion`.
- **Performance**: Optimized Server Components and lazy-loaded assets via Cloudinary.
- **Accessibility**: Semantic HTML and Radix UI primitives for ARIA compliance.
- **Security**: Supabase Row Level Security (RLS) for data protection.

## 📄 License

MIT © 2024 IceDream