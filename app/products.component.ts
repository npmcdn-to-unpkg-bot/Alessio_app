import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';

import { ServerService } from './server.service';
import { DepartmentsService } from './departments.service';
import { Product } from './product';
import { ProductDetailComponent } from './product-detail.component';
import { DataTableComponent } from './data-table.component';

@Component({
  selector: 'my-products',
  templateUrl: 'app/products.component.html',
  styleUrls: ['app/products.component.css'],
  directives: [DataTableComponent],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private isInDOM: boolean;
  private selectedDep: string;
  private routeParam1: string;
  private products: Product[];
  private tableHeaders: string[];
  private error: any;
  private title: string;
  constructor(
      private router: Router,
      private routeParams: RouteParams,
      private serverService: ServerService,
      private departmentsService: DepartmentsService) {}

  ngOnInit() {
    this.routeParam1 = this.routeParams.get('param1');
    this.selectedDep = this.routeParams.get('dep');
    this.sendDepName(this.selectedDep);
    this.isInDOM = (this.routeParam1 == null && this.selectedDep == null) ?
      false: true;
    this.setTitle();
    this.getProducts();
    this.tableHeaders = ['Id', 'Name', 'Department', 'Price'];
  }
  ngOnDestroy() {
    this.sendDepName('');
  }
  private sendDepName(depName: string) {
    if (this.selectedDep) {
      this.departmentsService.setSelectedDep(depName);
    }
  }
  private getProducts() {
    if (this.selectedDep) {
      this.serverService.getProducts()
          .then(products => products.filter(p => p.editables.department
            === this.selectedDep))
          .then(filteredProds => this.products = filteredProds);
    } else {
      this.serverService.getProducts()
          .then(products => this.products = products);
    }
  }
  private addProduct() {
    this.router.navigate(['/ProductDetail', { id: 'new' }]);
  }
  private setTitle() {
    if (this.selectedDep) {
      this.title = 'All products in department: ' + this.selectedDep;
    } else {
      this.title = 'All products';
    }
  }
  editProduct(id: number) {
    this.router.navigate(['/ProductDetail', { id: id }]);
  }
  removeProduct(product: Product) {
    var a = this.serverService.delete(product);
        a.then(res => {
          this.products = this.products.filter(h => h !== product);
        })
        .catch(error => this.error = error);
  }
}