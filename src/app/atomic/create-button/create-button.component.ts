import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-button',
  template: `
    <button (click)='onClick()' mat-raised-button color="primary">Masraf Oluştur</button>
  `,
  styleUrls: ['./create-button.component.scss']
})
export class CreateButtonComponent implements OnInit {

  @Input() value: string | number;

  ngOnInit() { }

  onClick() { }
}
