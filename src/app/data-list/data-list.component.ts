import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditButtonComponent } from '../atomic/edit-button/edit-button.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrUpdateExpenseComponent } from '../molecular/create-or-update-expense/create-or-update-expense.component';
import { MetaDataService } from '../services/meta-data.service';
import { Expense } from '../models/business/expense.model';
import { Currency } from '../models/business/currency.model';
import { VatRate } from '../models/business/vat-rate.model';
import { StorageService } from '../services/storage.service';
import { User } from '../models/business/user.model';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  settings = {
    columns: {
      companyName: {
        title: 'Şirket'
      },
      totalAmount: {
        title: 'Toplam tutar'
      },
      vatAmount: {
        title: 'KDV tutarı'
      },
      vatRate: {
        title: 'KDV oranı',
        valuePrepareFunction: (vatRate) => {
          return vatRate.amount;
        },
      },
      currency: {
        title: 'Para birimi',
        valuePrepareFunction: (currency) => {
          return currency.name;
        },
      },
      button: {
        title: '',
        type: 'custom',
        filter: false,
        renderComponent: EditButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe((row) => {
            this.openDialog(row, 'İncele/Güncelle');
          });
        }
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    },
    noDataMessage: 'masraf yok',
  };
  expenses: Expense[];
  currencies: Currency[];
  vatRates: VatRate[];
  user: User;
  @Output() valueChange = new EventEmitter();


  constructor(
    public dialog: MatDialog,
    private metaDataService: MetaDataService,
    public storageService: StorageService
  ) { }


  valueChanged(isAction = false) {
    this.valueChange.emit(isAction);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.metaDataService.getAllExpenses().subscribe((response) => {
      this.expenses = response;
    }, (error: any) => {
      console.log(error);
    });

    this.metaDataService.getAllVatRates().subscribe((response) => {
      this.vatRates = response;
    }, (error: any) => {
      console.log(error);
    });

    this.metaDataService.getAllCurrencies().subscribe((response) => {
      this.currencies = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  openDialog(row: any, dialogTitle, isEdit = false): void {
    const dialogRef = this.dialog.open(CreateOrUpdateExpenseComponent, {
      width: '400px',
      data: { expense: row, meta: { currencies: this.currencies, vatRates: this.vatRates }, isEditable: isEdit, title: dialogTitle, user: this.user }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.valueChanged(true);
      }
      console.log('The dialog was closed');
    });
  }

  createExpense() {
    console.log('test');
    const expense = new Expense();
    this.openDialog(expense, 'Yeni oluştur', true);
  }
}
