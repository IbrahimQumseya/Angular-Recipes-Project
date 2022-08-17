import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input() message: string;
  @Output() closeEmitter = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {
    console.log('Empty');
  }

  OnClose() {
    this.closeEmitter.emit();
  }
}
