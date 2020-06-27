import { BaseResponse } from '../base-response.model';

export class RegisterResponse extends BaseResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    super();
  }
}
