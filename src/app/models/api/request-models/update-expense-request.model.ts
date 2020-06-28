export class UpdateExpenseRequest {
  id: number;
  companyName: string;
  totalAmount: number;
  vatAmount: number;
  // tslint:disable-next-line:variable-name
  vat_rate_id: number;
  // tslint:disable-next-line:variable-name
  currency_id: number;
  // tslint:disable-next-line:variable-name
  user_id: number;
  receiptNo: number;
  receiptDate: Date;
  expenseDepositDate: Date;
}
