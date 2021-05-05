import { isPhoneNumberValid } from '../src/lib/phone-number-parser';


describe('test phone number validator', () => {
	it('should return true if phone number is valid', () => {
		expect(isPhoneNumberValid('[+49] (0)89-800/849-50')).toBeTruthy();
	});

	it('should return false if phone number is invalid', () => {
		expect(isPhoneNumberValid('[+49 (0)89-800/849-50')).toBeFalsy();
	});

	it('should return false if phone number is invalid', () => {
		expect(isPhoneNumberValid('[+49] 0)89-800/849-50')).toBeFalsy();
	});
});
