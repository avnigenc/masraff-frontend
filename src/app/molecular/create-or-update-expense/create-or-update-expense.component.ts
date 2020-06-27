import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Expense } from '../../models/business/expense.model';
import { Currency } from '../../models/business/currency.model';
import { VatRate } from '../../models/business/vat-rate.model';

@Component({
  selector: 'app-create-or-update-expense',
  templateUrl: './create-or-update-expense.component.html',
  styleUrls: ['./create-or-update-expense.component.scss']
})
export class CreateOrUpdateExpenseComponent implements OnInit {

  isEditable = false;
  expense: Expense;
  currencies: Currency[];
  vatRates: VatRate[];

  ngOnInit() { }

  constructor(
    public dialogRef: MatDialogRef<CreateOrUpdateExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.expense = data.expense;
    this.vatRates = data.meta.vatRates;
    this.currencies = data.meta.currencies;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
