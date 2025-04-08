import { isServer } from './shared/lib';
import { Config, LogLevel } from './types';

class Logpack {
  private static instance: Logpack;

  private static globalConfig: Config = {
    locale: 'en-US',
    dateFormat: {
      second: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    },
    display: true,
    displayColor: true,
    displayDate: true,
    displayLevel: true,
  };

  private constructor() {
    throw new Error('Logpack is a static class and cannot be instantiated.');
  }

  public static configure(config: Config) {
    this.globalConfig = { ...this.globalConfig, ...config };
  }

  public static info(message: any, config: Config) {
    this.dispatch(message, LogLevel.LOG, config);
  }

  public static warn(message: any, config: Config) {
    this.dispatch(message, LogLevel.WARN, config);
  }

  public static error(message: any, config: Config) {
    this.dispatch(message, LogLevel.ERROR, config);
  }

  private static dispatch(message: any, level: LogLevel, config: Config) {
    const mergedConfig = { ...this.globalConfig, ...config };

    if (!mergedConfig.display) {
      return;
    }

    const formattedMessage = this.formatMessage(message);

    const time = this.getTime(mergedConfig.locale, mergedConfig.dateFormat);

    let constructedMessage = '';

    if (mergedConfig.displayDate) {
      constructedMessage += `[${time}] `;
    }

    if (mergedConfig.displayLevel) {
      const identifier = level === LogLevel.LOG ? 'INFO' : level;
      constructedMessage += `[${identifier.toUpperCase()}] `;
    }

    constructedMessage += formattedMessage;

    if (mergedConfig.displayColor) {
      console[level](constructedMessage);
    } else {
      console.log(constructedMessage);
    }
  }

  private static getTime = (locale: Config['locale'], dateFormat: Config['dateFormat']) => {
    const now = new Date();

    const formatted = now.toLocaleString(locale, dateFormat).replace(',', '');

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
