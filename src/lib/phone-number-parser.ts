import { PhoneNumber, PhoneNumberStage } from './phone-number.type';

const DEFAULT_COUNTRY_CODE = process.env.COUNTRY_CODE_DEFAULT || '49';

const COUNTRY_CODE_REGEX = /^\[?(\+|00)(?<country>([1-9][0-9]+) |([1-9][0-9]))\]?/;
const AREA_CODE_REGEX = /^(\(0\)|0)?\(?(?<area>[1-9][0-9]{1,3})\)?[\/-]?/;
const TELEPHONE_PREFIX_REGEX = /^\[?(?<telephonePrefix>[0-9]+)[\/\-\] ]?/;
const LINE_NUMBER_REGEX = /^(?<lineNumber>[0-9]+)[\]]?/;

export function isPhoneNumberValid(phoneNumber: string): boolean {
	let paranthesisOpened = [];
	let squareBracketsOpened = [];

	for (let i = 0; i < phoneNumber.length; i++) {
		const char = phoneNumber[i];
		if (char === '[') {
			squareBracketsOpened.push(i);
			continue;
		}
		if (char === ']') {
			if (squareBracketsOpened.length === 0) {
				return false;
			} else {
				squareBracketsOpened.pop();
			}
		}
		if (char === '(') {
			paranthesisOpened.push(i);
		}
		if (char === ')') {
			if (paranthesisOpened.length === 0) {
				return false;
			} else {
				paranthesisOpened.pop();
			}
		}
	}

	return paranthesisOpened.length === 0 && squareBracketsOpened.length === 0;
}

export function extractCountryCode(stage: PhoneNumberStage): PhoneNumberStage {
	const phoneNumber = stage.remaining;
	const matches = phoneNumber.match(COUNTRY_CODE_REGEX);
	let countryCode: string = DEFAULT_COUNTRY_CODE;
	let remaining = phoneNumber;

	if (matches && matches.groups?.country) {
		countryCode = matches.groups.country.trim();
		remaining = phoneNumber.slice(matches[0].length).trim();
	}

	return {
		...stage,
		remaining,
		countryCode,
	};
}

export function extractAreaCode(stage: PhoneNumberStage): PhoneNumberStage {
	const phoneNumber = stage.remaining;
	const matches = phoneNumber.match(AREA_CODE_REGEX);

	if (matches && matches.groups?.area) {
		const areaCode = matches.groups.area.trim();
		const remaining = phoneNumber.slice(matches[0].length).trim();

		return {
			...stage,
			remaining,
			areaCode,
		};
	} else {
		throw new Error(`Could not extract area code from '${phoneNumber}'`);
	}
}

export function exctractTelephonePrefix(stage: PhoneNumberStage): PhoneNumberStage {
	const phoneNumber = stage.remaining;
	const matches = phoneNumber.match(TELEPHONE_PREFIX_REGEX);

	if (matches && matches.groups?.telephonePrefix) {
		const telephonePrefix = matches.groups.telephonePrefix.trim();
		const remaining = phoneNumber.slice(matches[0].length).trim();

		return {
			...stage,
			remaining,
			telephonePrefix,
		};
	} else {
		throw new Error(`Could not extract telephone prefix from '${phoneNumber}'`);
	}
}

export function extractLineNumber(stage: PhoneNumberStage): PhoneNumberStage {
	const phoneNumber = stage.remaining;
	const matches = phoneNumber.match(LINE_NUMBER_REGEX);

	if (matches && matches.groups?.lineNumber) {
		const lineNumber = matches.groups.lineNumber.trim();
		const remaining = phoneNumber.slice(matches[0].length).trim();

		return {
			...stage,
			lineNumber,
			remaining,
		};
	} else {
		throw new Error(`Could not extract line number from '${phoneNumber}'`);
	}
}

// ###### MAIN ######
export function parseNumber(input: string): PhoneNumber {
	let stage: PhoneNumberStage = {
		remaining: input,
	};

	stage = extractCountryCode(stage);
	stage = extractAreaCode(stage);

	if (stage.remaining) {
		stage = exctractTelephonePrefix(stage);
	}

	if (stage.remaining) {
		stage = extractLineNumber(stage);
	}

	if (stage.remaining) {
		throw new Error(`Unknown trailing characters: '${stage.remaining}'`);
	}

	return {
		countryCode: stage.countryCode!,
		areaCode: stage.areaCode!,
		telephonePrefix: stage.telephonePrefix!,
		lineNumber: stage.lineNumber,
	};
}
