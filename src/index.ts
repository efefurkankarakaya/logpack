import { isServer } from './shared/lib';
import { Config, LogLevel } from './types';

class Logpack {
  private static instance: Logpack;

  private constructor() {
    throw new Error('Logpack is a static class and cannot be instantiated.');
  }

  public static info(message: any, config: Config = { display: true }) {
    if (!config.display) {
      return;
    }

    const formattedMessage = this.formatMessage(message);

    console.log(`[${LogLevel.INFO}] [${this.getTime()}] ${formattedMessage}`);
  }

  public static warn(message: any, config: Config = { display: true }) {
    if (!config.display) {
      return;
    }

    const formattedMessage = this.formatMessage(message);

    if (config.noColor) {
      console.log(`[${LogLevel.WARN}] [${this.getTime()}] ${formattedMessage}`);
    } else {
      console.warn(`[${LogLevel.WARN}] [${this.getTime()}] ${formattedMessage}`);
    }
  }

  public static error(message: any, config: Config = { display: true }) {
    if (!config.display) {
      return;
    }

    const formattedMessage = this.formatMessage(message);

    if (config.noColor) {
      console.log(`[${LogLevel.ERROR}] [${this.getTime()}] ${formattedMessage}`);
    } else {
      console.error(`[${LogLevel.ERROR}] [${this.getTime()}] ${formattedMessage}`);
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
