import { Component, EventEmitter, Input, Output } from '@angular/core';
import {DatePipe} from "@angular/common";
import {HTTP_PROVIDERS, Http} from "@angular/http";
import {DataTableDirectives} from 'angular2-datatable/datatable';

@Component({
  selector: 'my-datatable',
  templateUrl: 'app/data-table.component.html',
  providers: [HTTP_PROVIDERS],
  directives: [DataTableDirectives],
  pipes: [DatePipe]
})

export class DataTableComponent {
  @Input() headers: string[];
  @Input() items: any;
  @Output() editEmitter = new EventEmitter();
  @Output() removeEmitter = new EventEmitter();
  private windowWidth: number;
  private isMobile: boolean;
  constructor() {
    this.onResize();
  }

  onResize() {
    this.windowWidth = window.innerWidth;
    this.isMobile = (this.windowWidth < 768) ? true : false;
  }
  private editItem(id: any) {
    this.editEmitter.emit(id);
  }
  private removeItem(item: any) {
    this.removeEmitter.emit(item);
  }
}