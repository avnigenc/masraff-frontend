import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-edit-button',
  template: `
    <button *ngIf="storageService.isAuthenticated()" (click)='onClick()' mat-raised-button color="primary">İncele</button>
  `,
  styleUrls: ['./edit-button.component.scss']
})
export class EditButtonComponent implements OnInit, ViewCell {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(public storageService: StorageService) { }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    this.save.emit(this.rowData);
  }
}
