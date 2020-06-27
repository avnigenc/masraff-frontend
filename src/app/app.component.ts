import { Component, OnInit } from '@angular/core';
import { MetaDataService } from './services/meta-data.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'masraff';

  constructor(
    private metaDataService: MetaDataService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    // this.getAllMetaData();
  }

  getAllMetaData() {
    this.metaDataService.getAllCurrencies().subscribe((res) => console.log(res));
    this.metaDataService.getAllExpenses().subscribe((res) => console.log(res));
    this.metaDataService.getAllVatRates().subscribe((res) => console.log(res));
  }
}
