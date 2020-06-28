import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateExpenseRequest } from '../models/api/request-models/create-expense-request.model';
import { UpdateExpenseRequest } from '../models/api/request-models/update-expense-request.model';
import { Expense } from '../models/business/expense.model';

const routes = {
  create: () => `http://localhost:3000/expenses/create`,
  update: () => `http://localhost:3000/expenses/update`,
  getAllExpensesById: () => `http://localhost:3000/expenses/getAllExpensesById`,
};

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) {}

  create(createExpenseRequest: CreateExpenseRequest): Observable<Expense> {
    return this.http.post<Expense>(routes.create(), createExpenseRequest);
  }

  update(updateExpenseRequest: UpdateExpenseRequest): Observable<Expense> {
    return this.http.post<Expense>(routes.update(), updateExpenseRequest);
  }

  getAllExpensesById(userId: number): Observable<Expense[]> {
    const getAllExpenses =  {
      user_id: userId
    };
    console.log(getAllExpenses);
    return this.http.post<Expense[]>(routes.getAllExpensesById(), getAllExpenses);
  }


}
