# Component Documentation

## UI Components

### Button

A versatile button component with multiple variants and sizes.

**Import:**
```tsx
import { Button } from "@/components/ui/button"
```

**Usage:**
```tsx
// Default button
<Button>Click me</Button>

// With variants
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// Disabled
<Button disabled>Disabled</Button>

// With icon
<Button>
  <Icon className="mr-2 h-4 w-4" />
  With Icon
</Button>
```

**Props:**
- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
- `size`: "default" | "sm" | "lg" | "icon"
- All standard button HTML attributes

---

### Card

A composable card component for displaying content.

**Import:**
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
```

**Usage:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content of the card</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Components:**
- `Card` - Container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Subtitle/description
- `CardContent` - Main content area
- `CardFooter` - Footer section (typically for actions)

---

### Input

A styled input component for forms.

**Import:**
```tsx
import { Input } from "@/components/ui/input"
```

**Usage:**
```tsx
// Basic input
<Input type="text" placeholder="Enter text" />

// Email input
<Input type="email" placeholder="email@example.com" />

// Password input
<Input type="password" placeholder="Password" />

// With state
const [value, setValue] = useState("")
<Input 
  value={value} 
  onChange={(e) => setValue(e.target.value)} 
/>

// Disabled
<Input disabled placeholder="Disabled" />

// With validation
<Input required minLength={8} />
```

**Props:**
- All standard input HTML attributes
- `type`: "text" | "email" | "password" | "number" | etc.
- `placeholder`: string
- `disabled`: boolean
- `required`: boolean

---

### Label

An accessible label component for form inputs.

**Import:**
```tsx
import { Label } from "@/components/ui/label"
```

**Usage:**
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>
```

**Props:**
- `htmlFor`: string (matches input id)
- All standard label HTML attributes

---

## Layout Components

### Navbar

A responsive navigation component with mobile menu support.

**Location:** `src/components/layout/Navbar.tsx`

**Features:**
- Sticky positioning
- Mobile hamburger menu
- Desktop horizontal navigation
- Login/Signup buttons
- Smooth animations
- Backdrop blur effect

**Usage:**
Already included in root layout. To customize:

```tsx
// Edit src/components/layout/Navbar.tsx

// Change brand name
<span className="text-xl font-bold">YourApp</span>

// Add navigation links
<Link href="/about">About</Link>

// Modify auth buttons
<Link href="/login">
  <Button variant="ghost">Log in</Button>
</Link>
```

**Customization Points:**
1. **Brand/Logo** (line 18-20)
2. **Navigation Links** (line 23-38)
3. **Auth Buttons** (line 41-50)
4. **Mobile Menu** (line 69-103)

---

## Page Components

### Home Page

**Location:** `src/app/page.tsx`

**Sections:**
1. **Hero Section** - Main headline with CTA buttons
2. **Features Section** - Three feature cards with icons
3. **CTA Section** - Secondary call-to-action
4. **Footer** - Links and copyright

**Customization:**
```tsx
// Change hero text
<h1>Your Custom Headline</h1>

// Modify features
<Card>
  <CardHeader>
    <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4">
      <YourIcon className="h-6 w-6 text-blue-600" />
    </div>
    <CardTitle>Your Feature</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Details about the feature</p>
  </CardContent>
</Card>
```

---

### Login Page

**Location:** `src/app/login/page.tsx`

**Features:**
- Email/password form
- Social login buttons (Google, GitHub)
- Forgot password link
- Link to signup page
- Form validation
- Loading states

**Integration:**
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  
  try {
    // Add your authentication logic here
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    if (response.ok) {
      // Redirect to dashboard
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    setIsLoading(false)
  }
}
```

---

### Sign Up Page

**Location:** `src/app/signup/page.tsx`

**Features:**
- Full name, email, password fields
- Password confirmation
- Terms & conditions checkbox
- Social signup buttons
- Link to login page
- Client-side validation

**Integration:**
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (formData.password !== formData.confirmPassword) {
    // Show error
    return
  }
  
  setIsLoading(true)
  
  try {
    // Add your registration logic here
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    
    if (response.ok) {
      // Redirect to onboarding or dashboard
      router.push('/onboarding')
    }
  } catch (error) {
    console.error('Signup error:', error)
  } finally {
    setIsLoading(false)
  }
}
```

---

## Utility Functions

### cn (Class Name Merger)

**Location:** `src/lib/utils.ts`

**Purpose:** Merge Tailwind classes intelligently, handling conflicts.

