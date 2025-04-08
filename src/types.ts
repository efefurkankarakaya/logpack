export type Config = {
  display: boolean;
  noColor?: boolean;
};

export enum LogLevel {
  LOG = 'log',
  WARN = 'warn',
  ERROR = 'error',
}
