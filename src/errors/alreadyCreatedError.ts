export default class AlreadyCreatedError extends Error {
  private statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 409;
  }
}
