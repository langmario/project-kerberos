import { exctractTelephonePrefix } from '../src/lib/phone-number-parser';

describe('test telephone prefix extraction', () => {
	it('should extract 55610378 from 55610378', () => {
		expect(exctractTelephonePrefix({ remaining: '55610378' }).telephonePrefix).toBe('55610378');
	});

	it('should extract 2403 from 2403-350', () => {
		expect(exctractTelephonePrefix({ remaining: '2403-350' }).telephonePrefix).toBe('2403');
	});
});
