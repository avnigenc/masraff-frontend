import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Expense } from '../../models/business/expense.model';
import { Currency } from '../../models/business/currency.model';
import { VatRate } from '../../models/business/vat-rate.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { CreateExpenseRequest } from '../../models/api/request-models/create-expense-request.model';
import { User } from 'src/app/models/business/user.model';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-or-update-expense',
  templateUrl: './create-or-update-expense.component.html',
  styleUrls: ['./create-or-update-expense.component.scss'],
})
export class CreateOrUpdateExpenseComponent implements OnInit {

  isEditable = false;

  expense: Expense;
  currencies: Currency[];
  vatRates: VatRate[];
  title: string;
  createOrUpdateForm: FormGroup;
  user: User;

  isAuth = false;
  createExpense: CreateExpenseRequest;

  constructor(
    public dialogRef: MatDialogRef<CreateOrUpdateExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService,
    private storageService: StorageService,
    private authService: AuthService,
    private toastr: ToastrService) {
    this.expense = data.expense;
    this.vatRates = data.meta.vatRates;
    this.currencies = data.meta.currencies;
    this.isEditable = data.isEditable;
    this.title = data.title;

    this.createOrUpdateForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      totalAmount: ['', Validators.required],
      vatAmount: ['', Validators.required],
      receiptNo: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      receiptDate: ['', Validators.required],
      expenseDepositDate: ['', Validators.required],
    });
    if (!this.isEditable) {
      this.createOrUpdateForm.disable();
    }
    this.isAuth = this.storageService.isAuthenticated();
    if (this.isAuth) {
      this.authService.getCurrentUser().subscribe((response) => {
        this.user = response;
      }, (error: any) => {
        console.log(error);
      });
    }
    this.createExpense = new CreateExpenseRequest();
  }

  ngOnInit() {

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

  close(isAction = false) {
    this.dialogRef.close(isAction);
  }

  create() {
    if (!this.createOrUpdateForm.valid &&
          this.createExpense.vat_rate_id !== undefined &&
            this.createExpense.currency_id !== undefined) {
      console.log(this.createOrUpdateForm);
      this.createOrUpdateForm.markAllAsTouched();
      return;
    }


    this.createExpense.companyName = this.createOrUpdateForm.get('companyName').value;
    this.createExpense.totalAmount = +this.createOrUpdateForm.get('totalAmount').value;
    this.createExpense.vatAmount = +this.createOrUpdateForm.get('vatAmount').value;
    this.createExpense.receiptNo = +this.createOrUpdateForm.get('receiptNo').value;
    // @ts-ignore
    this.createExpense.receiptDate = '2020-06-26T17:03:55.813Z';
    // @ts-ignore
    this.createExpense.expenseDepositDate = '2020-06-26T17:03:55.813Z';
    this.createExpense.user_id = this.user.id;
    console.log(this.createExpense);

    this.expenseService.create(this.createExpense).subscribe(
      (response) => {
        this.toastr.success('Fiş oluşturuldu');
        this.close(true);
        console.log(response);
    }, (error: any) => {
      console.log(error);
    });

    console.log('create passsed');

  }

  update() {
    console.log('update');
    if (!this.createOrUpdateForm.valid) {
      return;
    }

    this.expenseService.update(this.createOrUpdateForm.value).subscribe(
      (response) => {
        console.log(response);
      }, (error: any) => {
        console.log(error);
      });
  }

  setCurrency($event: any) {
    this.createExpense.currency_id = $event.value;
  }

  setVatRate($event: any) {
    this.createExpense.vat_rate_id = $event.value;
  }

}
