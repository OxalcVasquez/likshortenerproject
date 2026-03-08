# shadcn/ui Component Standards

## Overview

**ALL UI elements in this app use shadcn/ui. DO NOT create any custom components. ALWAYS use shadcn/ui components.**

shadcn/ui is a high-quality component library built on Radix UI primitives and styled with Tailwind CSS. It provides accessible, composable components for rapid development.

## Installation & Setup

### Adding shadcn Components
Use the shadcn CLI to add components to your project:

```bash
npx shadcn-ui@latest add [component-name]
```

Examples:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add input
npx shadcn-ui@latest add form
```

### Component Location
Components are installed in `components/ui/` directory:

```
components/
├── ui/
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── form.tsx
│   └── ...other components
```

## Using shadcn Components

### Import Pattern
```typescript
// ✅ Good: Import from components/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// ❌ Bad: Don't create custom button components
// import { CustomButton } from "@/components/CustomButton";
```

### Basic Component Usage
```typescript
import { Button } from "@/components/ui/button";

export const HomePage = () => {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  );
};
```

## Common Components & Variants

### Button
```typescript
import { Button } from "@/components/ui/button";

export const ButtonExamples = () => {
  return (
    <div className="flex gap-4">
      {/* Default variants */}
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>

      {/* Sizes */}
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">+</Button>

      {/* Disabled state */}
      <Button disabled>Disabled</Button>
    </div>
  );
};
```

### Card
```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const CardExample = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
    </Card>
  );
};
```

### Dialog (Modal)
```typescript
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const DialogExample = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogHeader>
        <div>Dialog content here</div>
      </DialogContent>
    </Dialog>
  );
};
```

### Input
```typescript
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const InputExample = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        disabled={false}
      />
    </div>
  );
};
```

### Form
```typescript
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const FormExample = () => {
  const form = useForm({
    defaultValues: {
      username: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
```

## Component Composition

### Combining shadcn Components
```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const UrlCreationCard = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Short URL</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">Original URL</Label>
          <Input
            id="url"
            type="url"
            placeholder="https://example.com/very/long/url"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Custom Slug (optional)</Label>
          <Input
            id="slug"
            placeholder="my-short-url"
          />
        </div>
        <Button className="w-full">Create Short URL</Button>
      </CardContent>
    </Card>
  );
};
```

## Theming & Customization

### Tailwind CSS Classes
shadcn components use Tailwind CSS classes. Customize appearance using Tailwind:

```typescript
import { Button } from "@/components/ui/button";

export const CustomButton = () => {
  return (
    <Button 
      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 rounded-full"
    >
      Gradient Button
    </Button>
  );
};
```

### Common Tailwind Utilities
- `className="mt-4"` - Margin top
- `className="p-6"` - Padding
- `className="w-full"` - Width
- `className="max-w-md"` - Max width
- `className="gap-4"` - Gap between children
- `className="space-y-4"` - Vertical spacing between children
- `className="flex items-center justify-between"` - Flexbox alignment
- `className="rounded-lg"` - Border radius
- `className="shadow-md"` - Shadow
- `className="border"` - Border
- `className="bg-slate-50"` - Background color

## Best Practices

### ✅ Do:
- Use shadcn components for all UI elements
- Combine multiple shadcn components to create features
- Use Tailwind classes to customize appearance
- Check shadcn documentation for available props
- Import only what you need from shadcn
- Use semantic component composition (Button + Card + Input, etc.)
- Utilize form integrations (react-hook-form + Form component)

### ❌ Do NOT:
- Create custom button, input, card, or other UI components
- Style elements from scratch when shadcn has a component
- Use HTML elements directly when shadcn alternatives exist
- Mix custom components with shadcn
- Create wrappers around shadcn components (unless absolutely necessary)
- Duplicate component functionality

## Component Accessibility

All shadcn components are built on Radix UI primitives and include:
- ARIA attributes by default
- Keyboard navigation support
- Screen reader compatibility
- Focus management

You don't need to add accessibility features manually - they're built-in.

```typescript
// ✅ Good: shadcn Button has accessibility built-in
import { Button } from "@/components/ui/button";

export const AccessibleButton = () => {
  return <Button>Accessible by default</Button>;
};
```

## Available Components

Common shadcn/ui components available:

- **Layout**: Card, Tabs, Accordion, Collapsible
- **Forms**: Input, Textarea, Checkbox, Radio, Select, Switch, Slider
- **Buttons**: Button, Toggle, Toggle Group
- **Dialogs**: Dialog, Alert Dialog, Drawer, Popover
- **Data Display**: Table, Badge, Avatar, Progress, Skeleton
- **Navigation**: Breadcrumb, Sheet, Sidebar
- **Feedback**: Toast, Tooltip, Sonner
- **Input**: Combobox, Command, Date Picker, Time Picker

See [shadcn/ui documentation](https://ui.shadcn.com) for complete list and detailed prop documentation.

## Integration with Other Libraries

### react-hook-form
Use with shadcn Form component:

```typescript
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const MyForm = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="field"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Field</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
};
```

### Zod (Validation)
Combine with react-hook-form for type-safe forms:

```typescript
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(2, "Name too short"),
});

export const TypeSafeForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      {/* Form fields */}
    </Form>
  );
};
```

## Styling Patterns

### Space & Gap
```typescript
import { Card, CardContent } from "@/components/ui/card";

export const SpacedContent = () => {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        {/* Use space-y for vertical spacing between children */}
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </CardContent>
    </Card>
  );
};
```

### Flexbox Layouts
```typescript
import { Button } from "@/components/ui/button";

export const FlexLayout = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <h2>Title</h2>
      <Button>Action</Button>
    </div>
  );
};
```

### Responsive Design
```typescript
import { Card } from "@/components/ui/card";

export const ResponsiveCard = () => {
  return (
    <Card className="w-full md:w-1/2 lg:w-1/3">
      {/* Responsive widths: full on mobile, 50% on tablet, 33% on desktop */}
      Content
    </Card>
  );
};
```

## Common Patterns

### Modal Dialog
```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ModalPattern = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modal Title</DialogTitle>
          </DialogHeader>
          {/* Content */}
        </DialogContent>
      </Dialog>
    </>
  );
};
```

### Card with Actions
```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const CardWithActions = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Item</CardTitle>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Edit</Button>
          <Button size="sm" variant="destructive">Delete</Button>
        </div>
      </CardHeader>
      <CardContent>Content</CardContent>
    </Card>
  );
};
```
