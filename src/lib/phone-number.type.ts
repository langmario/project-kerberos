export interface PhoneNumber {
	countryCode: number;
	areaCode: number;
	telephonePrefix?: number;
	lineNumber?: number;
}


export interface PhoneNumberStage extends Partial<PhoneNumber> {
	remaining: string;
}
