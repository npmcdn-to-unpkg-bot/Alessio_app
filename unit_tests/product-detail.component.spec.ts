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

import { RouteParams } from '../node_modules/@angular/router-deprecated';
import { ProductDetailComponent } from '../app/components/product-detail.component';
import { ServerService } from '../app/services/server.service'
import { ServerServiceMock } from '../app/services/server.service.mock'

////////  LOCAL MOCKS  /////////////
class RouteParamsMock {}

////////  SPECS  /////////////
describe('ProductDetailComponent with DI', function () {

	beforeEachProviders(() => [
		ProductDetailComponent, 
		provide(RouteParams, { useValue: new RouteParams({ id: '4' }) }),
		provide(ServerService, {useClass:ServerServiceMock})
		]);

	it('should instantiate component', inject([ProductDetailComponent,
		RouteParams, ServerService],
		(productDetailComponent: ProductDetailComponent) => {
	    expect(productDetailComponent).toBeDefined();
	}));
});
describe('ProductDetailComponent with TCB', function() {

  it('should fulfill dipendencies',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
			tcb
				.overrideProviders(ProductDetailComponent, [
					provide(RouteParams, {useClass: RouteParamsMock}),
					provide(ServerService, {useClass: ServerServiceMock})])
				.createAsync(ProductDetailComponent).then(fixture => {
					expect(true).toBe(true);
				});
	})));
});