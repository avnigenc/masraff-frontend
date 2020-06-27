import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/business/expense.model';
import { User } from '../models/business/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myExpenses: Expense[];
  isAuth = false;
  user: User;

  constructor(
    private storageService: StorageService,
    private expenseService: ExpenseService,
    private authService: AuthService
  ) {
    this.isAuth = this.storageService.isAuthenticated();
    if (this.isAuth) {
      this.authService.getCurrentUser().subscribe((response) => {
        console.log(response);
        this.user = response;
        this.getAllExpensesById(this.user.id);
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  ngOnInit() {
  }

  getAllExpensesById(id: string) {
    this.expenseService.getAllExpensesById(id).subscribe((response) => {
      console.log(response);
      this.myExpenses = response;
    }, (error: any) => {
      console.log(error);
    });
  }

}
