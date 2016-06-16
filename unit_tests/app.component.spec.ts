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

import { Directive } from '../node_modules/@angular/core';
import { RouterLink, RouterOutlet, ROUTER_PROVIDERS } from '../node_modules/@angular/router-deprecated';
import { AppComponent } from '../app/components/app.component';
import { ServerService } from '../app/services/server.service'
import { DepartmentsService } from '../app/services/departments.service';
import { ServerServiceMock } from '../app/services/server.service.mock'
import { DepartmentsServiceMock } from '../app/services/departments.service.mock';

////////  LOCAL MOCKS  /////////////
@Directive({
	selector: '[routerLink]',
  inputs: ['routeParams: routerLink', 'target: target'],
})
class RouterLinkMock {}
@Directive({ selector: 'router-outlet' })
class RouterOutletMock {}

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
		})
	);
});
describe('AppComponent with TCB', function() {

  it('should fulfill dipendencies',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
			tcb
				.overrideProviders(AppComponent, [
					ROUTER_PROVIDERS,
					provide(ServerService, {useClass: ServerServiceMock}), 
					provide(DepartmentsService, {useClass: DepartmentsServiceMock})])
				.overrideDirective(AppComponent, RouterLink, RouterLinkMock)
				.overrideDirective(AppComponent, RouterOutlet, RouterOutletMock)
				.createAsync(AppComponent).then(fixture => {
					expect(true).toBe(true);
				});
	})));
  it('should have the title "Alessio\'s warehouse"',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
			tcb
				.overrideProviders(AppComponent, [
					ROUTER_PROVIDERS,
					provide(ServerService, {useClass: ServerServiceMock}), 
					provide(DepartmentsService, {useClass: DepartmentsServiceMock})])
				.overrideDirective(AppComponent, RouterLink, RouterLinkMock)
				.overrideDirective(AppComponent, RouterOutlet, RouterOutletMock)
				.createAsync(AppComponent).then(fixture => {
					fixture.detectChanges();
          let h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
      		expect(h1.innerText).toMatch('Alessio\'s warehouse');
				});
		})));
});