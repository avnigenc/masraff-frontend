import { VatRate } from './vat-rate.model';
import { Currency } from './currency.model';
import { User } from './user.model';

export class Expense {
  id: number;
  companyName: string;
  totalAmount: number;
  vatAmount: number;
  receiptNo: number;
  receiptDate: Date;
  expenseDepositDate: Date;

  // tslint:disable-next-line:variable-name
  vat_rate_id: number;
  // tslint:disable-next-line:variable-name
  currency_id: number;
  // tslint:disable-next-line:variable-name
  user_id: number;

  vatRate: VatRate;
  currency: Currency;
  user: User;

  // tslint:disable-next-line:variable-name
  created_at: Date;
  // tslint:disable-next-line:variable-name
  updated_at: Date;

  constructor() {
    this.companyName = '';
    this.totalAmount = 0;
    this.vatAmount = 0;
    this.receiptNo = 0;
    this.vatRate = new VatRate();
    this.currency = new Currency();
    this.user = new User();
    this.receiptDate = new Date();
    this.expenseDepositDate = new Date();
  }
}
