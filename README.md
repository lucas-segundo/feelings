## Project Structure (Hexagonal Architecture)

This project follows Hexagonal Architecture (Ports & Adapters). The core domain is isolated from external concerns via ports (interfaces) implemented by adapters.

### Directory Tree (src)

```text
src/
  app/                     # Application logic and use cases
    entities/              # Domain models (pure types)
    ports/                 # Port interfaces and their adapters
    useCases/              # Application services orchestrating ports/entities for business logic

  infra/                  # Configurations for external dependencies

  presentation/            # UI and I/O boundaries using React.js
    components/            # Reusable UI components
    func/                  # Boundary functions (server/client) for server-side rendering and client-side rendering
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

### Practical notes

- New features should start at the domain: define or reuse `entities`, define/update `ports` following the presentation layer's needs.
- `useCases` are used to orchestrate many ports and entities. Don't need to create a use case for each port.
- `presentation` layer is only responsible for the UI and I/O boundaries using React.js and the tools from Next.js.
