import * as _ from "lodash";
export class Logger {
  private static debug = false;
  private static log = true;

  static doLog(message: string | object) {}

  static overwriteLogger() {
    const separator = "----------";
    console.log = (message?: any, ...optionalParams: any[]) => {
      if (this.log) {
        if (optionalParams.length > 0) {
          console.info(message, optionalParams);
        } else {
          console.info(message);
        }
      }
    };
    console.debug = (message?: any, ...optionalParams: any[]) => {
      if (this.debug) {
        console.info(`${separator}`);
        console.info(`${Logger.lineNumber()}`);
        if (optionalParams.length > 0) {
          console.info(message, optionalParams);
        } else {
          console.info(message);
        }
        console.info(`${separator}`);
      }
    };
  }

  static lineNumber(): string {
    const stack = new Error().stack.toString().split(/\r\n|\n/);
    const lineNumber = stack[3].split("(")[1];
    return `(${lineNumber}`;
  }

  static disableLogging() {
    this.log = false;
  }

  static enableDebug() {
    this.debug = true;
  }
}
