export default class SyntaxError extends Error {
  private statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}
