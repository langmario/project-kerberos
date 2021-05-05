export interface PhoneNumber {
	countryCode: string;
	areaCode: string;
	telephonePrefix: string;
	lineNumber?: string;
}


export interface PhoneNumberStage extends Partial<PhoneNumber> {
	remaining: string;
}
