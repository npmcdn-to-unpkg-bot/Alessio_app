import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from
	'@angular/router-deprecated';

import { ServerService } from './server.service'
import { DepartmentsService } from './departments.service';
import { ProductsComponent } from './products.component'
import { DepartmentsComponent } from './departments.component'
import { ProductDetailComponent } from './product-detail.component'

@Component({
	selector: 'my-app',
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],
	directives: [ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS, ServerService, DepartmentsService]
})
@RouteConfig([
	{
		path: '/products/:param1',
		name: 'Products',
		component: ProductsComponent,
	},
	{
		path: '/:param2/...',
		name: 'Departments',
		component: DepartmentsComponent,
		useAsDefault: true,
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