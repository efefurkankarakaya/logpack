import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import Logpack from '../src/index';

describe('Logpack', () => {
  let consoleLogSpy: any;
  let consoleWarnSpy: any;
  let consoleErrorSpy: any;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('info logs message correctly', () => {
    const message = 'test info message';
    Logpack.info(message, {});

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy.mock.calls[0][0]).toContain('[INFO]');
    expect(consoleLogSpy.mock.calls[0][0]).toContain(message);
  });

  test('warn logs message with console.warn', () => {
    const message = 'test warning message';
    Logpack.warn(message, {});

    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy.mock.calls[0][0]).toContain('[WARN]');
    expect(consoleWarnSpy.mock.calls[0][0]).toContain(message);
  });

  test('warn logs message with console.log when displayColor is false', () => {
    const message = 'test warning no color';
    Logpack.warn(message, { display: true, displayColor: false });

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    expect(consoleLogSpy.mock.calls[0][0]).toContain('[WARN]');
    expect(consoleLogSpy.mock.calls[0][0]).toContain(message);
  });

  test('error logs message with console.error', () => {
    const message = 'test error message';
    Logpack.error(message, {});

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy.mock.calls[0][0]).toContain('[ERROR]');
    expect(consoleErrorSpy.mock.calls[0][0]).toContain(message);
  });

  test('error logs message with console.log when displayColor is false', () => {
    const message = 'test error no color';
    Logpack.error(message, { display: true, displayColor: false });

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleLogSpy.mock.calls[0][0]).toContain('[ERROR]');
    expect(consoleLogSpy.mock.calls[0][0]).toContain(message);
  });

  test('does not log when display is false', () => {
    Logpack.info('test', { display: false });
    Logpack.warn('test', { display: false });
    Logpack.error('test', { display: false });

    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  test('formats object messages correctly', () => {
    const obj = { key: 'value' };
    Logpack.info(obj, {});

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy.mock.calls[0][0]).toContain(JSON.stringify(obj, null, '\t'));
  });

  test('logs without date when displayDate is false', () => {
    const message = 'no date message';
    Logpack.info(message, { displayDate: false });

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy.mock.calls[0][0]).toContain('[INFO]');
    expect(consoleLogSpy.mock.calls[0][0]).toContain(message);
    expect(consoleLogSpy.mock.calls[0][0]).not.toMatch(/\[\d{2}\/\d{2}\/\d{4}/);
  });

  test('logs without level when displayLevel is false', () => {
    const message = 'no level message';
    Logpack.info(message, { displayLevel: false });

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy.mock.calls[0][0]).not.toContain('[INFO]');
    expect(consoleLogSpy.mock.calls[0][0]).toContain(message);
  });

  test('configure method updates global config', () => {
    const customLocale = 'tr-TR';
    Logpack.configure({ locale: customLocale });

    const message = 'configured message';
    Logpack.info(message, {});

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy.mock.calls[0][0]).not.toMatch(/\[\d{2}\/\d{2}\/\d{4}/);
    expect(consoleLogSpy.mock.calls[0][0]).toContain(message);
  });
});
