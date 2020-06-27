import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Expense } from '../../models/business/expense.model';
import { Currency } from '../../models/business/currency.model';
import { VatRate } from '../../models/business/vat-rate.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  title: string;
  createOrUpdateForm: FormGroup;

  ngOnInit() { }

  constructor(
    public dialogRef: MatDialogRef<CreateOrUpdateExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    this.expense = data.expense;
    this.vatRates = data.meta.vatRates;
    this.currencies = data.meta.currencies;
    this.isEditable = data.isEditable;
    this.title = data.title;

    this.createOrUpdateForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      totalAmount: ['', Validators.required],
      vatAmount: ['', Validators.required],
      vatRate: ['', Validators.required],
      currency: ['', Validators.required],
      receiptNo: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      receiptDate: ['', Validators.required],
      expenseDepositDate: ['', Validators.required],
    });
    this.createOrUpdateForm.disable();
  }

  enableForm() {
    this.createOrUpdateForm.enable();
    this.isEditable = true;
  }

  disableForm() {
    this.createOrUpdateForm.disable();
    this.isEditable = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create() {
    if (!this.createOrUpdateForm.valid) {
      console.log(this.createOrUpdateForm);
      this.createOrUpdateForm.markAllAsTouched();
      return;
    }

    console.log('create passsed');

  }

  update() {
    console.log('update');
    if (!this.createOrUpdateForm.valid) {
      return;
    }
  }

}
