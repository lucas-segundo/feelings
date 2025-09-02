# Feeling - Share Kindness to the World

A web platform designed to spread positivity and kindness through anonymous messages. Users can send heartfelt messages, like others' messages, and read the latest messages shared by the community.

## Features

- **Send Messages**: Share kind thoughts, encouragement, or positive vibes with the world
- **Like Messages**: Show appreciation for messages that resonate with you
- **Read Latest Messages**: Browse through the most recent messages from the community
- **Sentiment Analysis**: Messages are analyzed to ensure they maintain a positive tone
- **Authentication**: Secure sign-in with Google and LinkedIn providers
- **Internationalization**: Support for multiple languages (English and Portuguese)

## Tech Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **AI**: Google Gemini for sentiment analysis
- **Styling**: Tailwind CSS with shadcn/ui components
- **Testing**: Vitest with React Testing Library
- **Architecture**: Hexagonal Architecture (Ports & Adapters)

## Getting Started

First, run the development server:

```bash
docker compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure (Hexagonal Architecture)

This project follows Hexagonal Architecture (Ports & Adapters). The core domain is isolated from external concerns via ports (interfaces) implemented by adapters.

### Directory Tree (src)

```
src/
  app/                     # Application logic and use cases
    entities/              # Domain models (pure types)
    ports/                 # Port interfaces and their adapters
    useCases/              # Application services orchestrating ports/entities

  infra/                  # Configurations for external dependencies

  presentation/            # UI and I/O boundaries using React.js
    components/            # Reusable UI components
    func/                  # Functions for server-side rendering and client-side rendering
    hooks/                 # UI-facing hooks (query/session/state helpers)
    i18n/                  # Translations and routing helpers
    screens/               # Page-level UI composition (e.g., Home)
    styles/                # Global styles
    utils/                 # Presentation utilities
```

### How it maps to Hexagonal concepts

- Core domain lives in `src/app` and does not import from `infra` or `presentation`.
  - `entities`: domain data structures and logic.
  - `ports`: stable interfaces the domain depends on; each folder contains `adapter.ts` (implements the port), `factory.ts`, and tests to guide usage/contract.
  - `useCases`: application services orchestrating entities through ports (e.g., `SendMessage`).

- Infrastructure has the configurations for external dependencies to enable the adapters inside `src/app` work.

- Presentation depends ONLY on ports and use cases to present the data to the user.
