import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Item } from './item';
import { Product } from './product';
import { Department } from './department';

@Injectable()
export class ServerService {
  private itemsUrl = 'app/items';  // URL to web api
  constructor(private http: Http) { }
  
  // Get all items
  private getItems(): Promise<Item[]> {
    return this.http.get(this.itemsUrl)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }
  // Add new Product
  private post(product: Product): Promise<Product> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.itemsUrl, JSON.stringify(product), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  // Update existing Product
  private put(product: Product) : Promise<Product> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.itemsUrl}/${product.id}`;
    return this.http
      .put(url, JSON.stringify(product), { headers: headers })
      .toPromise()
      .then(() => product)
      .catch(this.handleError);
  }
  private handleError(error: any) {
    alert('An error occurred with the server:\n' + error.status +
      ', ' + error.statusText);
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  getDepartments(): Promise<Department[]> {
    return this.getItems()
      .then(response => response.filter(item => item.type === 'g0'))
      .catch(this.handleError);
  }
  getProducts(): Promise<Product[]> {
    return this.getItems()
      .then(response => response.filter(item => item.type === 'p'))
      .catch(this.handleError);
  }
  getProduct(id: number) : Promise<Product> {
    return this.getProducts()
      .then(products => products.filter(product => product.id === id)[0]);
  }
  save(product: Product): Promise<Product> {
    if (product.id) {
      return this.put(product);
    }
    return this.post(product);
  }
  delete(product: Product) : Promise<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.itemsUrl}/${product.id}`;
    return this.http
      .delete(url, headers)
      .toPromise()
      .catch(this.handleError);
  }
}