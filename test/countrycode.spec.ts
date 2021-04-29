import { extractCountryCode } from '../src/lib/phone-number-parser';

describe(`test country code extraction`, () => {
	it(`should extract '+49' from '+49 0201 123456'`, () => {
		expect(extractCountryCode({ remaining: `+49 0201 123456`}).countryCode).toBe(49);
	});

	it(`should extract '+33' from '0033 0201/123456'`, () => {
		expect(extractCountryCode({ remaining: `0033 0201/123456`}).countryCode).toBe(33);
	});

	it(`should extract '+49' from '[+49] (0)89-800/849-50'`, () => {
		expect(extractCountryCode({ remaining: `[+49] (0)89-800/849-50`}).countryCode).toBe(49);
	});

	it(`should extract '+49' from '015115011900'`, () => {
		expect(extractCountryCode({ remaining: `015115011900`}).countryCode).toBe(49);
	});
});
