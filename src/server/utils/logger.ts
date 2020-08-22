// in production application, we better use any logger library such as morgan, winston and others
// for sake of simplicity, using console to log info, debug or error

export default class Logger {
  private log(level: string, message: string) {
    console.log(
      `${new Date().toISOString()} - [${level.toUpperCase()}] - ${message}`,
    );
  }

  public info(message: string): void {
    this.log('info', message);
  }

  public debug(message: string): void {
    this.log('log', message);
  }

  public error(message: string): void {
    this.log('error', message);
  }
}
