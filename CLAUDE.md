# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Test Commands
```
yarn start               # Start development server
yarn build               # Build for production
yarn eslint              # Run linting
yarn test                # Run all tests
yarn test src/path/file.spec.js  # Run a single test file
yarn test-a11y           # Run accessibility tests
```

## Code Style Guidelines
- **TypeScript**: Strict mode, React JSX, ESNext target
- **Naming**: PascalCase for components, camelCase for functions/variables, kebab-case for folders
- **Components**: Use functional components with hooks
- **React**: Use Zendesk Garden components and follow their patterns
- **Testing**: Jest with Testing Library, files named `.spec.js` or `.test.tsx`
- **Formatting**: ESLint with Prettier
- **Imports**: Use TypeScript's consistent imports, prefer named exports
- **Internationalization**: Use i18next with module-specific translations
- **Error Handling**: Use TypeScript's type safety, avoid silent failures
- **Commits**: Follow conventional commit format