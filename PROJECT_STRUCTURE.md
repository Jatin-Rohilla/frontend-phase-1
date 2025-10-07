# Project Structure Documentation

## Overview
This is a modern, scalable Next.js 15 application built with TypeScript, Tailwind CSS, and shadcn/ui components. The project follows industry-standard best practices with a component-based architecture designed to scale to thousands of users.

## Tech Stack
- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (custom implementation)
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## Folder Structure

```
frontend-phase-1/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout with Navbar
│   │   ├── page.tsx             # Home page
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   ├── signup/
│   │   │   └── page.tsx         # Sign up page
│   │   ├── globals.css          # Global styles & Tailwind imports
│   │   └── favicon.ico
│   │
│   ├── components/               # Reusable components
│   │   ├── layout/
│   │   │   └── Navbar.tsx       # Responsive navigation component
│   │   └── ui/                  # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── index.ts         # Component exports
│   │
│   └── lib/
│       └── utils.ts             # Utility functions (cn helper)
│
├── public/                       # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

## Key Features

### 1. **Responsive Design**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Hamburger menu for mobile navigation
- Fluid typography and spacing

### 2. **Component Architecture**
- **Atomic Design Pattern**: UI components are built as reusable atoms
- **Composition**: Complex components built from simpler ones
- **Type Safety**: Full TypeScript support with proper prop types
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

### 3. **Pages**

#### Home Page (`/`)
- Hero section with gradient text
- Features section with icon cards
- Call-to-action section
- Footer with links
- Fully responsive layout

#### Login Page (`/login`)
- Email/password form
- Social login buttons (Google, GitHub)
- "Forgot password" link
- Link to sign up page
- Form validation

#### Sign Up Page (`/signup`)
- Full name, email, password fields
- Password confirmation
- Terms & conditions checkbox
- Social sign up options
- Link to login page
- Client-side validation

### 4. **Navigation Component**
- Sticky navbar with backdrop blur
- Desktop: Horizontal menu with auth buttons
- Mobile: Hamburger menu with slide-down panel
- Smooth transitions and hover states
- Active route highlighting ready

## Component Details

### UI Components (shadcn/ui style)

#### Button
- Variants: default, destructive, outline, secondary, ghost, link
- Sizes: default, sm, lg, icon
- Full TypeScript support with VariantProps

#### Card
- Composable: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- Consistent spacing and styling
- Shadow and border effects

#### Input
- Styled text inputs
- Focus states with ring effect
- Disabled states
- File input support

#### Label
- Accessible form labels
- Peer-disabled support

### Layout Components

#### Navbar
- Client component with state management
- Mobile menu toggle
- Responsive breakpoints
- Smooth animations

## Styling System

### Tailwind Configuration
- Uses Tailwind CSS 4 with `@import "tailwindcss"`
- Custom CSS variables for theming:
  - `--background`: Background color
  - `--foreground`: Text color
  - `--font-sans`: Sans-serif font
  - `--font-mono`: Monospace font

### Dark Mode Support
- Automatic dark mode based on system preference
- CSS variables switch automatically
- All components support both themes

### Color System
```css
Light Mode:
- Background: #ffffff
- Foreground: #171717

Dark Mode:
- Background: #0a0a0a
- Foreground: #ededed
```

## Best Practices Implemented

### 1. **Performance**
- Static page generation where possible
- Optimized bundle sizes (First Load JS: ~128-131 kB)
- Image optimization with Next.js Image component
- Font optimization with next/font

### 2. **Code Quality**
- ESLint configuration
- TypeScript strict mode
- Consistent code formatting
- Component composition over inheritance

### 3. **Scalability**
- Modular component structure
- Centralized utility functions
- Type-safe props and state
- Easy to add new pages and components

### 4. **Accessibility**
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements

### 5. **Developer Experience**
- TypeScript for type safety
- Clear folder structure
- Component documentation
- Reusable utilities (cn function)

## Getting Started

### Development
```bash
npm run dev
# Starts development server with Turbopack at http://localhost:3000
```

### Build
```bash
npm run build
# Creates optimized production build
```

### Production
```bash
npm start
# Starts production server
```

### Lint
```bash
npm run lint
# Runs ESLint on the codebase
```

## Adding New Features

### Adding a New Page
1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Export a default React component
4. Update Navbar links if needed

### Adding a New Component
1. Create component in `src/components/ui/` or `src/components/layout/`
2. Use TypeScript for props
3. Export from index file if in ui folder
4. Follow existing component patterns

### Adding Authentication Logic
The login and signup pages have placeholder functions:
- Update `handleSubmit` in `/login/page.tsx`
- Update `handleSubmit` in `/signup/page.tsx`
- Add API routes in `src/app/api/`
- Integrate with your auth provider (NextAuth, Clerk, etc.)

## Environment Variables
Create a `.env.local` file for environment-specific variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
# Add other variables as needed
```

## Future Enhancements
- [ ] Add authentication backend integration
- [ ] Implement protected routes
- [ ] Add user dashboard
- [ ] Add form validation library (Zod + React Hook Form)
- [ ] Add toast notifications
- [ ] Add loading states and skeletons
- [ ] Add error boundaries
- [ ] Add analytics
- [ ] Add testing (Jest, React Testing Library)
- [ ] Add E2E tests (Playwright)

## Notes
- All pages are responsive and tested on mobile, tablet, and desktop
- Components follow shadcn/ui patterns for consistency
- The app uses Next.js 15 App Router (not Pages Router)
- Turbopack is enabled for faster builds and dev server
