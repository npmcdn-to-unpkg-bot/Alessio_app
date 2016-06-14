/* tslint:disable:no-unused-variable */
import {
  expect, it, iit, xit,
  describe, ddescribe, xdescribe,
  beforeEach, beforeEachProviders, withProviders,
  async, inject
} from '../node_modules/@angular/core/testing';

import { TestComponentBuilder } from '../node_modules/@angular/compiler/testing';
import { By }             			from '../node_modules/@angular/platform-browser';
import { provide }        			from '../node_modules/@angular/core';
import { ViewMetadata }   			from '../node_modules/@angular/core';
import { PromiseWrapper } 			from '../node_modules/@angular/core/src/facade/promise';

import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '../node_modules/@angular/router-deprecated';
import { AppComponent } from '../app/app.component';
import { ServerService } from '../app/server.service'
import { DepartmentsService } from '../app/departments.service';
import { ServerServiceMock } from '../app/server.service.mock'
import { DepartmentsServiceMock } from '../app/departments.service.mock';

////////  SPECS  /////////////
describe('AppComponent with new', function () {
  it('should instantiate component', () => {
    expect(new AppComponent()).toBeDefined();
  });
});
describe('AppComponent with DI', function () {

	beforeEachProviders(() => [
		AppComponent, 
		provide(ServerService, {useClass:ServerServiceMock}),
		provide(DepartmentsService, {useClass:DepartmentsServiceMock})
		]);

	it('should instantiate component', inject([AppComponent, ServerService,
		DepartmentsService],
		(appComponent: AppComponent) => {
	    expect(appComponent).toBeDefined();
	}));
});
describe('AppComponent with TCB', function() {

  it('should fulfill dipendencies',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
			tcb
				.overrideProviders(AppComponent, [
					provide(ServerService, {useClass: ServerServiceMock}), 
					provide(DepartmentsService, {useClass: DepartmentsServiceMock})])
				.createAsync(AppComponent).then(fixture => {
					expect(true).toBe(true);
				});
		})));
});