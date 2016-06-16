import { Component } from '@angular/core';
import { RouteConfig, RouterLink, RouterOutlet, ROUTER_PROVIDERS } from
	'@angular/router-deprecated';

import { ServerService } from '../services/server.service'
import { DepartmentsService } from '../services/departments.service';
import { ProductsComponent } from './products.component'
import { DepartmentsComponent } from './departments.component'
import { ProductDetailComponent } from './product-detail.component'

@Component({
	selector: 'my-app',
	templateUrl: 'app/components/app.component.html',
	styleUrls: ['app/components/app.component.css'],
	directives: [RouterLink, RouterOutlet],
	providers: [ROUTER_PROVIDERS, ServerService, DepartmentsService]
})
@RouteConfig([
	{
		path: '',
		name: 'Empty',
		redirectTo: ['/Departments', {param2: 'departments'}, 'Default'],
	},
	{
		path: '/home',
		name: 'Home',
		redirectTo: ['/Departments', {param2: 'departments'}, 'Default'],
	},
	{
		path: '/products/:param1',
		name: 'Products',
		component: ProductsComponent,
	},
	{
		path: '/:param2/...',
		name: 'Departments',
		component: DepartmentsComponent,
	},
	{
		path: '/products/detail/:id',
		name: 'ProductDetail',
		component: ProductDetailComponent,
	}
])

export class AppComponent {
	private title: string = 'Alessio\'s warehouse';
}