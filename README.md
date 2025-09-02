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
