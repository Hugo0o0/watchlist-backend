export class AppEror extends Error {
  public readonly isOperational: boolean;
  public status: string;
  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}
