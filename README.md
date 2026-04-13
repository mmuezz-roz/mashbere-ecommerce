# IceDream Premium Mobile E-commerce

A state-of-the-art mobile e-commerce platform designed for a premium ice cream and popsicle brand based in the UAE.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript (Strict)
- **Database**: MongoDB (Native Driver)
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React

## 📂 Architecture

The project follows a modular, service-oriented architecture:

- `src/app`: Next.js App Router (Routes & API)
- `src/components`:
  - `ui/`: Atomic, reusable base components (Shadcn-style)
  - `shared/`: Cross-page components (Header, Footer)
  - `features/`: Domain-specific components (ProductCard)
- `src/services/`: Business logic and data access abstraction
- `src/lib/`: Shared utilities (DB connection, error handling)
- `src/types/`: Centralized TypeScript interfaces
- `src/hooks/`: Custom React hooks

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm / pnpm
- MongoDB Atlas (or local instance)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📐 Design Principles

- **Clean Code**: SOLID and DRY principles.
- **Micro-animations**: Smooth transitions using `motion`.
- **Performance**: Optimized Server Components and lazy-loaded assets.
- **Accessibility**: Semantic HTML and ARIA compliance.
- **Security**: Sanitize inputs and manage secrets via environment variables.

## 📄 License

MIT © 2024 IceDream