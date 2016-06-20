import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { RouteParams } from '@angular/router-deprecated';

import { Product }        from '../classes/product';
import { ServerService } from '../services/server.service';
@Component({
  selector: 'my-product-detail',
  templateUrl: 'app/components/product-detail.component.html',
  styleUrls: ['app/components/product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() isNew: boolean;
  @Output() close = new EventEmitter();
  private routeId: string;
  private product: Product;
  private oldName: string;
  private myForm: ControlGroup;
  constructor(
      private serverService: ServerService,
      private routeParams: RouteParams,
      private fb: FormBuilder) {
  }
  ngOnInit() {
    this.routeId = this.routeParams.get('id');
    if (this.routeId === 'new') {
      this.product = new Product();
      this.buildForm();
    } else {
      let id = +this.routeId;
      this.serverService.getProduct(id)
        .then(product => {
          this.product = product;
          this.oldName = this.product.editables.name.slice(0);
        })
        .then(() => this.buildForm());
    }
  }
  private buildForm() {
    this.myForm = this.fb.group({
      'name': [this.product.editables.name, Validators.required],
      'department': [this.product.editables.department, Validators.required],
      'price': [this.product.editables.price.toFixed(2), Validators.compose([
        Validators.required, this.priceValidator])]
    });
  }
  private priceValidator(control: Control): { [s: string]: boolean } {
    if (!control.value.toString().match(/^[0-9]+\.[0-9]{2}$/)) {
      return {invalidPrice: true};
    }
  }
  private save() {
    this.product.editables.name = this.myForm.controls['name'].value;
    this.product.editables.department = this.myForm.controls['department'].value;
    this.product.editables.price = +this.myForm.controls['price'].value;
    this.serverService
        .save(this.product)
        .then(product => {
          this.product = product; // saved product, id is given by the server
          this.goBack(product);
        })
  }
  private goBack(savedProduct: Product = null) {
    this.close.emit(savedProduct);
    window.history.back();
  }
}
