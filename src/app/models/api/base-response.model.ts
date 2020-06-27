export class BaseResponse {
  error: string;
  message: string;
  statusCode: number;

  constructor() {
    this.statusCode = 666;
  }
}
