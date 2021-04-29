import { PhoneNumber, PhoneNumberStage } from './phone-number.type';

const DEFAULT_COUNTRY_CODE = process.env.COUNTRY_CODE_DEFAULT || '49';

const COUNTRY_CODE_REGEX = /^\[?(\+|00)(?<country>([1-9][0-9]+) |([1-9][0-9]))\]?/;
const AREA_CODE_REGEX = /^(\(0\)|0)?\(?(?<area>[1-9][0-9]{1,3})\)?[\/-]?/;
const TELEPHONE_PREFIX_REGEX = /^\[?(?<telephonePrefix>[0-9]+)[\/\-\] ]?/;
const LINE_NUMBER_REGEX = /^(?<lineNumber>[0-9]+)[\]]?/;

export function extractCountryCode(stage: PhoneNumberStage): PhoneNumberStage {
	const phoneNumber = stage.remaining;
	const matches = phoneNumber.match(COUNTRY_CODE_REGEX);
	let countryCode: number = Number(DEFAULT_COUNTRY_CODE);
	let remaining = phoneNumber;

	if (matches && matches.groups?.country) {
		countryCode = Number(matches.groups.country);
		remaining = remaining.slice(matches[0].length).trim();
	}

	return {
		...stage,
		remaining,
		countryCode: countryCode,
	};
}

export function extractAreaCode(stage: PhoneNumberStage): PhoneNumberStage {
	const phoneNumber = stage.remaining;
	const matches = phoneNumber.match(AREA_CODE_REGEX);

	if (matches && matches.groups?.area) {
		const areaCode = Number(matches.groups.area);
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

export function exctractTelephonePrefix(
	stage: PhoneNumberStage
): PhoneNumberStage {
	const phoneNumber = stage.remaining;
	const matches = phoneNumber.match(TELEPHONE_PREFIX_REGEX);

	if (matches && matches.groups?.telephonePrefix) {
		const telephonePrefix = Number(matches.groups.telephonePrefix);
		const remaining = phoneNumber.slice(matches[0].length).trim();

		return {
			...stage,
			remaining,
			telephonePrefix,
		};
	} else {
		throw new Error(
			`Could not extract telephone prefix from '${phoneNumber}'`
		);
	}
}

export function extractLineNumber(stage: PhoneNumberStage): PhoneNumberStage {
	const phoneNumber = stage.remaining;
	const matches = phoneNumber.match(LINE_NUMBER_REGEX);

	if (matches && matches.groups?.lineNumber) {
		const lineNumber = Number(matches.groups.lineNumber);
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
		telephonePrefix: stage.telephonePrefix,
		lineNumber: stage.lineNumber,
	};
}
