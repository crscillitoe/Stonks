export class Logger {
  private static originalLogger;
  private static debug = false;

  static overwriteLogger() {
    this.originalLogger = console.log;
    console.log = this.log;
  }

  static setDebug(debug: boolean) {
    this.debug = debug;
  }

  static log(message: string) {
    this.originalLogger(message);
  }
}
