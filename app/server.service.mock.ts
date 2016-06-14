import { Item } from '../app/item';
import { Product } from '../app/product';
import { Department } from '../app/department';

export class ServerServiceMock {
  getDepartments(): Promise<Department[]> {
    let promise = new Promise<Department[]>(function(fulfill, reject) {
      let departments: Array<Department> = [
        { id: 0, type: 'g0', name: 'Technology', parentId: '', childrenIds: [] },
        { id: 1, type: 'g0', name: 'Music', parentId: '', childrenIds: [] },
        { id: 2, type: 'g0', name: 'Fashion', parentId: '', childrenIds: [] },
        { id: 3, type: 'g0', name: 'Sport', parentId: '', childrenIds: [] }];
      fulfill(departments);
    });
    return promise;
  }
  getProducts(): Promise<Product[]> {
    let promise = new Promise<Product[]>(function(fulfill, reject) {
      let products: Array<Product> = [
      { id: 4, type: 'p', editables: 
        { department: 'Technology', name: 'Phone', price: '100' }},
      { id: 5, type: 'p', editables: 
        { department: 'Technology', name: 'PC', price: '1000' }},
      { id: 6, type: 'p', editables: 
        { department: 'Music', name: 'Guitar', price: '1500' }},
      { id: 7, type: 'p', editables: 
        { department: 'Music', name: 'Piano', price: '10000' }},
      { id: 8, type: 'p', editables: 
        { department: 'Fashion', name: 'Jacket', price: '500' }},
      { id: 9, type: 'p', editables: 
        { department: 'Fashion', name: 'Suit', price: '2500' }},
      { id: 10, type: 'p', editables: 
        { department: 'Sport', name: 'Ball', price: '10' }},
      { id: 11, type: 'p', editables: 
        { department: 'Sport', name: 'Bycicle', price: '800' }}];
      fulfill(products);
    });
    return promise;
  }
  getProduct(id: number) : Promise<Product> {
    return this.getProducts()
      .then(products => products.filter(product => product.id === id)[0]);
  }
  save(product: Product): Promise<Product> {
    let promise = new Promise<Product>(function(fulfill, reject) {
      let product: Product = {
        id: 4, type: 'p', editables:
        { department: 'Technology', name: 'Phone', price: '100' }
      };
      fulfill(product);
    });
    return promise;
  }
  delete(product: Product) : Promise<any> {
    let promise = new Promise<any>(function(fulfill, reject) {
      fulfill();
    });
    return promise;
  }
}