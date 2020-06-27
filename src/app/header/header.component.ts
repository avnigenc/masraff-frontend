import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loading = false;

  constructor(public storageService: StorageService) { }

  ngOnInit() {}

  logout() {
    this.loading = true;
    timer(500).subscribe((sec) => {
      this.storageService.logout();
      this.loading = false;
      location.reload();
    });
  }
}
