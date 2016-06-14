import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Product }        from './product';
import { ServerService } from './server.service';
@Component({
  selector: 'my-product-detail',
  templateUrl: 'app/product-detail.component.html',
  styleUrls: ['app/product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() isNew: boolean;
  @Output() close = new EventEmitter();
  private routeId: string;
  private product: Product;
  private oldName: string;
  private error: any;
  constructor(
      private serverService: ServerService,
      private routeParams: RouteParams) {
  }
  ngOnInit() {
    this.routeId = this.routeParams.get('id');
    if (this.routeId === 'new') {
      this.product = new Product();
    } else {
      let id = +this.routeId;
      this.serverService.getProduct(id)
        .then(product => { 
          this.product = product;
          this.oldName = this.product.editables.name.slice(0);
        });
    }
  }
  private save() {
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
