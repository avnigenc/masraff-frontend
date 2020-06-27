import { VatRate } from './vat-rate.model';
import { Currency } from './currency.model';
import { User } from './user.model';

export class Expense {
  id: string;
  companyName: string;
  totalAmount: number;
  vatAmount: number;
  receiptNo: number;
  receiptDate: Date;
  expenseDepositDate;

  // tslint:disable-next-line:variable-name
  vat_rate_id: number;
  // tslint:disable-next-line:variable-name
  currency_id: number;
  // tslint:disable-next-line:variable-name
  user_id: number;

  vatRate: VatRate;
  currency: Currency;
  user: User;

  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.companyName = '';
    this.totalAmount = 0;
    this.vatAmount = 0;
    this.receiptNo = 0;
    this.vatRate = new VatRate();
    this.currency = new Currency();
    this.user = new User();
  }
}
