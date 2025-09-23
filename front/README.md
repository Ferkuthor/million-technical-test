# Real Estate Properties Application

This is the frontend application developed with Next.js for managing and viewing real estate properties.

## Features

- **Properties Listing**: Paginated view with basic property cards.
- **Advanced Filters**: Allows filtering properties by various criteria.
- **Detailed View**: Individual page with complete information, image gallery, owner data, and transaction history.
- **Moodboard**: Dedicated page for visual inspiration.
- **Responsive Design**: Optimized for mobile and desktop devices.
- **State Management**: Uses Zustand for global state management.
- **Data Fetching**: TanStack Query for efficient API queries.

## Tech Stack

- **Framework**: Next.js 15 (with Turbopack)
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS 4, Shadcn UI
- **State**: Zustand
- **Data**: TanStack React Query
- **Testing**: Vitest, Testing Library

## Prerequisites

- Node.js 18 or higher

## Configuration

The application connects to a backend API. To change the backend base URL, edit the file `src/config/app-config.ts`.
Make sure the backend is running at the specified URL before starting the frontend application.

## Running

### Development

```bash
npm install
npm run dev
```

## Testing

Run tests with Vitest:

```bash
# Run all tests
npm test

# With UI
npm run test:ui

# Watch mode
npm run test

# Coverage
npm run test:coverage
```

## Project Structure

The project follows a modular architecture designed to be scalable and maintainable. Each feature is organized as an independent module containing its own components, hooks, stores, and tests. This modular organization allows components to be easily extracted and migrated to other projects, as each module encapsulates its dependencies and logic within its own directory structure.

```
front/
├── src/
│   ├── app/
│   │   ├── properties/         # Properties module
│   │   │   ├── __components__/ # Properties list components
│   │   │   │   └── tests/      # Components Tests
│   │   │   ├── [id]/           # property details module
│   │   │   │   ├── __components__/ # Detail page components
│   │   │   │   └── tests/      # Components Tests
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── stores/         # State stores
│   │   ├── moodboard/          # Moodboard UI inspiration
│   ├── components/             # Shared reusable UI components & layouts
│   ├── lib/                    # Utilities and types
│   └── config/                 # App configuration
└── public/                     # Static assets
```

## API Integration

The application consumes a REST API with the following main endpoints:

- `GET /api/properties` - Paginated list of properties
- `GET /api/properties/{id}` - Complete property details

Data types are defined in `src/lib/types/properties.ts`.
