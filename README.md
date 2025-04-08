# Logpack

A lightweight and zero dependency logging package for React and Next.js.

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
const isProduction = process.env.NODE_ENV === 'production';
Logpack.info('Debug message', { display: !isProduction });

// Configure global settings
Logpack.configure({
  locale: 'en-US',
  displayDate: true,
  displayLevel: true,
  displayColor: true,
});
```

## Configuration Options

```typescript
interface Config {
  locale?: string;         // Locale for timestamp formatting (default: 'en-US')
  dateFormat?: Record<string, string>; // Date formatting options
  display?: boolean;       // Whether to display logs (default: true)
  displayColor?: boolean;  // Enable colored logs (default: false)
  displayDate?: boolean;   // Show timestamps in logs (default: false)
  displayLevel?: boolean;  // Show log level (INFO, WARN, ERROR) (default: false)
}
```

You can provide configuration options:
1. Globally using `Logpack.configure()`
2. Per log statement as a second parameter: `Logpack.info('message', config)`

## Features

- Formatted timestamps with customizable locale and format
- Different log levels (info, warn, error)
- Automatic pretty-printing of objects on the server
- Conditional logging for environment-specific output
- Global configuration with per-log overrides
- TypeScript support
- Zero dependencies

## License

MIT