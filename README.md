# Seller Console App

This project is a modern seller console application built with React and TypeScript for managing leads and opportunities.

## ✨ Features

- **Leads Management**: View, filter, and manage sales leads with comprehensive data
- **Opportunities Tracking**: Monitor and track sales opportunities through the pipeline
- **Advanced Filtering**: Filter leads by status, search by name or company, and sort by score
- **Responsive Design**: Optimized for both desktop and mobile devices with adaptive layouts
- **Lead Conversion**: Convert leads to opportunities with detailed forms
- **Real-time Updates**: Powered by TanStack Query for efficient data management

## 🚀 Tech Stack

**Frontend:** React 19, Vite, TypeScript, Tailwind CSS.  
**UI Components:** Radix UI, shadcn/ui, Lucide React icons.  
**State Management:** TanStack Query, React Hook Form.  
**Routing:** TanStack Router.  
**Other Libraries:** Zod for validation, Sonner for notifications.

## 📦 Getting Started

Clone the project and install dependencies:

```bash
git clone https://github.com/your-username/seller-console-app.git
cd seller-console-app
pnpm i
```

Start the development server:

```bash
pnpm dev
```

## 📁 Folder Structure

```
src/
├── components/     # Reusable UI components
│   └── ui/        # shadcn/ui components (buttons, forms, tables, etc.)
├── pages/         # Application pages
│   ├── leads/     # All logic related to leads management
│   │   ├── components/  # Lead-specific components
│   │   └── hooks/      # Lead-specific hooks
│   └── opportunities/  # Opportunities management
├── hooks/         # Custom hooks (queries, mutations, utilities)
├── providers/     # App providers (QueryClient, etc.)
├── routes/        # TanStack Router route definitions
├── lib/           # Utility functions
├── constants/     # App constants
├── App.tsx
├── types.d.ts     # Global TypeScript types
└── main.tsx
```

## 🔍 What I Focused On

- **Clean Architecture**: Modular structure with clear separation of concerns
- **Type Safety**: Comprehensive TypeScript implementation throughout
- **Performance**: Lazy loading, efficient data fetching, and optimized re-renders
- **User Experience**: Responsive design, loading states, and intuitive interactions
- **Code Quality**: ESLint configuration, consistent formatting, and reusable components

## 🙋‍♂️ About Me

This project demonstrates modern React development practices and full-stack application architecture.  
If you have any questions or want to discuss it further, feel free to reach out:

João Matheus Tripoli – [LinkedIn](https://www.linkedin.com/in/joao-tripoli/)
