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
import { ProductDetailComponent } from '../app/product-detail.component';
import { ServerService } from '../app/server.service'
import { ServerServiceMock } from '../app/server.service.mock'

////////  SPECS  /////////////
describe('ProductDetailComponent with DI', function () {

	beforeEachProviders(() => [
		ProductDetailComponent, 
		RouteParams,
		provide(ServerService, {useClass:ServerServiceMock})
		]);

	it('should instantiate component', inject([ProductDetailComponent,
		ServerService,],
		(productDetailComponent: ProductDetailComponent) => {
	    expect(productDetailComponent).toBeDefined();
	}));
});
describe('ProductDetailComponent with TCB', function() {
	let serverServiceMock : ServerServiceMock;

	beforeEach(() => {
		serverServiceMock = new ServerServiceMock();
		});

  it('should instantiate component',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
			tcb
				.overrideProviders(ProductDetailComponent, [
					provide(ServerService, {useValue: serverServiceMock})])
				.createAsync(ProductDetailComponent).then(fixture => {
				expect(fixture.componentInstance instanceof 
					ProductDetailComponent).toBe(true);
			});
		})));
});