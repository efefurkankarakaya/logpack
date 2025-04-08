# Logpack

A lightweight logging package for React and Next.js

## Installation

```bash
npm install logpack
# or
yarn add logpack
# or
pnpm add logpack
```

## Usage

```typescript
import Logpack from 'logpack';

// Log information
Logpack.info('Application started');

// Log warnings
Logpack.warn('This feature is deprecated');

// Log errors
Logpack.error('Failed to connect to the database');

// Log objects
Logpack.info({ user: 'John', role: 'admin' });

// Conditionally log (useful for environment-specific logging)
const isDev = process.env.NODE_ENV === 'development';
Logpack.info('Debug message', isDev);
```

## Features

- Formatted timestamps
- Different log levels (info, warn, error)
- Automatic pretty-printing of objects on the server
- Conditional logging
- TypeScript support

## License

MIT