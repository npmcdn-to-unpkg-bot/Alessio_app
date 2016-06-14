import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouteParams, RouteConfig, ROUTER_DIRECTIVES } from
	'@angular/router-deprecated';
import { NgClass } from '@angular/common';

import { ServerService } from './server.service';
import { Subscription }   from 'rxjs/Subscription';
import { DepartmentsService } from './departments.service';
import { Department } from './department';
import { ProductsComponent } from './products.component';

@Component({
	selector: 'my-departments',
	templateUrl: 'app/departments.component.html',
	styleUrls: ['app/departments.component.css'],
	directives: [ROUTER_DIRECTIVES, NgClass]
})
@RouteConfig([
	{
		path: '/',
		name: 'Default',
		component: ProductsComponent,
	},
	{
		path: '/:dep',
		name: 'DepartmentDetail',
		component: ProductsComponent,
	}
])

export class DepartmentsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
	private selectedDep: string;
  private depsPerRow: number = 3;
  private rowsNum: number;
  private title: string;
  private params: string;
	private departments: Department[][];
	constructor(
			private departmentsService: DepartmentsService,
			private serverService: ServerService,
			private router: Router,
			private routeParams: RouteParams) {}

	ngOnInit() {
    this.subscription = this.departmentsService.selectedDep$.subscribe(
      depName => this.selectedDep = depName);
		this.params = this.routeParams.get('param2');
		this.setTitle(this.getDeps());
		this.arrangeDeps(this.getDeps());
	}
  ngOnDestroy(){
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
	private gotoDetail(depName: string) {
		let link = ['/Departments', { param2: this.params }, 'DepartmentDetail',
			{ dep: depName }];
		this.router.navigate(link);
	}
	private getDeps() : Promise<Department[]> {
		return this.serverService.getDepartments();

	}
	private arrangeDeps(deps: Promise<Department[]>) {
		deps.then(response => {
			var depsNum = response.length;
			var depsPerRow = this.depsPerRow;
			this.rowsNum = Math.ceil(depsNum / depsPerRow);
			var rowsNum = this.rowsNum;
			var departments = new Array<Array<Department>>(rowsNum);
			for (var i = 0; i < rowsNum; i++) {
				var start = 0 + depsPerRow * i;
				departments[i] = new Array<Department>();
				departments[i] = response.slice(start, start + depsPerRow);
			}
			this.departments = departments;
		});
	}
	private setTitle(deps: Promise<Department[]>) {
		deps.then(response => {
			if (response.length > 0) {
				this.title = "Explore our departments";
			} else {
				this.title = "No departments to show";
			}
		});
	}
}