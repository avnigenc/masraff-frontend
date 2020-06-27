import {BaseResponse} from '../base-response.model';
import { User } from '../../business/user.model';

export class LoginResponse extends BaseResponse {
  user: User;
  token: string;
  constructor() {
    super();
  }
}
