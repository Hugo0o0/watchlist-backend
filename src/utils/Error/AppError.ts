export class AppEror extends Error {
  public readonly isOperational: boolean;
  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
