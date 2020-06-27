export class UpdateExpenseRequest {
  id: string;
  companyName: string;
  totalAmount: number;
  vatAmount: number;
  // tslint:disable-next-line:variable-name
  vat_rate_id: number;
  // tslint:disable-next-line:variable-name
  currency_id: number;
  receiptNo: number;
  receiptDate: Date;
  expenseDepositDate: Date;
}
