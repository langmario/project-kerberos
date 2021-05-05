import { extractAreaCode } from '../src/lib/phone-number-parser';
import { PhoneNumberStage } from '../src/lib/phone-number.type';

describe('test area prefix extraction', () => {
	it(`should extract '201' from '0201 123456'`, () => {
		const input = '0201 123456';
		const expected = '201';
		expect(extractAreaCode({ remaining: input }).areaCode)
			.toBe(expected);
	});

	it(`should return '2011' from '0201123456'`, () => {
		const input = '0201123456';
		const expected = '2011';
		expect(extractAreaCode({ remaining: input }).areaCode)
			.toBe(expected);
	});

	it(`should extract '201' from '0201/123456'`, () => {
		const input = '0201/123456';
		const expected = '201';
		expect(extractAreaCode({ remaining: input }).areaCode)
			.toBe(expected);
	});

	it(`should extract '2011' from '201123456'`, () => {
		const input = '201123456';
		const expected = '2011';
		expect(extractAreaCode({ remaining: input }).areaCode)
			.toBe(expected);
	});

	it(`should extract '201' from '(0)201 1234 56'`, () => {
		const input = '(0)201 1234 56';
		const expected = '201';
		expect(extractAreaCode({ remaining: input }).areaCode)
			.toBe(expected);
	});

	it(`should extract '941' from '(941) 790-4780'`, () => {
		const input = '(941) 790-4780';
		const expected = '941';
		expect(extractAreaCode({ remaining: input }).areaCode)
			.toBe(expected);
	});

	it(`should extract '1511' from '015115011900'`, () => {
		const input = '015115011900';
		const expected = '1511';
		expect(extractAreaCode({ remaining: input }).areaCode)
			.toBe(expected);
	});

	it(`should extract '9870' from '09870987 899'`, () => {
		const input = '09870987 899';
		const expected = '9870';
		expect(extractAreaCode({ remaining: input }).areaCode)
			.toBe(expected);
	});

	it(`should extract '89' from '(0)89-800/849-50'`, () => {
		const input = '(0)89-800/849-50';
		const expected = '89';
		expect(extractAreaCode({ remaining: input }).areaCode)
			.toBe(expected);
	});

	it(`should extract '8024' from '(8024) [990-477]'`, () => {
		const input = '(8024) [990-477]';
		const expected = '8024';
		expect(extractAreaCode({ remaining: input }).areaCode)
			.toBe(expected);
	});

	it(`should extract '8024' from '(8024) [990-477]'`, () => {
		const input = '(8024) [990-477]';
		const expected = '8024';
		expect(extractAreaCode({ remaining: input }).areaCode)
			.toBe(expected);
	});
});
