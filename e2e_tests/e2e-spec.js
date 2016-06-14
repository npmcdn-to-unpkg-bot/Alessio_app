
describe('HomePage', function () {

  let baseUrl = 'http://localhost:8080';
	let expectedMsg = 'Alessio\'s warehouse';

  beforeEach(function () {
    browser.get('');
  });

  it('should navigate to baseUrl', function () {
  	let url = browser.getCurrentUrl();
		expect(url).toMatch(baseUrl);
  });
  it('should display: ' + expectedMsg, function () {
    expect(element(by.id('title')).getText()).toEqual(expectedMsg);
  });
});
