# LogPack

A lightweight, flexible TypeScript logger with formatted timestamps.

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
import { Logger } from 'logpack';

// Log information
Logger.info('Application started');

// Log warnings
Logger.warn('This feature is deprecated');

// Log errors
Logger.error('Failed to connect to the database');

// Log objects
Logger.info({ user: 'John', role: 'admin' });

// Conditionally log (useful for environment-specific logging)
const isDev = process.env.NODE_ENV === 'development';
Logger.info('Debug message', isDev);
```

## Features

- Formatted timestamps
- Different log levels (info, warn, error)
- Automatic pretty-printing of objects on the server
- Conditional logging
- TypeScript support

## License

MIT