**Usage:**
```tsx
import { cn } from "@/lib/utils"

// Basic usage
<div className={cn("text-base", "text-lg")} />
// Result: "text-lg" (last class wins)

// Conditional classes
<div className={cn(
  "px-4 py-2",
  isActive && "bg-blue-500",
  isDisabled && "opacity-50"
)} />

// In components
<Button className={cn("custom-class", className)} />
```

---

## Creating New Components

### Best Practices

1. **Use TypeScript**
```tsx
interface MyComponentProps {
  title: string
  description?: string
  onClick?: () => void
}

export function MyComponent({ title, description, onClick }: MyComponentProps) {
  return (
    <div onClick={onClick}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
```

2. **Use forwardRef for form elements**
```tsx
import * as React from "react"

export type MyInputProps = React.InputHTMLAttributes<HTMLInputElement>

const MyInput = React.forwardRef<HTMLInputElement, MyInputProps>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={className} {...props} />
  }
)
MyInput.displayName = "MyInput"

export { MyInput }
```

3. **Use cn for className merging**
```tsx
import { cn } from "@/lib/utils"

export function MyComponent({ className }: { className?: string }) {
  return (
    <div className={cn("default-classes", className)}>
      Content
    </div>
  )
}
```

4. **Support variants with CVA**
```tsx
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        primary: "primary-classes",
      },
      size: {
        sm: "small-classes",
        lg: "large-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

interface Props extends VariantProps<typeof variants> {
  children: React.ReactNode
}

export function MyComponent({ variant, size, children }: Props) {
  return (
    <div className={variants({ variant, size })}>
      {children}
    </div>
  )
}
```

---

## Component Patterns

### Composition Pattern
```tsx
// Parent component
export function Tabs({ children }: { children: React.ReactNode }) {
  return <div className="tabs">{children}</div>
}

// Child components
export function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="tabs-list">{children}</div>
}

export function TabsContent({ children }: { children: React.ReactNode }) {
  return <div className="tabs-content">{children}</div>
}

// Usage
<Tabs>
  <TabsList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabsList>
  <TabsContent>Content</TabsContent>
</Tabs>
```

### Render Props Pattern
```tsx
interface RenderProps {
  isOpen: boolean
  toggle: () => void
}

export function Toggle({ children }: { 
  children: (props: RenderProps) => React.ReactNode 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  
  return <>{children({ isOpen, toggle })}</>
}

// Usage
<Toggle>
  {({ isOpen, toggle }) => (
    <div>
      <button onClick={toggle}>Toggle</button>
      {isOpen && <div>Content</div>}
    </div>
  )}
</Toggle>
```

### Custom Hooks Pattern
```tsx
// hooks/useToggle.ts
export function useToggle(initialState = false) {
  const [state, setState] = useState(initialState)
  const toggle = () => setState(!state)
  const setTrue = () => setState(true)
  const setFalse = () => setState(false)
  
  return { state, toggle, setTrue, setFalse }
}

// Usage in component
function MyComponent() {
  const { state: isOpen, toggle } = useToggle()
  
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      {isOpen && <div>Content</div>}
    </div>
  )
}
```

---

## Styling Guidelines

### Responsive Design
```tsx
// Mobile first approach
<div className="
  text-sm          // Mobile (default)
  sm:text-base     // Small screens (640px+)
  md:text-lg       // Medium screens (768px+)
  lg:text-xl       // Large screens (1024px+)
">
  Responsive text
</div>
```

### Dark Mode
```tsx
// Automatic dark mode support
<div className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-gray-100
">
  Content
</div>

// Or use CSS variables
<div className="bg-background text-foreground">
  Content
</div>
```

### Hover States
```tsx
<button className="
  bg-blue-500 
  hover:bg-blue-600 
  transition-colors
  duration-200
">
  Hover me
</button>
```

### Focus States
```tsx
<input className="
  focus:outline-none 
  focus:ring-2 
  focus:ring-blue-500
" />
```

---

## Icons

Using Lucide React icons:

```tsx
import { Home, User, Settings, ChevronRight } from "lucide-react"

// Basic usage
<Home className="h-5 w-5" />

// With color
<User className="h-5 w-5 text-blue-500" />

// In button
<Button>
  <Settings className="mr-2 h-4 w-4" />
  Settings
</Button>

// Animated
<ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
```

Available icons: https://lucide.dev/icons/

---

## Testing Components

### Example Test Structure
```tsx
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
  
  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  it('can be disabled', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDisabled()
  })
})
```

---

This documentation covers all the components in the current application. Refer to this when building new features or customizing existing ones.
