import { isServer } from './shared/lib';
import { Config, LogLevel } from './types';

class Logpack {
  private static instance: Logpack;

  private constructor() {
    throw new Error('Logpack is a static class and cannot be instantiated.');
  }

  public static info(message: any, config: Config = { display: true }) {
    this.dispatch(message, LogLevel.LOG, config);
  }

  public static warn(message: any, config: Config = { display: true }) {
    this.dispatch(message, LogLevel.WARN, config);
  }

  public static error(message: any, config: Config = { display: true }) {
    this.dispatch(message, LogLevel.ERROR, config);
  }

  private static dispatch(message: any, level: LogLevel, config: Config) {
    if (!config.display) {
      return;
    }

    const formattedMessage = this.formatMessage(message);

    let identifier = level === LogLevel.LOG ? 'INFO' : level;

    if (config.noColor) {
      console.log(`[${identifier.toUpperCase()}] [${this.getTime()}] ${formattedMessage}`);
    } else {
      console[level](`[${identifier.toUpperCase()}] [${this.getTime()}] ${formattedMessage}`);
    }
  }

  private static getTime = () => {
    const now = new Date();

    const formatted = now
      .toLocaleString('tr-TR', {
        // fractionalSecondDigits: 3,
        second: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(',', '');

    return formatted;
  };

  private static formatMessage(message: any) {
    if (isServer && typeof message === 'object') {
      return JSON.stringify(message, null, '\t');
    }

    return message;
  }
}

export default Logpack;
