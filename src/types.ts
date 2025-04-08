export type Config = Partial<{
  locale: string;
  dateFormat: Record<string, string>;
  display: boolean;
  displayColor?: boolean;
  displayDate?: boolean;
  displayLevel?: boolean;
}>;

export enum LogLevel {
  LOG = 'log',
  WARN = 'warn',
  ERROR = 'error',
}
