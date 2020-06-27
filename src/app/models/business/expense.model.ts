import { VatRate } from './vat-rate.model';
import { Currency } from './currency.model';

export class Expense {
  id: string;
  companyName: string;
  totalAmount: number;
  vatAmount: number;
  receiptNo: number;
  receiptDate: Date;
  expenseDepositDate;

  vatRateId: number;
  currencyId: number;

  vatRate: VatRate;
  currency: Currency;

  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.vatRate = new VatRate();
    this.currency = new Currency();
  }
}
