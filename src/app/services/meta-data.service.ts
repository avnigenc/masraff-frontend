import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/business/expense.model';
import { VatRate } from '../models/business/vat-rate.model';
import { Currency } from '../models/business/currency.model';

const routes = {
  getAllExpenses: () => `http://localhost:3000/getAllExpenses`,
  getAllCurrencies: () => `http://localhost:3000/getAllCurrencies`,
  getAllVatRates: () => `http://localhost:3000/getAllVatRates`,

};

@Injectable({
  providedIn: 'root'
})
export class MetaDataService {

  constructor(private http: HttpClient) {}

  getAllExpenses(): Observable<Expense[]> {
      return this.http.get<Expense[]>(routes.getAllExpenses());
  }

  getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(routes.getAllCurrencies());
  }

  getAllVatRates(): Observable<VatRate[]> {
    return this.http.get<VatRate[]>(routes.getAllVatRates());
  }

}
