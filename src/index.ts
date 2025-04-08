import { isServer } from './shared/lib';

class Logger {
  private static instance: Logger;

  private constructor() {
    throw new Error('Logger is a static class and cannot be instantiated.');
  }

  public static info(message: any, display: boolean = true) {
    if (!display) {
      return;
    }

    const formattedMessage = this.formatMessage(message);

    console.log(`[INFO] [${this.getTime()}] ${formattedMessage}`);
  }

  public static warn(message: any, display: boolean = true) {
    if (!display) {
      return;
    }

    const formattedMessage = this.formatMessage(message);

    console.warn(`[WARN] [${this.getTime()}] ${formattedMessage}`);
  }

  public static error(message: any, display: boolean = true) {
    if (!display) {
      return;
    }

    const formattedMessage = this.formatMessage(message);

    console.error(`[ERROR] [${this.getTime()}] ${formattedMessage}`);
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

export default Logger;
