import { extractLineNumber } from '../src/lib/phone-number-parser';

describe('test line number extraction', () => {
	it('should extract 350 from 350', () => {
		expect(extractLineNumber({ remaining: '350' }).lineNumber).toBe('350');
	});
});
