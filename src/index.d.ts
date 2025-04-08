declare class Logger {
  private static instance;
  private constructor();
  static info(message: any, display?: boolean): void;
  static warn(message: any, display?: boolean): void;
  static error(message: any, display?: boolean): void;
  private static getTime;
  private static formatMessage;
}

export default Logger;
